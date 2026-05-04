import { getOrderById } from "@/actions/orders-action";
import { redirect } from "next/navigation";

export default async function ResultPage({
  searchParams,
}: {
  searchParams: { orderId: string; success?: string };
}) {
  const { orderId } = await searchParams;
  if (!orderId) redirect("/");
  const order = await getOrderById(orderId);

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      {order?.status === "paid" ? (
        <>
          <h1 className="text-4xl text-green-500">
            ✅ Payment Done Successfully!
          </h1>
          <p>Order Number: {order.id}</p>
          <p>Total: {order.amount / 100} EGP</p>
        </>
      ) : (
        <>
          <h1 className="text-4xl text-red-500">❌ Fail to pay</h1>
          <p>Try Again</p>
        </>
      )}
    </div>
  );
}
