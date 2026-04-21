"use client";

import { toggleFav } from "@/actions/favorite-actions";
import { Button } from "../ui/button";
import { Heart, Loader } from "lucide-react";
import { useFavStore } from "@/store/favorite";
import { useState } from "react";
import AuthDialog from "./AuthDialog";

export default function FavoriteButton({
  productId,
  isFavorite,
  isLoggedIn,
}: {
  productId: string;
  isFavorite: boolean;
  isLoggedIn: boolean;
}) {
  const incrementFav = useFavStore((state) => state.incrementFav);
  const decrementFav = useFavStore((state) => state.decrementFav);
  const [isLoading, setIsLoading] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(false);

  const handleFavClick = async () => {
    if (!isLoggedIn) {
      setShowAuthDialog(true);
      return;
    }

    setIsLoading(true);
    const result = await toggleFav(productId);
    if (result === null) incrementFav();
    else decrementFav();
    setIsLoading(false);
  };

  return (
    <>
      <Button
        disabled={isLoading}
        onClick={handleFavClick}
        variant="secondary"
        className="absolute top-1 right-1 cursor-pointer">
        {isLoading ? (
          <Loader className="animate-spin" />
        ) : (
          <Heart
            className={`${isFavorite ? "fill-secondary-foreground" : ""}`}
          />
        )}
      </Button>
      <AuthDialog
        showAuthDialog={showAuthDialog}
        setShowAuthDialog={setShowAuthDialog}
        text="You need to be signed in to save favorites."
      />
    </>
  );
}
