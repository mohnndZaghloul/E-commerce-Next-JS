"use client";

import { Button } from "@/components/ui/button";
import { signIn, signOut, signUp, useSession } from "@/lib/auth/auth-client";
import { useState } from "react";

export default function Home() {
  const [state, setState] = useState("");
  const { data: session } = useSession();

  return (
    <main className="container">
      <h1 className="text-lg">this is store page</h1>
      <button
        onClick={async () => {
          const response = await signUp.email({
            email: "fakeEmail@mail.com",
            name: "test",
            password: "123456789",
          });
          console.log(response);
          setState(`${response?.error?.message}`);
        }}
        className="cursor-pointer bg-primary px-10 py-2">
        sign up
      </button>
      <button
        onClick={async () => {
          const response = await signIn.email({
            email: "fakeEmail@mail.com",
            password: "123456789",
          });
          console.log(response);
          setState(`${response?.error?.message}`);
        }}
        className="cursor-pointer bg-secondary px-10 py-2">
        login
      </button>
      <button
        onClick={async () => {
          const response = await signOut();
          console.log(response);
          setState(`${response?.error}-- ${response?.data?.success}`);
        }}
        className="cursor-pointer bg-fuchsia-600 px-10 py-2">
        log out
      </button>
      <button
        onClick={() => {
          setState(
            `${session?.user.name} - ${session?.user.email} - ${session?.session.token}`,
          );
        }}
        className="cursor-pointer bg-cyan-400 px-10 py-2">
        session
      </button>
      <p>{state}</p>
    </main>
  );
}
