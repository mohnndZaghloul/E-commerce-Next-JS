import { getCurrentUser } from "@/actions/customers-actions";
import { getProductById } from "@/actions/products-actions";
import AddToCartButton from "@/components/shop/AddToCartButton";
import ProductCarousel from "@/components/shop/ProductCarousel";
import { RatingStars } from "@/components/shop/RatingStars";
import { notFound } from "next/navigation";

export default async function ProductPage({ params }: any) {
  const { ProductID } = await params;
  const user = await getCurrentUser();
  const product = await getProductById(ProductID);
  if (!product) notFound();

  return (
    <main className="container text-xl">
      <section className="flex gap-8 my-8">
        <div className="flex-1">
          <ProductCarousel product={product!} />
        </div>
        <div className="flex-1 flex flex-col justify-between p-4">
          <h1 className="text-5xl capitalize font-semibold">
            {product?.title}
          </h1>
          <p className="my-10 indent-4 text-xl text-muted-foreground">
            {product?.description}
          </p>
          <div className="space-y-4">
            <div
              className={`flex items-center gap-5 text-2xl ${product?.rating! > 4 ? "text-primary" : product?.rating! < 4 && product?.rating! > 3 ? "text-amber-500" : product?.rating! < 3 && product?.rating! > 2 ? "text-orange-500" : "text-destructive"}`}>
              {product?.rating.toFixed(1)}
              <RatingStars rating={product?.rating!} size={24} />
            </div>
            <div className="text-4xl font-semibold">{product?.price} EGP</div>
            <AddToCartButton
              productId={product.id}
              isLoggedIn={!!user}
              className="w-full text-xl h-12 cursor-pointer capitalize shadow-lg shadow-card-shadow"
              size={32}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
