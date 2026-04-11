import { prisma } from "@/lib/prisma";
import { ProductsColumns } from "@/components/dashboard/tables-columns";
import { DataTable } from "@/components/dashboard/data-tables/data-table";
import { User } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function ProductsPage() {
  const ProductsData = await prisma.product.findMany();

  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl uppercase font-bold mb-4 flex items-center gap-2">
          <User />
          your products
        </h1>
        <Button
          nativeButton={false}
          render={<Link href="./products/add-product">add new product</Link>}
        />
      </div>
      <DataTable columns={ProductsColumns} data={ProductsData} filter="title" />
    </div>
  );
}
