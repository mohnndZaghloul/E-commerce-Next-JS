"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import FormInput from "../registration/FormInput";
import { toast } from "sonner";
import { changePassword, getUserAccounts } from "@/actions/customers-actions";

export default function ResetPassword({ id }: { id: string }) {
  const [isEditing, setIsEditing] = useState(false);
  const [hasPassword, setHasPassword] = useState<boolean | null>(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getUserAccounts(id).then(({ hasPassword }) => {
      setHasPassword(hasPassword);
    });
  }, [id]);

  const handleReset = () => {
    setIsEditing(false);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (currentPassword === newPassword) {
      toast.error("New password must be different from current password");
      return;
    }

    setIsLoading(true);

    try {
      const result = await changePassword(
        id,
        newPassword,
        hasPassword ? currentPassword : undefined,
      );

      if (result?.error) {
        toast.error(result.error);
        return;
      }

      toast.success(
        hasPassword
          ? "Password changed successfully"
          : "Password set successfully",
      );

      setHasPassword(true);
      handleReset();
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid =
    newPassword.trim() &&
    confirmPassword.trim() &&
    newPassword === confirmPassword &&
    (hasPassword ? currentPassword.trim() : true);

  return (
    <div>
      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          {hasPassword && (
            <div className="space-y-2">
              <Label htmlFor="current-password" className="text-primary">
                Current Password
              </Label>
              <FormInput
                name="current-password"
                type="password"
                placeholder="Enter current password"
                value={currentPassword}
                minlength={8}
                className="h-10"
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>
          )}

          {!hasPassword && (
            <p className="text-sm text-muted-foreground bg-muted px-3 py-2 rounded-md">
              You signed up with Google. Set a password to also enable email
              login.
            </p>
          )}

          <div className="space-y-2">
            <Label htmlFor="new-password" className="text-primary">
              {hasPassword ? "New Password" : "Set Password"}
            </Label>
            <FormInput
              name="new-password"
              type="password"
              placeholder={
                hasPassword ? "Enter new password" : "Create a password"
              }
              value={newPassword}
              minlength={8}
              className="h-10"
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm-password" className="text-primary">
              Confirm Password
            </Label>
            <FormInput
              name="confirm-password"
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              minlength={8}
              className="h-10"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {confirmPassword && (
              <p
                className={`text-sm ${
                  newPassword === confirmPassword
                    ? "text-primary"
                    : "text-destructive"
                }`}>
                {newPassword === confirmPassword
                  ? "✓ Passwords match"
                  : "✗ Passwords do not match"}
              </p>
            )}
          </div>

          <div className="flex gap-2 pt-2">
            <Button
              size="lg"
              type="submit"
              className="capitalize cursor-pointer px-8"
              disabled={isLoading || !isFormValid}>
              {isLoading
                ? "Saving..."
                : hasPassword
                  ? "Change Password"
                  : "Set Password"}
            </Button>
            <Button
              size="lg"
              type="button"
              variant="ghost"
              className="capitalize cursor-pointer"
              onClick={handleReset}
              disabled={isLoading}>
              Cancel
            </Button>
          </div>
        </form>
      ) : (
        <div className="space-y-2">
          <Label className="text-nowrap text-xl text-primary">Password</Label>
          <Button
            onClick={() => setIsEditing(true)}
            variant="outline"
            className="capitalize cursor-pointer px-8">
            {hasPassword === null
              ? "Loading..."
              : hasPassword
                ? "Change Password"
                : "Set Password"}
          </Button>
        </div>
      )}
    </div>
  );
}
