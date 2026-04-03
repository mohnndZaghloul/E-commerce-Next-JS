"use client";

import Link from "next/link";
import { User2Icon } from "lucide-react";
import { useActionState } from "react";
import FormInput from "./FormInput";
import { signUpAction } from "@/actions/registerationActions";
import ErrorMessage from "./ErrorMessage";

export default function SignUpForm() {
  const [state, action, isPending] = useActionState(signUpAction, null);

  return (
    <form action={action} className="border p-10 w-full space-y-4">
      <div className="flex justify-between items-center text-xl capitalize border-b-2">
        <User2Icon size={52} /> sign up
      </div>
      <div>
        <FormInput name="name" type="text" value={state?.inputs.name} />
        <ErrorMessage message={state?.errors.name} />
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
        <ErrorMessage message={state?.errors.other} />
        <button
          type="submit"
          disabled={isPending}
          className="cursor-pointer w-full rounded bg-primary text-secondary hover:bg-secondary hover:text-primary border border-primary transition-colors py-2">
          {isPending ? "loading..." : "sign up"}
        </button>
        <p>
          has already account ?{" "}
          <Link className="underline" href="/login">
            login
          </Link>
        </p>
      </div>
    </form>
  );
}
