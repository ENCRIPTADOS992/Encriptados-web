import React from "react";
import { useFormContext, FieldError } from "react-hook-form";
import SimIconSvg from "../svgs/SimIconSvg";

interface RechargeNumberInputProps {
  name: string;
  placeholder?: string;
  inputClassName?: string;
  containerClassName?: string;
  iconClassName?: string;
  iconPosition?: "left" | "right";
}

const RechargeNumberInput: React.FC<RechargeNumberInputProps> = ({
  name,
  placeholder = "Número de SIM",
  inputClassName = "",
  containerClassName = "",
  iconClassName = "",
  iconPosition = "left",
}) => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();

  const error = errors[name] as FieldError | undefined;
  const errorMessage = error?.message?.toString() || "";

  const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value;
    const numericValue = rawValue.replace(/\D/g, "");
    setValue(name, numericValue, { shouldValidate: true });
  };

  return (
    <div className={`mb-6`}>
      <div
        className={`relative flex items-center border ${
          error ? "border-red-500" : "border-black"
        } rounded-full overflow-hidden ${containerClassName}`}
      >
        {iconPosition === "left" && (
          <div
            className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${iconClassName}`}
          >
            <SimIconSvg color="black" height={25} width={25} />
          </div>
        )}

        <input
          type="text"
          placeholder={placeholder}
          {...register(name, { onChange: handleNumberChange })}
          className={`flex-1 p-2 border-none focus:outline-none ${
            iconPosition === "left" ? "pl-12" : "pl-3"
          } ${inputClassName}`}
          aria-invalid={!!errorMessage}
          aria-describedby={errorMessage ? `${name}-error` : undefined}
        />

        {iconPosition === "right" && (
          <div
            className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${iconClassName}`}
          >
            <SimIconSvg color="black" height={25} width={25} />
          </div>
        )}
      </div>

      {errorMessage && (
        <p
          id={`${name}-error`}
          className="text-red-600 text-sm mt-2"
          role="alert"
        >
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default RechargeNumberInput;
