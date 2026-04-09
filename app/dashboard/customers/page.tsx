import { prisma } from "@/lib/prisma";
import { CustomersColumns } from "@/lib/tables-columns";
import { DataTable } from "@/components/data-table";

export default async function CustomersPage() {
  const UsersData = await prisma.user.findMany();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Customers</h1>
      <DataTable columns={CustomersColumns} data={UsersData} />
    </div>
  );
}