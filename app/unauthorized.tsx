// app/unauthorized.tsx
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Unauthorized() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-5xl font-bold">401 - Unauthorized</h1>
      <p className="text-muted-foreground">You need to login</p>
      <Button
        nativeButton={false}
        render={
          <Link href="/sign-in" className="btn">
            login
          </Link>
        }
      />
    </main>
  );
}
