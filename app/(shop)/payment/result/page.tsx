// app/payment/result/page.tsx
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function PaymentResultPage({
  searchParams,
}: {
  searchParams: {
    orderId?: string;
    success?: string;
  };
}) {
  const { orderId, success } = await searchParams;
  const isSuccess = success === "true";

  if (orderId) {
    await prisma.order.update({
      where: { id: orderId },
      data: { status: isSuccess ? "PAID" : "FAILED" },
    });
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6">
      {isSuccess ? (
        <>
          <CheckCircle size={80} className="text-green-500" />
          <h1 className="text-4xl font-bold">Payment Successful! 🎉</h1>
          <p className="text-muted-foreground text-sm">
            Order ID: <span className="font-mono">{orderId}</span>
          </p>
          <p className="text-muted-foreground">
            Thank you for your purchase. Your order is being processed.
          </p>
        </>
      ) : (
        <>
          <XCircle size={80} className="text-destructive" />
          <h1 className="text-4xl font-bold">Payment Failed</h1>
          <p className="text-muted-foreground">
            Something went wrong. Please try again.
          </p>
        </>
      )}

      <div className="flex gap-4 mt-4">
        <Button
          nativeButton={false}
          render={<Link href="/">Back to Home</Link>}
        />
        {!isSuccess && (
          <Button
            variant="outline"
            nativeButton={false}
            render={<Link href="/cart">Back to Cart</Link>}
          />
        )}
      </div>
    </div>
  );
}
