"use client";

import { useState } from "react";
import Link from "next/link";
import { User2Icon } from "lucide-react";
import FormInput from "./FormInput";
import ErrorMessage from "./ErrorMessage";
import { signUpValidation } from "@/lib/validation";
import { signUp } from "@/lib/auth/auth-client";
import { useRouter } from "next/navigation";

export default function SignUpForm() {
  const router = useRouter();
  const [userState, setUserState] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    other: "",
  });

  const signUpHandler = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const result = signUpValidation(userState);
    if (Object.values(result).some(Boolean)) {
      setErrors(result);
      setIsLoading(false);
      return;
    }
    const { data, error } = await signUp.email(userState);
    if (error?.code) {
      setErrors({ ...result, other: error?.message! });
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
    router.replace("/dashboard");
  };

  return (
    <form onSubmit={signUpHandler} className="border p-10 w-full space-y-4">
      <div className="flex justify-between items-center text-xl capitalize border-b-2">
        <User2Icon size={52} /> sign up
      </div>
      <div>
        <FormInput
          name="name"
          placeholder="enter name"
          type="text"
          onChange={(e) => setUserState({ ...userState, name: e.target.value })}
        />
        <ErrorMessage message={errors?.name} />
      </div>
      <div>
        <FormInput
          name="email"
          placeholder="enter email"
          type="email"
          onChange={(e) =>
            setUserState({ ...userState, email: e.target.value })
          }
        />
        <ErrorMessage message={errors?.email} />
      </div>
      <div>
        <FormInput
          name="password"
          placeholder="enter password"
          type="password"
          minlength={8}
          onChange={(e) =>
            setUserState({ ...userState, password: e.target.value })
          }
        />
        <ErrorMessage message={errors?.password} />
      </div>
      <div className="mt-5 text-center space-y-1">
        <ErrorMessage message={errors?.other} />
        <button
          type="submit"
          disabled={isLoading}
          className={`cursor-pointer w-full rounded bg-primary text-secondary hover:opacity-80  border border-primary transition py-2`}>
          {isLoading ? "loading..." : "sign up"}
        </button>
        <p>
          has already account ?{" "}
          <Link
            className="underline hover:text-primary transition"
            href="/login">
            login
          </Link>
        </p>
      </div>
    </form>
  );
}
