import CustomerEditForm from "@/components/dashboard/CustomerEditForm";
import { prisma } from "@/lib/prisma";

type Props = {
  params: { customerID: string };
};

export default async function CustomerPage({ params }: Props) {
  const { customerID } = await params;
  const customer = await prisma.user.findUnique({
    where: { id: customerID },
  });

  if (!customer) return <div>Customer not found</div>;

  return (
    <div className="container">
      <CustomerEditForm customer={customer} />
    </div>
  );
}
