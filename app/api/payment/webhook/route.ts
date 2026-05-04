import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import crypto from "crypto";

function verifyHmac(body: any, receivedHmac: string): boolean {
  const hmacFields = [
    body.amount_cents,
    body.created_at,
    body.currency,
    body.error_occured,
    body.has_parent_transaction,
    body.id,
    body.integration_id,
    body.is_3d_secure,
    body.is_auth,
    body.is_capture,
    body.is_refunded,
    body.is_standalone_payment,
    body.is_voided,
    body.order?.id,
    body.owner,
    body.pending,
    body.source_data?.pan,
    body.source_data?.sub_type,
    body.source_data?.type,
    body.success,
  ];

  const hmacString = hmacFields.join("");
  const hash = crypto
    .createHmac("sha512", process.env.PAYMOB_HMAC_SECRET!)
    .update(hmacString)
    .digest("hex");

  return hash === receivedHmac;
}

export async function POST(req: Request) {
  const body = await req.json();
  const hmac = body.hmac;

  if (!verifyHmac(body, hmac)) {
    return NextResponse.json({ error: "Invalid HMAC" }, { status: 401 });
  }

  const orderId = body.order?.merchant_order_id;
  const success = body.success === true || body.success === "true";
  const transactionId = String(body.id);

  if (!orderId) return NextResponse.json({ ok: true });

  await prisma.order.update({
    where: { id: orderId },
    data: {
      status: success ? "paid" : "failed",
      paymobTransactionId: transactionId,
    },
  });

  return NextResponse.json({ ok: true });
}
