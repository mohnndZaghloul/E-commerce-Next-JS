import { z } from "zod";

type UserState_TP = {
  name?: string;
  email: string;
  phone?: string;
  password: string;
};

export function registrationValidation(userState: UserState_TP) {
  let errors = { name: "", email: "", password: "", phone: "", other: "" };

  if (!userState.name || userState.name.trim().length === 0) {
    errors.name = "name is required";
  }
  if (!userState.email.includes("@")) {
    errors.email = "invalid email";
  }
  if (!userState.email) {
    errors.email = "email is required";
  }
  if (!userState.phone || userState.phone.trim().length < 10) {
    errors.phone = "phone is required and should be more than 10 digits";
  }
  if (userState.password.length < 8) {
    errors.password = "password must be 8 digits or more";
  }
  return errors;
}

export const ProductSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must be less than 100 characters"),

  price: z.coerce
    .number({ error: "Price must be a number" })
    .positive("Price must be greater than 0"),

  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description must be less than 1000 characters"),

  tags: z.string().min(1, "At least one tag is required"),

  images: z
    .array(z.string().url("Invalid image URL"))
    .min(1, "At least one image is required"),
});
