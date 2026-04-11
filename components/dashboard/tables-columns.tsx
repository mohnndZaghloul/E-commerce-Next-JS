"use client";

import { deleteCustomer, resetPassword } from "@/actions/customers-actions";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, SendIcon, Trash2, CircleCheckBig } from "lucide-react";
import { signOut } from "../../lib/auth/auth-client";
import { useState } from "react";
import { deleteProduct } from "@/actions/products-actions";

export type Customer = {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  actions?: string;
};

export type Product = {
  id: string;
  title: string;
  price: number;
  rating: number;
  description: string;
  tags: string[];
  images: string[];
  createAt: Date;
  actions?: string;
};

export const CustomersColumns: ColumnDef<Customer>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && false)
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Joined",
    cell: ({ row }) => {
      const date = row.getValue("createdAt") as Date;
      return date.toLocaleDateString("en-US");
    },
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const [resetIsLoading, setResetIsLoading] = useState(false);
      const [deleteIsLoading, setDeleteIsLoading] = useState(false);
      const [isDone, setIsDone] = useState(false);
      return (
        <div className="space-x-2">
          <Button
            className="cursor-pointer"
            variant="outline"
            disabled={deleteIsLoading || isDone}
            onClick={async () => {
              setResetIsLoading(true);
              const result = await resetPassword(row.original.email);
              setIsDone(result);
              setResetIsLoading(false);
            }}
            // nativeButton={false}
            // render={<Link href={`./customers/${row.original.id}`} />}
          >
            {resetIsLoading ? (
              "Sending Email..."
            ) : isDone ? (
              <>
                <CircleCheckBig />
                Done
              </>
            ) : (
              <>
                <SendIcon />
                Reset Password
              </>
            )}
          </Button>
          <Button
            variant="destructive"
            disabled={deleteIsLoading || resetIsLoading}
            onClick={async () => {
              setDeleteIsLoading(true);
              const { isSelf } = await deleteCustomer(row.original.id);
              if (isSelf) {
                await signOut({
                  fetchOptions: {
                    onSuccess: () => {
                      window.location.href = "/login";
                    },
                  },
                });
              }
              setDeleteIsLoading(false);
            }}
            className="cursor-pointer">
            <Trash2 />
            {deleteIsLoading ? "deleting..." : "delete"}
          </Button>
        </div>
      );
    },
  },
];

export const ProductsColumns: ColumnDef<Product>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && false)
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "image",
    header: "Image",
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "rating",
    header: "Rating",
  },
  {
    accessorKey: "createAt",
    header: "Created",
    cell: ({ row }) => {
      const date = row.getValue("createAt") as Date;
      return date.toLocaleDateString("en-US");
    },
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const [deleteIsLoading, setDeleteIsLoading] = useState(false);
      return (
        <div className="space-x-2">
          <Button
            variant="destructive"
            disabled={deleteIsLoading}
            onClick={async () => {
              setDeleteIsLoading(true)
              await deleteProduct(row.original.id)
              setDeleteIsLoading(false)
            }}
            className="cursor-pointer">
            <Trash2 />
            {deleteIsLoading ? "deleting..." : "delete"}
          </Button>
        </div>
      );
    },
  },
];
