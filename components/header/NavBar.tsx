import NavLink from "./NavLink";

export default function NavBar() {
  return (
    <header className="bg-primary text-gray-800 h-12">
      <nav className="container text-lg h-full flex justify-between items-center">
        <div>logo</div>
        <ul className="flex gap-5">
          <li><NavLink href="/" text="shop"/></li>
          <li><NavLink href="/login" text="login"/></li>
          <li><NavLink href="/sign-up" text="sign up"/></li>
          {/* <li><NavLink href="/dashboard" text="dashboard"/></li> */}
        </ul>
      </nav>
    </header>
  );
}
