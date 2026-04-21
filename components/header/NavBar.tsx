"use client";
import { useSession } from "@/lib/auth/auth-client";
import NavLink from "./NavLink";
import NavDropdownMenu from "./NavDropdownMenu";
import { ModeToggler } from "./ModeToggler";
import { Skeleton } from "../ui/skeleton";
import { Heart, ShoppingCart, Store } from "lucide-react";
import { Badge } from "../ui/badge";
import { useCartStore } from "@/store/cart";
import { useFavStore } from "@/store/favorite";
import { getCart } from "@/actions/cart-actions";
import { useEffect } from "react";
import { getFav } from "@/actions/favorite-actions";

export default function NavBar() {
  const { data, isPending } = useSession();
  const CartCount = useCartStore((state) => state.count);
  const FavCount = useFavStore((state) => state.count);
  const setCartCount = useCartStore((state) => state.setCartCount);
  const setFavCount = useFavStore((state) => state.setFavCount);

  useEffect(() => {
    const loadNav = async () => {
      const cart = await getCart();
      const fav = await getFav();
      const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
      setCartCount(totalQuantity);
      setFavCount(fav.length);
    };
    loadNav();
  }, [data?.user.id, setCartCount, setFavCount]);

  return (
    <header className="h-12 border-b shadow">
      <nav className="container h-full flex justify-between items-center">
        <div>logo</div>
        <ul className="flex h-full items-center gap-5">
          <li>
            <NavLink href="/">
              <Store /> shop
            </NavLink>
          </li>
          {isPending ? (
            <li className="w-8 h-8">
              <Skeleton className="w-8 h-8 rounded-full" />
            </li>
          ) : data?.user ? (
            <>
              <li>
                <NavLink href="/cart">
                  <div className="relative">
                    <ShoppingCart />
                    {CartCount > 0 ? (
                      <Badge className="absolute -top-2 -right-2 text-xs">
                        {CartCount}
                      </Badge>
                    ) : null}
                  </div>
                  cart
                </NavLink>
              </li>
              <li>
                <NavLink href="/favorites">
                  <div className="relative">
                    <Heart />
                    {FavCount > 0 ? (
                      <Badge className="absolute -top-2 -right-2 text-xs">
                        {FavCount}
                      </Badge>
                    ) : null}
                  </div>
                  fav
                </NavLink>
              </li>
              <li>
                <NavDropdownMenu data={data} />
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink href="/login">login</NavLink>
              </li>
              <li>
                <NavLink href="/sign-up">sign up</NavLink>
              </li>
            </>
          )}
          <li>
            <ModeToggler />
          </li>
        </ul>
      </nav>
    </header>
  );
}
