import { getAllProducts } from "@/actions/products-actions";
import HeroCarousel from "@/components/shop/HeroCarousel";
import ProductsSection from "@/components/shop/ProductsSection";

export default async function ShopPage() {
  const products = await getAllProducts();
  return (
    <div>
      <HeroCarousel />
      <ProductsSection products={products} />
    </div>
  );
}
