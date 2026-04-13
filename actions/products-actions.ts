"use server";

import { auth } from "@/lib/auth/auth";
import { prisma } from "@/lib/prisma";
import { ProductFormActionState_TP, ProductFormErrors } from "@/lib/types";
import { ProductSchema } from "@/lib/validation";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const productFormActions = async (
  meta: { mode: string; productId?: string },
  prevState: ProductFormActionState_TP,
  formData: FormData,
) => {
  const session = await auth.api.getSession({ headers: await headers() });
  const rawData = {
    title: (formData.get("title") as string) || "",
    price: (formData.get("price") as string) || "",
    description: (formData.get("description") as string) || "",
    tags: (formData.get("tags") as string) || "",
    images: JSON.parse((formData.get("images") as string) || "[]"),
  };
  const emptyErrors: ProductFormErrors = {
    title: [],
    price: [],
    description: [],
    tags: [],
    images: [],
    general: [],
  };

  if (!session?.user.id) {
    return {
      errors: {
        ...emptyErrors,
        general: ["you are unauthorized for adding product"],
      },
      inputs: rawData,
    };
  }

  const validated = ProductSchema.safeParse(rawData);
  if (!validated.success) {
    return {
      errors: {
        ...emptyErrors,
        ...validated.error.flatten().fieldErrors,
      },
      inputs: rawData,
    };
  }

  const { title, price, description, tags, images } = validated.data;
  try {
    if (meta.mode === "add-product") {
      await prisma.product.create({
        data: {
          title,
          price,
          description,
          tags: tags.split(",").map((t) => t.trim()),
          images,
          createdById: session?.user?.id,
        },
      });
    } else {
      if (meta.mode !== "add-product" && !meta.productId) {
        throw new Error("Product ID is required for update");
      }
      await prisma.product.update({
        where: { id: meta.productId },
        data: {
          title,
          price,
          description,
          tags: tags.split(",").map((t) => t.trim()),
          images,
          createdById: session?.user?.id,
        },
      });
    }
  } catch (error) {
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
