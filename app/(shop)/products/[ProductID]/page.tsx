import { getCurrentUser } from "@/actions/customers-actions";
import { getProductById } from "@/actions/products-actions";
import AddToCartButton from "@/components/shop/AddToCartButton";
import ProductCarousel from "@/components/shop/ProductCarousel";
import { RatingStars } from "@/components/shop/RatingStars";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: { ProductID: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { ProductID } = await params;
  const product = await getProductById(ProductID);
  if (!product) {
    return { title: "not founded product" };
  }

  return {
    title: `${product.title} | Next Store`,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: product.images.map((url) => ({ url })),
      type: "website",
    },
  };
}

export default async function ProductPage({ params }: any) {
  const { ProductID } = await params;
  const user = await getCurrentUser();
  const product = await getProductById(ProductID);
  if (!product) notFound();

  return (
    <main className="container text-xl">
      <section className="flex flex-col md:flex-row gap-2 md:gap-8 my-2 md:my-8">
        <div className="flex-1">
          <ProductCarousel product={product!} />
        </div>
        <div className="flex-1 flex flex-col justify-between my-2 md:m-4">
          <h1 className="text-2xl text-primary md:text-5xl capitalize font-semibold">
            {product?.title}
          </h1>
          <div className="flex-1 my-2 md:my-4">
            <h3 className="capitalize text-sm md:text-xl underline underline-offset-4">
              description
            </h3>
            <p className="indent-4 text-sm md:text-xl text-muted-foreground">
              {product?.description}
            </p>
          </div>
          <div>
            <h3 className="capitalize text-sm md:text-xl underline underline-offset-4">
              tags
            </h3>
            <div className="flex flex-wrap gap-2 my-2">
              {product?.tags.map((tag) => {
                return (
                  <span
                    key={tag}
                    className="cursor-pointer px-3 py-1 rounded-full text-xs md:text-sm border transition-colors bg-primary text-primary-foreground border-primary">
                    {tag}
                  </span>
                );
              })}
            </div>
          </div>
          <div>
            <h3 className="capitalize text-sm md:text-xl underline underline-offset-4">
              categories
            </h3>
            <div className="flex flex-wrap gap-2 my-2">
              {product.categories[0] ? (
                product?.categories.map((category) => {
                  return (
                    <span
                      key={category.id}
                      className="cursor-pointer px-3 py-1 rounded-full text-sm border transition-colors 
                      bg-muted text-muted-foreground border-border hover:border-primary
                    ">
                      {category.name}
                    </span>
                  );
                })
              ) : (
                <span
                  className="capitalize px-3 py-1 rounded-full text-sm border transition-colors 
                      bg-muted text-muted-foreground border-border hover:border-primary
                    ">
                  there is no category yet
                </span>
              )}
            </div>
          </div>
          <div className="flex justify-between items-center my-2 md:my-4">
            <div>
              <h3 className="capitalize text-sm md:text-xl underline underline-offset-4">
                rating
              </h3>
              <div
                className={`flex items-center gap-2 md:gap-5 md:text-2xl ${product?.rating! >= 4 ? "text-primary" : product?.rating! < 4 && product?.rating! >= 3 ? "text-amber-300" : product?.rating! < 3 && product?.rating! >= 2 ? "text-amber-500" : "text-destructive"}`}>
                {product?.rating.toFixed(1)}
                <RatingStars rating={product?.rating!} size={20} />
              </div>
            </div>
            <div className="md:text-4xl font-semibold">
              {product?.price} EGP
            </div>
          </div>
          <AddToCartButton
            productId={product.id}
            isLoggedIn={!!user}
            className="w-full text-sm md:text-lg h-12 cursor-pointer capitalize shadow-lg shadow-card-shadow"
            size={32}
          />
        </div>
      </section>
    </main>
  );
}
