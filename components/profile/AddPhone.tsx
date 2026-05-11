"use client";

import { useState } from "react";
import FormInput from "../registration/FormInput";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { updatePhoneNumber } from "@/actions/customers-actions";
import { toast } from "sonner";

export default function AddPhone({
  id,
  phone,
}: {
  id: string;
  phone?: string;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const isValidPhone = (value: string) => {
    const phoneRegex = /^[0-9]{10,15}$/;
    return phoneRegex.test(value.replace(/\D/g, ""));
  };

  const handlePhoneNumber = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!phoneNumber.trim()) {
      toast.error("Phone number is required");
      setError("Phone number is required");
      return;
    }
    if (!isValidPhone(phoneNumber)) {
      toast.error("Please enter a valid phone number (10-15 digits)");
      setError("Please enter a valid phone number (10-15 digits)");
      return;
    }

    setIsLoading(true);
    try {
      const result = await updatePhoneNumber(id, phoneNumber);

      if (result) {
        toast.error(result);
      } else {
        toast.success("Phone number updated successfully");
        setPhoneNumber("");
        setIsEditing(false);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {isEditing ? (
        <form
          onSubmit={handlePhoneNumber}
          className="flex justify-center items-end gap-2">
          <FormInput
            name="phone"
            type="tel"
            placeholder="Enter phone number"
            value={phoneNumber}
            error={error}
            className="h-10"
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <Button
            size="lg"
            type="submit"
            className="capitalize cursor-pointer px-8"
            disabled={isLoading || !phoneNumber.trim()}>
            {isLoading ? "Updating..." : "Update"}
          </Button>
          <Button
            size="lg"
            variant="ghost"
            className="cursor-pointer"
            onClick={() => {
              setIsEditing(false);
              setPhoneNumber("");
            }}
            disabled={isLoading}>
            Cancel
          </Button>
        </form>
      ) : (
        <div className="space-y-2">
          <Label className="text-nowrap text-xl text-primary">Phone</Label>
          {phone && <p className="text-sm">{phone}</p>}
          <Button
            onClick={() => setIsEditing(true)}
            variant="outline"
            className="capitalize cursor-pointer px-8">
            {phone ? "Change Phone Number" : "Add Phone Number"}
          </Button>
        </div>
      )}
    </div>
  );
}
