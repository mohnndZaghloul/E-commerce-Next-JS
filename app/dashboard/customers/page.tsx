import { CustomersColumns } from "@/components/dashboard/tables-columns";
import { DataTable } from "@/components/dashboard/data-tables/data-table";
import { User } from "lucide-react";
import { getAllUsers, getRole } from "@/actions/customers-actions";
import { forbidden } from "next/navigation";
import { Metadata } from "next";
import { Role_TP } from "@/lib/types";

export const metadata: Metadata = {
  title: "Users | Next Store",
  description: "page contain users which signed up in this store",
  keywords: ["users", "customers", "owners", "dashboard"],
};

export default async function CustomersPage() {
  const role = await getRole();
  if (role !== Role_TP.ADMIN) forbidden();

  let UsersData;
  try {
    UsersData = await getAllUsers();
  } catch {
    return <p>some thing went wrong in server</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-xl md:text-2xl uppercase font-bold mb-4 flex items-center gap-2">
        <User />
        customer
      </h1>
      <DataTable columns={CustomersColumns} data={UsersData} filter="email" />
    </div>
  );
}
