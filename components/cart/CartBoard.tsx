"use client";

import { Button } from "@/components/ui/button";
import { CartProduct_TP } from "@/lib/types";
import { toast } from "sonner";

export default function CartBoard({
  cartProducts,
}: {
  cartProducts: CartProduct_TP[];
}) {
  const totalPrice = cartProducts.reduce((acc, item) => {
    return acc + item.quantity * item.product.price;
  }, 0);
  return (
    <div className="sticky top-4 flex-1 h-fit rounded-md border-2">
      <div className="flex flex-col h-full justify-between gap-4 p-4">
        <h2 className="text-2xl">
          Order Summary{" "}
          <span className="text-muted-foreground text-lg">
            ({cartProducts.length.toString()} items)
          </span>
        </h2>
        <div className="flex justify-between items-center capitalize text-xl">
          <p>total</p>
          <p>
            <span className="font-thin">EGP</span> {totalPrice.toFixed(2)}
          </p>
        </div>
        <Button
          onClick={() =>
            toast.info("Cart is empty now.", {
              position: "top-center",
            })
          }
          className="cursor-pointer uppercase text-xl p-6 w-full">
          checkout
        </Button>
      </div>
    </div>
  );
}
