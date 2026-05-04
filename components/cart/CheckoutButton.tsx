"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { HandCoins } from "lucide-react";

export default function CheckoutButton({
  items,
}: {
  items: {
    title: string;
    price: number;
    quantity: number;
  }[];
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/payment/create-intention", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });

      const data = await res.json();

      if (!data.clientSecret) {
        setError("something went wrong again");
        return;
      }

      window.location.href = `https://accept.paymob.com/unifiedcheckout/?publicKey=${process.env.NEXT_PUBLIC_PAYMOB_PUBLIC_KEY}&clientSecret=${data.clientSecret}`;
    } catch {
      setError("something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleCheckout}
      disabled={!items[0] || loading}
      size="lg"
      className="cursor-pointer uppercase text-lg md:text-xl p-6 w-full">
      <HandCoins />
      {loading ? "paying..." : "checkout"}
    </Button>
  );
}
