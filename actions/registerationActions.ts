"use server";

import { auth } from "@/lib/auth/auth";
import { hashingPassword, verifyPassword } from "@/lib/hashing";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export const signUpAction = async (prevState: any, formData: any) => {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  let errors = { name: "", email: "", password: "", other: "" };

  if (!name || name.trim().length === 0) {
    errors.name = "name is required";
  }
  if (!email.includes("@") || !email) {
    errors.email = "invalid email";
  }
  if (password.length < 8) {
    errors.password = "invalid password";
  }

  if (Object.values(errors).some(Boolean)) {
    return { errors, inputs: { name, email, password } };
  }

  try {
    const hashedPassword = await hashingPassword(password);
    // await prisma.user.create({
    //   data: { name, email, password: hashedPassword },
    // });
    const response = await auth.api.signUpEmail({
      body: { name, email, password: hashedPassword },
      asResponse: true,
    });
  } catch (error) {
    const err = error as any;
    if (err.code === "P2002") {
      errors.email = "email is already used before";
    } else {
      errors.other = "something wrong try again later...";
    }
    return { errors, inputs: { name, email, password } };
  }
  // redirect("/dashboard");
};

export const loginAction = async (prevState: any, formData: any) => {
  const email = formData.get("email");
  const password = formData.get("password");
  let errors = { email: "", password: "" };

  if (!email.includes("@") || !email) {
    errors.email = "invalid email";
  }
  if (password.length < 8) {
    errors.password = "invalid password";
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    const validPassword = await verifyPassword(user?.password!, password);
    if (!user) {
      errors.email = "User not found";
    }
    if (user && !validPassword) {
      errors.password = "Wrong password";
    }
  } catch (error) {}

  if (Object.values(errors).some(Boolean)) {
    return { errors, inputs: { email, password } };
  }

  redirect("/dashboard");
};
