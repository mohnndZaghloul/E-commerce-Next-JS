import { getCartProducts } from "@/actions/cart-actions";
import { getCurrentUser } from "@/actions/customers-actions";
import CartBoard from "@/components/cart/CartBoard";
import CartCard from "@/components/cart/CartCard";
import { Metadata } from "next";
import { redirect, unauthorized } from "next/navigation";

export const metadata: Metadata = {
  title: "Cart | Next Store",
  description: "cart page which contain products by customer to buy",
  keywords: ["favorite", "favorites"],
};

export default async function CartPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const cartProducts = await getCartProducts();

  return (
    <main className="relative container my-4 md:my-8 flex flex-col-reverse lg:flex-row gap-4">
      <div className="flex-2 space-y-2 rounded-md">
        {cartProducts.length > 0 ? (
          cartProducts.map((item) => <CartCard key={item.id} item={item} />)
        ) : (
          <p className="text-2xl capitalize border-2 p-10 rounded-md">
            no product in cart
          </p>
        )}
      </div>
      <CartBoard cartProducts={cartProducts} />
    </main>
  );
}
