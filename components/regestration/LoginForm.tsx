"use client";

import { useState } from "react";
import Link from "next/link";
import { User2Icon } from "lucide-react";
import FormInput from "./FormInput";
import ErrorMessage from "./ErrorMessage";
import { registrationValidation } from "@/lib/validation";
import { signIn } from "@/lib/auth/auth-client";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export default function LoginForm() {
  const router = useRouter();
  const [userState, setUserState] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    other: "",
  });

  const loginHandler = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);
    const result = registrationValidation(userState);
    result.name = "";
    if (Object.values(result).some(Boolean)) {
      setErrors(result);
      setIsLoading(false);
      return;
    }

    await signIn.email(userState, {
      onSuccess: (res) => {
        console.log(res);
        setIsLoading(false);
        router.replace("/dashboard");
      },
      onError: (errors) => {
        console.log(errors.error.message);
        setErrors({ ...result, other: errors?.error?.message! });
        setIsLoading(false);
      },
    });
  };

  return (
    <form onSubmit={loginHandler} className="border p-10 w-full space-y-4">
      <div className="flex justify-between items-center text-xl capitalize border-b-2">
        <User2Icon size={52} /> login
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
        <Button
          type="submit"
          disabled={isLoading}
          className={`cursor-pointer w-full rounded bg-primary text-secondary hover:opacity-80  border border-primary transition py-2`}>
          {isLoading ? "loading..." : "sign up"}
        </Button>
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
