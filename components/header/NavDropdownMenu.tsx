import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { LogOutIcon, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { signOut } from "@/lib/auth/auth-client";
import { useRouter } from "next/navigation";

export default function NavDropdownMenu({ data }: any) {
  const router = useRouter();
  const signOutHandler = async () => {
    const result = await signOut();
    if (result.data) {
      router.replace("/login");
    } else {
      throw Error("error while signing out");
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger 
        render={
          <Button variant="outline">{data?.user?.name[0].toUpperCase()}</Button>
        }
      />
      <DropdownMenuContent className="w-full">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="capitalize">
            {data?.user?.name}
          </DropdownMenuLabel>
          <DropdownMenuLabel>{data?.user.email}</DropdownMenuLabel>
          <DropdownMenuItem>
            <Link href="/dashboard" className="w-full flex justify-between">
              Dashboard
              <LayoutDashboard />
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={signOutHandler}
            variant="destructive"
            className="flex justify-between">
            Sign Out
            <LogOutIcon />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
