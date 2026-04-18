import { Product_TP } from "@/lib/types";
import ProductCard from "../dashboard/ProductCard";

export default function ProductsSection({
  products,
}: {
  products: Product_TP[];
}) {
  return (
    <div className="container my-16">
      <h1 className="text-5xl font-semibold uppercase text-transparent text-stroke my-8">
        Products Section
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
}
