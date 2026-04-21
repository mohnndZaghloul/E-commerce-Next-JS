"use client";

import { addCategoryAction } from "@/actions/system-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useActionState } from "react";
import DeleteButton from "../DeleteButton";

export default function CategoriesForm({
  categories,
}: {
  categories: { id: string; name: string }[];
}) {
  const initialState = {};
  const [state, action, isPending] = useActionState(
    addCategoryAction,
    initialState,
  );

  return (
    <form className="space-y-4" action={action}>
      <div className="flex flex-wrap justify-center gap-4">
        {categories[0] ? (
          categories.map((category) => (
            <p
              className="relative rounded-md text-xl capitalize p-4 bg-muted border"
              key={category.id}>
              {category.name}
              <DeleteButton
                title="delete category"
                description="are you sure you want delete this category?"
                id={category.id}>
                ✕
              </DeleteButton>
            </p>
          ))
        ) : (
          <p className="w-xl rounded-md text-xl capitalize p-4 border">
            no categories yet
          </p>
        )}
      </div>
      <div className="flex justify-center items-center gap-4">
        <Input
          required
          minLength={3}
          className="w-sm text-lg! py-5"
          placeholder="Add category"
          name="category"
        />
        <Button
          disabled={isPending}
          type="submit"
          className="cursor-pointer capitalize text-lg px-4 py-5">
          {isPending ? "adding..." : "add category"}
        </Button>
      </div>
    </form>
  );
}
