"use client";

import { Box } from "lucide-react";
import FormInput from "../registration/FormInput";
import { Input } from "../ui/input";

export default function ProductForm() {
  return (
    <form className="border p-10 w-full space-y-4 shadow-2xl bg-card rounded-xl">
      <div className="flex justify-between items-center text-xl capitalize border-b-2">
        <Box size={52} /> add product
      </div>
      <div>
        <FormInput
          name="title"
          placeholder="enter title"
          type="text"
          onChange={(e) => {
            e.target.value;
          }}
        />
      </div>
      <div>
        <FormInput
          name="price"
          placeholder="enter price"
          type="number"
          onChange={(e) => {}}
        />
      </div>
      <div>
        <FormInput
          name="description"
          placeholder="enter description"
          textarea
          type="text"
          onChange={(e) => {}}
        />
      </div>
      <div>
        <Input type="file" />
      </div>
    </form>
  );
}
