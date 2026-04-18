import HeroCarousel from "@/components/shop/HeroCarousel";
import ProductsSection from "@/components/shop/ProductsSection";
import { prisma } from "@/lib/prisma";

export default async function ShopPage() {
  const products = await prisma.product.findMany();
  return (
    <div>
      <HeroCarousel />
      <ProductsSection products={products} />
    </div>
  );
}
