import { getCurrentUser } from "@/actions/customers-actions";
import { getFavProducts } from "@/actions/favorite-actions";
import ProductCard from "@/components/dashboard/ProductCard";
import { Heart } from "lucide-react";
import { Metadata } from "next";
import { unauthorized } from "next/navigation";

export const metadata: Metadata = {
  title: "Favorites | Next Store",
  description: "favorite page which contain products liked by user",
  keywords: ["favorite", "favorites"],
};

export default async function FavoritesPage() {
  const user = await getCurrentUser();
  if (!user) unauthorized();

  const favProduct = await getFavProducts();
  const favoriteIds = new Set(favProduct.map((fav) => fav.productId));

  return (
    <main className="container my-2 md:my-4">
      <h1 className="text-2xl md:text-4xl font-semibold capitalize flex items-center gap-2 my-4 md:my-5">
        <Heart size={32} />
        Favorites List
      </h1>
      {favProduct.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {favProduct.map((item) => {
            const isFavorite = favoriteIds.has(item?.product.id);
            return (
              <ProductCard
                key={item.productId}
                product={item.product}
                isFavorite={isFavorite}
                isLoggedIn={!!user}
              />
            );
          })}
        </div>
      ) : (
        <p className="text-3xl text-center capitalize border-2 p-10 rounded-md w-full">
          no product in favorite
        </p>
      )}
    </main>
  );
}
