import { getAllCategories } from "@/actions/system-actions";
import CategoriesForm from "@/components/dashboard/system/CategoriesForm";

export default async function SystemPage() {
  const categories = await getAllCategories();

  return (
    <main className="container">
      <div>
        <h2 className="capitalize text-xl md:text-3xl">Categories</h2>
        <div className="border-y-2 py-8 my-4 ">
          <CategoriesForm categories={categories} />
        </div>
      </div>
    </main>
  );
}
