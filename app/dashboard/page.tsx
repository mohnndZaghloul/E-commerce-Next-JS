import { getCurrentUser } from "@/actions/customers-actions";
import { getFavProducts } from "@/actions/favorite-actions";
import { getCurrentUserProducts } from "@/actions/products-actions";
import ProductCard from "@/components/dashboard/ProductCard";
import StaticCard from "@/components/dashboard/StaticCard";
import { Box, HeartIcon } from "lucide-react";
import { Metadata } from "next";
import { unauthorized } from "next/navigation";

export const metadata: Metadata = {
  title: "Dashboard | Next Store",
  description:
    "dashboard to control products orders and customers by admin and users",
  keywords: ["dashboard"],
};

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) unauthorized();

  const productsData = await getCurrentUserProducts();
  const favProducts = await getFavProducts();
  const favProductsId = new Set(favProducts.map((fav) => fav.productId));
  return (
    <div className="container mb-4 space-y-2 md:space-y-4">
      <div className="grid gap-4 lg:grid-cols-2">
        <StaticCard
          title="owner products"
          staticName="products"
          staticNumber={productsData.length.toString()}
          icon={<Box className="fill-primary text-primary" size={32} />}
        />
        <StaticCard
          title="favorites"
          staticName="items"
          staticNumber={favProducts.length.toString()}
          icon={<HeartIcon className="fill-primary text-primary" size={32} />}
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {productsData.map((product) => {
          const isFavorite = favProductsId.has(product.id);
          return (
            <ProductCard
              key={product.id}
              product={product}
              isShopping={false}
              isFavorite={isFavorite}
              isLoggedIn={!!user}
            />
          );
        })}
      </div>
    </div>
  );
}
