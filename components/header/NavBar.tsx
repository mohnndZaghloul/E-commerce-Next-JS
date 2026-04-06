"use client";
import { useSession } from "@/lib/auth/auth-client";
import NavLink from "./NavLink";
import NavDropdownMenu from "./NavDropdownMenu";
import { ModeToggler } from "./ModeToggler";

export default function NavBar() {
  const { data } = useSession();

  return (
    <header className="bg-primary text-gray-800 h-12">
      <nav className="container text-lg h-full flex justify-between items-center">
        <div>logo</div>
        <ul className="flex items-center gap-5">
          <li>
            <NavLink href="/" text="shop" />
          </li>
          <li>
            <ModeToggler />
          </li>
          {data?.user ? (
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
        </ul>
      </nav>
    </header>
  );
}
