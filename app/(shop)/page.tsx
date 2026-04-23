import { getCurrentUser } from "@/actions/customers-actions";
import { getFavProducts } from "@/actions/favorite-actions";
import {
  getAllProducts,
  getProductsByCategoryId,
} from "@/actions/products-actions";
import { getAllCategories } from "@/actions/system-actions";
import HeroCarousel from "@/components/shop/HeroCarousel";
import ProductsSection from "@/components/shop/ProductsSection";

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
