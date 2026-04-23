"use client";

import { Box, PlusCircle, Tag } from "lucide-react";
import FormInput from "../../registration/FormInput";
import { Input } from "../../ui/input";
import { useActionState, useEffect, useState } from "react";
import { productFormActions } from "@/actions/products-actions";
import { Button } from "../../ui/button";
import ImagesGrid from "./ImagesGrid";
import ErrorMessage from "@/components/registration/ErrorMessage";
import {
  Category_TP,
  Product_TP,
  ProductFormActionState_TP,
} from "@/lib/types";
import { Label } from "@/components/ui/label";

export default function ProductForm({
  mode,
  product,
  categories,
}: {
  mode: string;
  product: Product_TP | null;
  categories: Category_TP[];
}) {
  const initialState: ProductFormActionState_TP = {
    errors: {},
    inputs: {
      title: "",
      price: "",
      description: "",
      tags: "",
      images: [],
    },
  };
  const [state, action, isLoading] = useActionState(
    productFormActions.bind(null, {
      mode,
      productId: product?.id,
    }),
    initialState as ProductFormActionState_TP,
  );
  const [formValues, setFormValues] = useState({
    title: "",
    price: 0,
    tags: [""],
    description: "",
  });
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [uploadingCount, setUploadingCount] = useState(0);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  useEffect(() => {
    if (product) {
      setFormValues({
        title: product.title,
        price: product.price,
        tags: product.tags,
        description: product.description,
      });
      setImageUrls(product.images || []);
      if (product.categories) {
        setSelectedCategories(product.categories.map((c) => c.id));
      }
    }
  }, [product]);

  const toggleCategory = (id: string) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id],
    );
  };

  const handleUpload = async (files: FileList) => {
    const filesArray = Array.from(files);
    setUploadingCount(filesArray.length);

    const uploadPromises = filesArray.map(async (file) => {
      const sigRes = await fetch("/api/cloudinary-sign", { method: "POST" });
      const { timestamp, signature } = await sigRes.json();

      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!);
      formData.append("timestamp", timestamp.toString());
      formData.append("signature", signature);
      formData.append("folder", "products");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dga5szew1/image/upload",
        { method: "POST", body: formData },
      );

      const data = await res.json();
      return data.secure_url as string;
    });

    try {
      const urls = await Promise.all(uploadPromises);
      setImageUrls((prev) => [...prev, ...urls]);
    } catch {
      console.error("One or more uploads failed");
    } finally {
      setUploadingCount(0);
    }
  };

  const handleRemove = (urlToRemove: string) => {
    setImageUrls((prev) => prev.filter((url) => url !== urlToRemove));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (e.target.name === "tags") {
      setFormValues((prev) => ({
        ...prev,
        tags: e.target.value.split(",").map((t) => t.trim()),
      }));
    } else {
      setFormValues((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    }
  };

  return (
    <form
      action={action}
      className="border p-10 w-full space-y-4 shadow-2xl bg-card rounded-xl">
      <div className="flex justify-between items-center text-xl capitalize border-b-2">
        <Box size={52} />{" "}
        {mode == "add-product" ? "add product" : "update product"}
      </div>
      <div>
        <FormInput
          name="title"
          placeholder="enter title"
          type="text"
          error={state?.errors?.title?.[0]}
          value={formValues.title}
          onChange={handleChange}
        />
      </div>
      <div className="flex gap-2">
        <FormInput
          name="price"
          placeholder="0.00"
          type="number"
          minlength={0}
          step="0.01"
          error={state?.errors?.price?.[0]}
          value={formValues.price.toString()}
          onChange={handleChange}
        />
        <FormInput
          name="tags"
          placeholder="enter tags"
          type="text"
          error={state?.errors?.tags?.[0]}
          value={formValues.tags.join(", ")}
          onChange={handleChange}
        />
      </div>
      <div>
        <FormInput
          name="description"
          placeholder="enter description"
          textarea
          type="text"
          error={state?.errors?.description?.[0]}
          value={formValues.description}
          onChange={handleChange}
        />
      </div>
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm font-medium">
          <Tag size={16} />
          <Label>Categories</Label>
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => {
            const isSelected = selectedCategories.includes(category.id);
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => toggleCategory(category.id)}
                className={`cursor-pointer px-3 py-1 rounded-full text-sm border transition-colors ${
                  isSelected
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-muted text-muted-foreground border-border hover:border-primary"
                }`}>
                {category.name}
              </button>
            );
          })}
        </div>

        <input
          type="hidden"
          name="categories"
          value={JSON.stringify(selectedCategories)}
        />
      </div>
      <div className="space-y-2">
        <ErrorMessage message={state?.errors?.images?.[0]} />
        <Input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => {
            if (e.target.files?.[0]) handleUpload(e.target.files);
          }}
        />
        <input
          type="hidden"
          name="images"
          value={JSON.stringify(imageUrls ?? [])}
        />

        {uploadingCount > 0 && (
          <p className="text-sm text-muted-foreground">
            Uploading {uploadingCount} image(s)...
          </p>
        )}

        <ImagesGrid imageUrls={imageUrls} handleRemove={handleRemove} />
      </div>
      <ErrorMessage message={state?.errors?.general?.[0]} />
      <Button
        className="cursor-pointer"
        disabled={uploadingCount > 0 || isLoading}
        type="submit">
        <PlusCircle />
        {isLoading
          ? mode === "add-product"
            ? "Creating..."
            : "Updating..."
          : mode === "add-product"
            ? "Add Product"
            : "Update Product"}
      </Button>
    </form>
  );
}
