"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User2Icon } from "lucide-react";

import FormInput from "@/components/registration/FormInput";
import ErrorMessage from "@/components/registration/ErrorMessage";
import { Button } from "@/components/ui/button";
import { registrationValidation } from "@/lib/validation";
import { signUp } from "@/lib/auth/auth-client";

type User_TP = {
  name: string;
  email: string;
  password: string | null;
};

export default function CustomerEditForm({ customer }: { customer: User_TP }) {
  const router = useRouter();
  const [userState, setUserState] = useState({ ...customer, password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    other: "",
  });

  //handler function
  const signUpHandler = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    const result = registrationValidation(userState);
    if (Object.values(result).some(Boolean)) {
      setErrors(result);
      setIsLoading(false);
      return;
    }
  };

  return (
    <form
      onSubmit={signUpHandler}
      className="border p-10 space-y-4 shadow-2xl bg-card rounded-xl">
      <div className="flex justify-between items-center text-xl capitalize border-b-2">
        <User2Icon size={52} /> Update
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
          className="cursor-pointer capitalize w-full rounded bg-primary hover:opacity-80 transition py-4">
          {isLoading ? "saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}
