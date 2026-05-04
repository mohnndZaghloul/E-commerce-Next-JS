import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/actions/customers-actions";
import { NextResponse } from "next/server";
import { unauthorized } from "next/navigation";

export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user) unauthorized();

  const { items } = await req.json();
  const amount = Math.round(
    items.reduce(
      (acc: number, item: any) => acc + item.price * item.quantity,
      0,
    ) * 100,
  );

  const order = await prisma.order.create({
    data: {
      userId: user.id,
      amount: amount / 100,
      items,
      status: "pending",
    },
  });

  const paymobItems = items.map((item: any) => ({
    name: item.title,
    amount: Math.round(item.price * 100),
    description: item.title,
    quantity: item.quantity,
  }));

  const response = await fetch("https://accept.paymob.com/v1/intention/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${process.env.PAYMOB_SECRET_KEY}`,
    },
    body: JSON.stringify({
      amount,
      currency: "EGP",
      payment_methods: [Number(process.env.PAYMOB_INTEGRATION_ID)],
      items: paymobItems,
      billing_data: {
        first_name: user!.name?.split(" ")[0] || "Test",
        last_name: user!.name?.split(" ")[1] || "User",
        email: user!.email || "test@test.com",
        phone_number: user!.phone || "+201000000000",
      },
      customer: {
        first_name: user!.name?.split(" ")[0] || "Test",
        last_name: user!.name?.split(" ")[1] || "User",
        email: user!.email,
      },
      redirection_url: `${process.env.NEXT_PUBLIC_URL}/payment/result?orderId=${order.id}`,
      notification_url: `${process.env.NEXT_PUBLIC_URL}/api/payment/webhook`,
      special_reference: order.id,
    }),
  });

  const data = await response.json();

  if (!data.client_secret) {
    return NextResponse.json(
      { error: "Paymob error", details: data },
      { status: 400 },
    );
  }

  await prisma.order.update({
    where: { id: order.id },
    data: { paymobOrderId: data.id },
  });

  return NextResponse.json({
    clientSecret: data.client_secret,
    orderId: order.id,
  });
}
