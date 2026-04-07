import { Eye, EyeOff } from "lucide-react";
import { useId, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import ErrorMessage from "./ErrorMessage";

type FormInput_TP = {
  name: string;
  placeholder?: string;
  value?: string;
  minlength?: number;
  maxlength?: number;
  type?: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => void;
  textarea?: boolean;
};
export default function FormInput({
  name,
  placeholder,
  value,
  type,
  error,
  minlength,
  maxlength,
  onChange,
  textarea,
}: FormInput_TP) {
  const id = useId();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const eyeIconStyle =
    "cursor-pointer rounded-lg h-full w-12 p-2 transition bg-primary hover:bg-primary/80 text-muted absolute inset-e-0 top-1/2 -translate-y-1/2";

  return (
    <>
      <div className="flex justify-between items-center">
        <Label className="capitalize text-sm" htmlFor={id}>
          {name}
        </Label>
        <ErrorMessage message={error} />
      </div>
      <div className="relative mt-2">
        <Input
          className="placeholder:capitalize"
          id={id}
          name={name}
          placeholder={placeholder || name}
          defaultValue={value || ""}
          min={minlength}
          max={maxlength}
          type={showPassword ? "text" : type}
          onChange={(e) => onChange(e)}
        />
        {type === "password" ? (
          showPassword ? (
            <EyeOff
              onClick={() => setShowPassword(false)}
              className={eyeIconStyle}
            />
          ) : (
            <Eye
              onClick={() => setShowPassword(true)}
              className={eyeIconStyle}
            />
          )
        ) : null}
      </div>
    </>
  );
}
