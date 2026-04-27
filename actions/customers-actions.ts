"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/auth/session";
import { forbidden } from "next/navigation";
import { Role_TP } from "@/lib/types";

export const getRole = async () => {
  const data = await getSession();
  const user = await prisma.user.findUnique({
    where: { id: data?.user.id },
  });
  return user?.role;
};

export const setRole = async (id: string, role: Role_TP) => {
  const result = await getRole();
  if (result !== Role_TP.ADMIN) {
    forbidden();
  }
  await prisma.user.update({
    where: { id },
    data: { role: role },
  });
  revalidatePath("/dashboard");
};

export const getCurrentUser = async () => {
  const session = await getSession();
  return session?.user;
};

export const getAllUsers = async () => {
  return await prisma.user.findMany({ orderBy: { name: "asc" } });
};

export const deleteCustomer = async (id: string) => {
  const session = await getSession();
  const role = await getRole();
  if (role !== Role_TP.ADMIN) {
    forbidden();
  }
  const isSelf = session?.user.id === id;

  if (isSelf && session?.session.token) {
    await auth.api.revokeSession({
      headers: await headers(),
      body: { token: session.session.token },
    });
  }

  await prisma.user.delete({ where: { id } });
  revalidatePath("/dashboard/customers");

  return { isSelf };
};

export const updateCustomer = async (
  id: string,
  data: { name: string; email: string; password: string },
) => {
  const role = await getRole();
  if (role !== Role_TP.ADMIN) {
    forbidden();
  }

  await prisma.user.update({
    where: { id },
    data: { name: data.name, email: data.email },
  });

  if (data.password) {
    await auth.api.setPassword({
      body: {
        newPassword: data.password,
      },
      headers: await headers(),
    });
  }
  revalidatePath("/dashboard/customers");
};

export const resetPassword = async (email: string) => {
  try {
    await auth.api.requestPasswordReset({
      body: { email },
    });
    return true;
  } catch {
    return false;
  }
};
