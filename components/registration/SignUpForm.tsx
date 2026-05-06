"use client";

import { useState } from "react";
import Link from "next/link";
import { User2Icon } from "lucide-react";
import FormInput from "./FormInput";
import ErrorMessage from "./ErrorMessage";
import { registrationValidation } from "@/lib/validation";
import { signIn, signUp } from "@/lib/auth/auth-client";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import GoogleIcon from "./GoogleIcon";

export default function SignUpForm() {
  const router = useRouter();
  const [userState, setUserState] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    other: "",
  });

  const signUpHandler = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);
    const result = registrationValidation(userState);
    if (Object.values(result).some(Boolean)) {
      setErrors(result);
      setIsLoading(false);
      return;
    }

    await signUp.email(userState, {
      onSuccess: (res) => {
        setIsLoading(false);
        router.replace("/dashboard");
      },
      onError: (errors) => {
        setErrors({ ...result, other: errors?.error?.message! });
        setIsLoading(false);
      },
    });
  };

  const signInWithGoogle = async () => {
    await signIn.social({
      provider: "google",
      callbackURL: "/dashboard",
    });
  };

  return (
    <form
      onSubmit={signUpHandler}
      className="border p-5 md:p-10 w-full space-y-4 shadow-2xl shadow-card-shadow bg-card rounded-xl">
      <div className="flex justify-between items-center text-xl capitalize border-b-2">
        <User2Icon size={52} /> sign up
      </div>
      <div>
        <FormInput
          name="name"
          placeholder="enter name"
          type="text"
          error={errors?.name}
          value={userState?.name}
          onChange={(e) => setUserState({ ...userState, name: e.target.value })}
        />
      </div>
      <div>
        <FormInput
          name="email"
          placeholder="enter email"
          type="email"
          error={errors?.email}
          value={userState?.email}
          onChange={(e) =>
            setUserState({ ...userState, email: e.target.value })
          }
        />
      </div>
      <div>
        <FormInput
          name="phone"
          placeholder="enter phone"
          type="text"
          error={errors?.phone}
          value={userState?.phone}
          onChange={(e) =>
            setUserState({ ...userState, phone: e.target.value })
          }
        />
      </div>
      <div>
        <FormInput
          name="password"
          placeholder="enter password"
          type="password"
          error={errors?.password}
          minlength={8}
          value={userState?.password}
          onChange={(e) =>
            setUserState({ ...userState, password: e.target.value })
          }
        />
      </div>
      <div className="mt-8 text-center space-y-4">
        <ErrorMessage message={errors?.other} />
        <Button
          type="submit"
          disabled={isLoading}
          className="cursor-pointer capitalize w-full rounded-xl shadow-2xl shadow-card-shadow py-4">
          {isLoading ? "loading..." : "sign up"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={signInWithGoogle}
          disabled={isLoading}
          className="cursor-pointer capitalize w-full rounded-xl shadow-2xl shadow-card-shadow py-4">
          <GoogleIcon />
          {isLoading ? "loading..." : "sign up with Google"}
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
