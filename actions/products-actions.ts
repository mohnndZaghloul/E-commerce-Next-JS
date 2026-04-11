"use server";

import { prisma } from "@/lib/prisma";
import { ProductSchema } from "@/lib/validation";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type ProductFormState = {
  errors?: {
    title?: string[];
    price?: string[];
    description?: string[];
    tags?: string[];
    images?: string[];
    general?: string[];
  };
  inputs?: {
    title: string;
    price: string;
    description: string;
    tags: string;
    images: string[];
  };
  success?: boolean;
};

export const addProductAction = async (
  prevState: ProductFormState,
  formData: FormData,
): Promise<ProductFormState> => {
  const rawData = {
    title: (formData.get("title") as string) || "",
    price: (formData.get("price") as string) || "",
    description: (formData.get("description") as string) || "",
    tags: (formData.get("tags") as string) || "",
    images: JSON.parse((formData.get("images") as string) || "[]"),
  };

  const validated = ProductSchema.safeParse(rawData);
  if (!validated.success) {
    return {
      errors: validated.error.flatten().fieldErrors,
      inputs: rawData,
    };
  }
  const { title, price, description, tags, images } = validated.data;
  try {
    await prisma.product.create({
      data: { title, price, description, tags: tags.split(","), images },
    });
  } catch (error) {
    console.error("Prisma Error:", error);
    return {
      errors: { general: ["Something went wrong"] },
      inputs: rawData,
    };
  }
  redirect("/dashboard/products");
};

export const deleteProduct = async (id: string) => {
  await prisma.product.delete({ where: { id } });
  revalidatePath("/dashboard/customers");
};
