import ProductForm from "@/components/dashboard/products/ProductForm";
import { prisma } from "@/lib/prisma";

export default async function ProductPage({ params }: any) {
  const { productID } = (await params) || "add-product";
  let mode;
  if (productID === "add-product") {
    mode = "add-product";
  } else {
    mode = "update-product";
  }
  const product = await prisma.product.findUnique({ where: { id: productID } });

  return (
    <div className="container">
      <ProductForm mode={mode} product={product} />
    </div>
  );
}
