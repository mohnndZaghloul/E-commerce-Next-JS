"use client";
import { useSession } from "@/lib/auth/auth-client";
import NavLink from "./NavLink";
import NavDropdownMenu from "./NavDropdownMenu";
import { ModeToggler } from "./ModeToggler";
import { Skeleton } from "../ui/skeleton";

export default function NavBar() {
  const { data, isPending } = useSession();

  return (
    <header className="h-12 border-b shadow">
      <nav className="container h-full flex justify-between items-center">
        <div>logo</div>
        <ul className="flex h-full items-center gap-5">
          <li>
            <NavLink href="/" text="shop" />
          </li>
          {isPending ? (
            <li className="w-8 h-8">
              <Skeleton className="w-8 h-8 rounded-full" />
            </li>
          ) : data?.user ? (
            <li>
              <NavDropdownMenu data={data} />
            </li>
          ) : (
            <>
              <li>
                <NavLink href="/login" text="login" />
              </li>
              <li>
                <NavLink href="/sign-up" text="sign up" />
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
