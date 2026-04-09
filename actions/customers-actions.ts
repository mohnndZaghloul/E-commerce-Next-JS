"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

export const deleteCustomer = async (id: string) => {
  const session = await auth.api.getSession({ headers: await headers() });
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
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) throw new Error("Unauthorized");

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
