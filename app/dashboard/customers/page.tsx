import { prisma } from "@/lib/prisma";
import { CustomersColumns } from "@/components/dashboard/tables-columns";
import { DataTable } from "@/components/dashboard/data-tables/data-table";
import { User } from "lucide-react";
import { getRole } from "@/actions/customers-actions";
import { redirect } from "next/navigation";

export default async function CustomersPage() {
  const role = await getRole();
  if (role !== "ADMIN") redirect("/dashboard");

  let UsersData;
  try {
    UsersData = await prisma.user.findMany();
  } catch {
    return <p>some thing went wrong in server</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl uppercase font-bold mb-4 flex items-center gap-2">
        <User />
        customer
      </h1>
      <DataTable columns={CustomersColumns} data={UsersData} filter="email" />
    </div>
  );
}
