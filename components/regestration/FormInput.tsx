import { Eye, EyeOff } from "lucide-react";
import { useId, useState } from "react";

type FormInput_TP = {
  name: string;
  placeholder?: string;
  value?: string;
  minlength?: number;
  maxlength?: number;
  type?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => void;
  textarea?: boolean;
};
export default function FormInput({
  name,
  placeholder,
  value,
  type,
  minlength,
  maxlength,
  onChange,
  textarea,
}: FormInput_TP) {
  const id = useId();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const eyeIconStyle =
    "cursor-pointer rounded h-full w-12 p-2 transition bg-primary hover:bg-primary/80 text-secondary absolute inset-e-0 top-1/2 -translate-y-1/2";

  return (
    <>
      <label className="capitalize" htmlFor={id}>
        {name}
      </label>
      <div className="relative">
        <input
          className="w-full rounded p-2 outline-1 bg-gray-200 placeholder:capitalize"
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
