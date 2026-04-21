import { getCurrentUser } from "@/actions/customers-actions";
import { getFavProducts } from "@/actions/favorite-actions";
import ProductCard from "@/components/dashboard/ProductCard";
import { unauthorized } from "next/navigation";

export default async function FavoritesPage() {
  const user = await getCurrentUser();
  if (!user) unauthorized();

  const favProduct = await getFavProducts();
  const favoriteIds = new Set(favProduct.map((fav) => fav.productId));

  return (
    <main className="container my-4">
      <h1 className="text-4xl font-semibold capitalize py-5">Favorites List</h1>
      {favProduct.length > 0 ? (
        <div className="grid grid-cols-4 gap-4">
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
