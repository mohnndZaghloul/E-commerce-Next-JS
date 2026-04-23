import LoginForm from "@/components/registration/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "LOGIN | Next Store",
  description: "log in page for registration",
  keywords: ["login", "sign in", "registration"],
};

export default function LoginPage() {
  return (
    <main className="container w-full max-w-160 h-[calc(100vh-3rem)] flex justify-center items-center">
      <LoginForm />
    </main>
  );
}
