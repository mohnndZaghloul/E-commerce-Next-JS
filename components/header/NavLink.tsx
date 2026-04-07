"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLink_TP = {
  href: string;
  text: string;
};
export default function NavLink({ href, text }: NavLink_TP) {
  const path = usePathname();

  return (
    <Link
      href={href}
      className={`capitalize w-full ${path.endsWith(href) ? "text-primary" : "hover:text-primary"} transition-colors`}>
      {text}
    </Link>
  );
}
