"use client";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { addToCart } from "@/actions/cart-actions";
import { useState } from "react";
import AuthDialog from "./AuthDialog";
import { getCurrentUser } from "@/actions/customers-actions";

export default function AddToCartButton({
  productId,
  isLoggedIn,
  className,
  size,
}: {
  productId: string;
  isLoggedIn?: boolean;
  className?: string;
  size?: number;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(false);

  const incrementCart = useCartStore((state) => state.incrementCart);

  const handlerAddToCart = async () => {
    setIsLoading(true);
    const user = await getCurrentUser();
    if (!user) {
      setShowAuthDialog(true);
      return;
    }

    try {
      await addToCart(productId);
      incrementCart();
    } catch (e) {
      throw Error(`${e}`);
    }
    setIsLoading(false);
  };
  return (
    <>
      <Button
        disabled={isLoading}
        onClick={handlerAddToCart}
        className={className}>
        <ShoppingCart size={size} /> {isLoading ? "adding..." : "add to cart"}
      </Button>
      <AuthDialog
        showAuthDialog={showAuthDialog}
        setShowAuthDialog={setShowAuthDialog}
        text="You need to be signed in to add to cart."
      />
    </>
  );
}
