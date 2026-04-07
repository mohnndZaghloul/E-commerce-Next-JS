import { DataTable } from "@/components/data-table";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { prisma } from "@/lib/prisma";
import { CustomersColumns } from "@/lib/tables-columns";

export default async function CustomersPage() {
  const UsersData = await prisma.user.findMany();

  return (
    // <Table>
    //   <TableCaption>All Customers.</TableCaption>
    //   <TableHeader>
    //     <TableRow>
    //       <TableHead>ID</TableHead>
    //       <TableHead>Name</TableHead>
    //       <TableHead>Email</TableHead>
    //       <TableHead>Joined</TableHead>
    //       <TableHead>Actions</TableHead>
    //     </TableRow>
    //   </TableHeader>
    //   <TableBody>
    //     {UsersData.map((user) => (
    //       <TableRow key={user.id}>
    //         <TableCell className="font-medium">{user.id}</TableCell>
    //         <TableCell>{user.name}</TableCell>
    //         <TableCell>{user.email}</TableCell>
    //         <TableCell lang="en">
    //           {user.createdAt.toLocaleString("en-US", {
    //             year: "numeric",
    //             month: "short",
    //             day: "numeric",
    //           })}
    //         </TableCell>
    //         <TableCell>edit / delete</TableCell>
    //       </TableRow>
    //     ))}
    //   </TableBody>
    //   <TableFooter>
    //     <TableRow>
    //       <TableCell colSpan={4}>Total Number</TableCell>
    //       <TableCell className="">{`${UsersData.length}`}</TableCell>
    //     </TableRow>
    //   </TableFooter>
    // </Table>
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Customers</h1>

      <DataTable columns={CustomersColumns} data={UsersData} />
    </div>
  );
}

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];
