import { routes } from "@/lib/centralized-routes";
import Link from "next/link";

export default function ProductsPage() {
  return (
    <div>
      Products Page
      <div>
        <Link href={routes.addProduct}>add product</Link>
      </div>
    </div>
  );
}
