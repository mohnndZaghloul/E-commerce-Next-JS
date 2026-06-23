import { getProductById } from "@/actions/products-actions";
import { getAllCategories } from "@/actions/system-actions";
import ProductForm from "@/components/dashboard/products/ProductForm";

export default async function ProductPage({
  params,
}: {
  params: { productID: string };
}) {
  const { productID } = (await params) || "add-product";
  let mode;
  if (productID === "add-product") {
    mode = "add-product";
  } else {
    mode = "update-product";
  }
  const product = await getProductById(productID);
  const categories = await getAllCategories();

  return (
    <div className="container">
      <ProductForm mode={mode} product={product} categories={categories} />
    </div>
  );
}
