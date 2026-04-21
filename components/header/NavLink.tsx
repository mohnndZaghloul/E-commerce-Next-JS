"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLink_TP = {
  href: string;
  children?: React.ReactNode;
};
export default function NavLink({ href, children }: NavLink_TP) {
  const path = usePathname();

  return (
    <Link
      href={href}
      className={`capitalize w-full ${path.endsWith(href) ? "text-primary" : "hover:text-primary"} transition-colors flex gap-2`}>
      {children}
    </Link>
  );
}
