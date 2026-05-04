"use client";

import { Category_TP, Product_TP, User_TP } from "@/lib/types";
import ProductCard from "../dashboard/ProductCard";
import { Button } from "../ui/button";
import { useEffect, useState, useTransition } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Loader, Search } from "lucide-react";
import { Input } from "../ui/input";

export default function ProductsSection({
  user,
  products,
  currentPage,
  totalPages,
  favoriteIds,
  categories,
}: {
  user: User_TP;
  products: Product_TP[];
  currentPage: number;
  totalPages: number;
  favoriteIds: Set<string>;
  categories: Category_TP[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [searchText, setSearchText] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);

  const selectedCategories = searchParams.get("categories")?.split(",") ?? [];

  const toggleCategory = (id: string) => {
    const current = new URLSearchParams(searchParams.toString());
    const selected = selectedCategories.includes(id)
      ? selectedCategories.filter((c) => c !== id)
      : [...selectedCategories, id];

    if (selected.length === 0) {
      current.delete("categories");
    } else {
      current.set("categories", selected.join(","));
    }

    current.delete("page");

    startTransition(() => {
      router.push(`${pathname}?${current.toString()}`);
    });
  };

  const goToPage = (page: number) => {
    const current = new URLSearchParams(searchParams.toString());
    current.set("page", String(page));
    startTransition(() => {
      router.push(`${pathname}?${current.toString()}`);
    });
  };

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  const searchHandler = () => {
    const result = products.filter((product) =>
      product.title.toLowerCase().includes(searchText.toLowerCase()),
    );
    setFilteredProducts(result);
  };

  return (
    <div className="container my-4 md:my-16">
      <h1 className="text-3xl md:text-5xl font-semibold uppercase text-transparent text-stroke my-4 md:my-8">
        Products Section
      </h1>
      <h3 className="capitalize md:text-xl">search by title</h3>
      <div className="flex items-center gap-2 my-2">
        <Input
          onChange={(e) => setSearchText(e.target.value)}
          value={searchText}
          type="text"
          name="filter"
          placeholder="Search for product"
        />
        <Button
          onClick={searchHandler}
          size="lg"
          className="md:w-3xs capitalize cursor-pointer">
          <Search />
          search
        </Button>
      </div>
      <h3 className="capitalize md:text-xl">select category</h3>
      <div className="flex flex-wrap gap-2 my-4">
        {categories.map((category) => {
          const isSelected = selectedCategories.includes(category.id);
          return (
            <Button
              key={category.id}
              disabled={isPending}
              onClick={() => toggleCategory(category.id)}
              className={`cursor-pointer px-3 py-1 rounded-full text-xs md:text-sm border transition-colors ${
                isSelected
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-muted! text-muted-foreground! border-border hover:border-primary!"
              }`}>
              {category.name}
            </Button>
          );
        })}
      </div>
      {isPending ? (
        <div className="flex justify-center items-center h-64">
          <Loader className="animate-spin text-primary " size={40} />
        </div>
      ) : filteredProducts[0] ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredProducts.map((product) => {
            const isFavorite = !!user ? favoriteIds.has(product.id) : undefined;
            return (
              <ProductCard
                key={product.id}
                product={product}
                isFavorite={isFavorite}
                isLoggedIn={!!user}
              />
            );
          })}
        </div>
      ) : (
        <div className="bg-card border p-10 rounded-xl">
          <p className="text-center text-3xl uppercase">no product found</p>
        </div>
      )}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          <Button
            className="cursor-pointer"
            variant="outline"
            disabled={currentPage <= 1 || isPending}
            onClick={() => goToPage(currentPage - 1)}>
            Previous
          </Button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              className="cursor-pointer"
              key={page}
              variant={page === currentPage ? "default" : "outline"}
              disabled={isPending}
              onClick={() => goToPage(page)}>
              {page}
            </Button>
          ))}

          <Button
            className="cursor-pointer"
            variant="outline"
            disabled={currentPage >= totalPages || isPending}
            onClick={() => goToPage(currentPage + 1)}>
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
