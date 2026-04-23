import SignUpForm from "@/components/registration/SignUpForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SIGN UP | Next Store",
  description: "sign up page to registration for new users",
  keywords: ["sign up", "registration"],
};

export default function SignupPage() {
  return (
    <main className="container w-full max-w-160 h-[calc(100vh-3rem)] flex justify-center items-center">
      <SignUpForm />
    </main>
  );
}
