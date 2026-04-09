import { Eye, EyeOff } from "lucide-react";
import { useId, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import ErrorMessage from "./ErrorMessage";
import { cn } from "@/lib/utils";

type FormInput_TP = {
  name: string;
  placeholder?: string;
  value?: string;
  minlength?: number;
  maxlength?: number;
  type?: string;
  error?: string;
  onChange?: (
    e:
      | React.ChangeEvent<HTMLInputElement, HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement, HTMLTextAreaElement>,
  ) => void;
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
        {!textarea ? (
          <>
            <Input
              className="placeholder:capitalize"
              id={id}
              name={name}
              placeholder={placeholder || name}
              defaultValue={value || ""}
              min={minlength}
              max={maxlength}
              type={showPassword ? "text" : type}
              onChange={onChange ? (e) => onChange(e) : () => {}}
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
          </>
        ) : (
          <textarea
            id={id}
            name={name}
            placeholder={placeholder || name}
            defaultValue={value || ""}
            rows={5}
            onChange={onChange ? (e) => onChange(e) : () => {}}
            className={cn(
              "placeholder:capitalize w-full rounded-md border border-input bg-transparent px-2.5 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
            )}
          />
        )}
      </div>
    </>
  );
}
