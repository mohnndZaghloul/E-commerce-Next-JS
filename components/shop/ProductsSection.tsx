import { Product_TP } from "@/lib/types";
import ProductCard from "../dashboard/ProductCard";
import { getFavProducts } from "@/actions/favorite-actions";
import { getCurrentUser } from "@/actions/customers-actions";

export default async function ProductsSection({
  products,
}: {
  products: Product_TP[];
}) {
  const user = await getCurrentUser();
  const favorites = await getFavProducts();
  const favoriteIds = new Set(favorites.map((fav) => fav.productId));

  return (
    <div className="container my-16">
      <h1 className="text-5xl font-semibold uppercase text-transparent text-stroke my-8">
        Products Section
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {products.map((product) => {
          let isFavorite;
          if (!!user) isFavorite = favoriteIds.has(product.id);
          return (
            <ProductCard
              key={product.id}
              product={product}
              isFavorite={isFavorite}
              isLoggedIn={!!user}
            />
          );
        })}
      </div>
    </div>
  );
}
