"use client";

import { CartProduct_TP } from "@/lib/types";
import CheckoutButton from "./CheckoutButton";

export default function CartBoard({
  cartProducts,
}: {
  cartProducts: CartProduct_TP[];
}) {
  const totalPrice = cartProducts.reduce((acc, item) => {
    return acc + item.quantity * item.product.price;
  }, 0);

  const checkoutItems = cartProducts.map((item) => ({
    title: item.product.title,
    price: item.product.price,
    quantity: item.quantity,
  }));

  return (
    <div className="sticky top-4 bg-card flex-1 h-fit rounded-md border-2">
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
        <CheckoutButton items={checkoutItems} />
      </div>
    </div>
  );
}
