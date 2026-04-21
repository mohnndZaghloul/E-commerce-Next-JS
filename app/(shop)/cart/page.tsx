import { getCartProducts } from "@/actions/cart-actions";
import { getCurrentUser } from "@/actions/customers-actions";
import CartCard from "@/components/cart/CartCard";
import { notFound, unauthorized } from "next/navigation";

export default async function CartPage() {
  const user = await getCurrentUser();
  if (!user) unauthorized();

  const cartProducts = await getCartProducts();

  return (
    <main className="relative container my-8 flex gap-4">
      <div className="flex-2 space-y-2 rounded-md">
        {cartProducts.length > 0 ? (
          cartProducts.map((item) => <CartCard key={item.id} item={item} />)
        ) : (
          <p className="text-2xl capitalize border-2 p-10 rounded-md">
            no product in cart
          </p>
        )}
      </div>
      <div className="sticky top-4 flex-1 max-h-100 rounded-md border-2">
        cart board
      </div>
    </main>
  );
}
