"use client";

import { Loader, Minus, Plus, Trash } from "lucide-react";
import { Button } from "../ui/button";
import {
  addToCart,
  decrementFromCart,
  removeFromCart,
} from "@/actions/cart-actions";
import { CartProduct_TP } from "@/lib/types";
import { useState } from "react";
import { useCartStore } from "@/store/cart";

export default function CartController({ item }: { item: CartProduct_TP }) {
  const [isLoading, setIsLoading] = useState(false);
  const count = useCartStore((state) => state.count);
  const incrementCart = useCartStore((state) => state.incrementCart);
  const decrementCart = useCartStore((state) => state.decrementCart);
  const setCartCount = useCartStore((state) => state.setCartCount);

  return (
    <div className="flex justify-end md:justify-between items-center">
      <div className="flex justify-center items-center gap-4 border rounded-xl overflow-hidden">
        <Button
          disabled={isLoading}
          onClick={async () => {
            setIsLoading(true);
            await decrementFromCart(item.id, item.quantity);
            decrementCart();
            setIsLoading(false);
          }}
          variant="destructive"
          className="cursor-pointer">
          {isLoading ? <Loader className="animate-spin" /> : <Minus />}
        </Button>
        <span>{item?.quantity}</span>
        <Button
          disabled={isLoading}
          onClick={async () => {
            setIsLoading(true);
            await addToCart(item.productId);
            incrementCart();
            setIsLoading(false);
          }}
          className="cursor-pointer">
          {isLoading ? <Loader className="animate-spin" /> : <Plus />}
        </Button>
      </div>
      <div className="hidden md:block">
        <Button
          disabled={isLoading}
          onClick={async () => {
            setIsLoading(true);
            await removeFromCart(item.id);
            setCartCount(count - item.quantity);
            setIsLoading(false);
          }}
          variant="outline"
          className="cursor-pointer capitalize text-xs md:text-sm">
          <Trash />
          {isLoading ? "loading.." : "remove"}
        </Button>
      </div>
    </div>
  );
}
