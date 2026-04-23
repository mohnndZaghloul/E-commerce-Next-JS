import { getCurrentUser } from "@/actions/customers-actions";
import { getFavProducts } from "@/actions/favorite-actions";
import { getProductsByCategoryId } from "@/actions/products-actions";
import { getAllCategories } from "@/actions/system-actions";
import HeroCarousel from "@/components/shop/HeroCarousel";
import ProductsSection from "@/components/shop/ProductsSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | Next Store",
  description:
    "an E-commerce Next Js full stack project created by Mohannd Zaghloul",
  keywords: ["commerce", "shop", "store", "shopping"],
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: { categories?: string };
}) {
  const { categories } = await searchParams;
  const categoryIds = categories?.split(",") ?? [];

  const user = await getCurrentUser();
  const products = await getProductsByCategoryId(categoryIds);
  const favorites = await getFavProducts();
  const allCategories = await getAllCategories();
  const favoriteIds = new Set(favorites.map((fav) => fav.productId));

  return (
    <main>
      <HeroCarousel />
      <ProductsSection
        user={user!}
        products={products}
        favoriteIds={favoriteIds}
        categories={allCategories}
      />
    </main>
  );
}
