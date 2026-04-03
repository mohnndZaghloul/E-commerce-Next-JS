import { Eye, EyeOff } from "lucide-react";
import { useId, useState } from "react";

type FormInput_TP = {
  name: string;
  value?: string;
  minlength?: number;
  maxlength?: number;
  type?: string;
  textarea?: boolean;
};
export default function FormInput({
  name,
  value,
  type,
  minlength,
  maxlength,
  textarea,
}: FormInput_TP) {
  const id = useId();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const eyeIconStyle =
    "cursor-pointer rounded h-full w-12 p-2 transition bg-primary hover:bg-primary/70 text-secondary absolute inset-e-0 top-1/2 -translate-y-1/2";

  return (
    <>
      <label className="capitalize" htmlFor={id}>
        {name}
      </label>
      <div className="relative">
        <input
          className="w-full rounded p-2 outline-1 bg-gray-200"
          id={id}
          name={name}
          defaultValue={value || ""}
          min={minlength}
          max={maxlength}
          type={showPassword ? "text" : type}
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
