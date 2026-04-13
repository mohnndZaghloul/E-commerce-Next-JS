import { prisma } from "@/lib/prisma";
import { ProductsColumns } from "@/components/dashboard/tables-columns";
import { DataTable } from "@/components/dashboard/data-tables/data-table";
import { Box, CirclePlusIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { headers } from "next/headers";
import { auth } from "@/lib/auth/auth";

export default async function ProductsPage() {
  let ProductsData;
  const session = await auth.api.getSession({ headers: await headers() });

  try {
    ProductsData = await prisma.product.findMany({
      where: {
        createdById: session?.user.id,
      },
    });
  } catch {
    return <p>some thing went wrong in server</p>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl uppercase font-bold mb-4 flex items-center gap-2">
          <Box />
          your products
        </h1>
        <Button
          className="capitalize"
          nativeButton={false}
          render={
            <Link href="./products/add-product">
              <CirclePlusIcon />
              add new product
            </Link>
          }
        />
      </div>
      <DataTable columns={ProductsColumns} data={ProductsData} filter="title" />
    </div>
  );
}
