"use client";

import Link from "next/link";
import { User2Icon } from "lucide-react";
import { useActionState } from "react";
import FormInput from "./FormInput";
import { loginAction } from "@/actions/registerationActions";
import ErrorMessage from "./ErrorMessage";

export default function LoginForm() {
  const [state, action, isPending] = useActionState(loginAction, null);
  
  return (
    <form action={action} className="border p-10 w-full space-y-4">
      <div className="flex justify-between items-center text-xl capitalize border-b-2">
        <User2Icon size={52} /> login
      </div>
      <div>
        <FormInput name="email" type="email" value={state?.inputs.email} />
        <ErrorMessage message={state?.errors.email} />
      </div>
      <div>
        <FormInput
          name="password"
          type="password"
          value={state?.inputs.password}
          minlength={8}
        />
        <ErrorMessage message={state?.errors.password} />
      </div>
      <div className="mt-5 text-center space-y-1">
        <button
          type="submit"
          disabled={isPending}
          className="cursor-pointer w-full rounded bg-primary text-secondary hover:bg-secondary hover:text-primary border border-primary transition-colors py-2">
          {isPending ? "loading..." : "login"}
        </button>
        <p>
          don't have an account ?{" "}
          <Link className="underline" href="/sign-up">
            sign up
          </Link>
        </p>
      </div>
    </form>
  );
}
