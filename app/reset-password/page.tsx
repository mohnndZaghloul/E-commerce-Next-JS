"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const params = useSearchParams();
  const token = params.get("token");

  if (token?.length! < 24 || token === null) {
    return (
      <div className="h-[calc(100vh-3.5rem)] flex flex-col justify-center items-center text-center">
        <h2>Invalid or Expired Link</h2>
        <p>Please request a new password reset link.</p>
      </div>
    );
  }

  const handleSubmit = async () => {
    setLoading(true);

    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    await fetch("/api/reset-password", {
      method: "POST",
      body: JSON.stringify({
        token,
        newPassword: password,
      }),
    });

    setLoading(false);
    alert("Password updated");
  };

  return (
    <div className="container w-1/2 mt-10">
      <h2>Reset Password</h2>
      <div className="flex gap-2 mt-2">
        <Input
          type="password"
          placeholder="New Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          className="cursor-pointer"
          onClick={handleSubmit}
          disabled={loading}>
          {loading ? "Loading..." : "Update Password"}
        </Button>
      </div>
    </div>
  );
}
