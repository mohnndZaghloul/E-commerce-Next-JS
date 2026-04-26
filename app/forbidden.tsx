import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function forbidden() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-5xl font-bold">403 - Forbidden</h1>
      <p className="text-muted-foreground">you are not allowed to pass</p>
      <Button
        nativeButton={false}
        render={
          <Link href="/" className="btn">
            back to home page
          </Link>
        }
      />
    </main>
  );
}
