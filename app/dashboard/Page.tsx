import ProductCard from "@/components/dashboard/ProductCard";
import StaticCard from "@/components/dashboard/StaticCard";
import { auth } from "@/lib/auth/auth";
import { prisma } from "@/lib/prisma";
import { Box, HeartIcon } from "lucide-react";
import { headers } from "next/headers";

export default async function DashboardPage() {
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
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="grid gap-4 lg:grid-cols-2">
        <StaticCard
          title="products"
          staticName="product"
          staticNumber={ProductsData.length.toString()}
          icon={<Box className="fill-primary text-primary" size={32} />}
        />
        <StaticCard
          title="favorites"
          staticName="item"
          staticNumber="5"
          icon={<HeartIcon className="fill-primary text-primary" size={32} />}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ProductsData.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
}
