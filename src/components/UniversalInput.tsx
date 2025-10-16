import React from "react";

interface UniversalInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: "default" | "readonly";
}

export const UniversalInput: React.FC<UniversalInputProps> = ({
  variant = "default",
  className = "",
  ...props
}) => {
  const baseClasses =
    "bg-[#F8F8F8] rounded-[10px] py-[18px] px-[16px] text-[16px] outline-none";
  const readonlyClasses =
    "bg-[#F8F8F8] rounded-[10px] py-[18px] px-[16px] text-[16px] outline-none cursor-not-allowed opacity-70";

  const inputClasses = variant === "readonly" ? readonlyClasses : baseClasses;

  return <input className={`${inputClasses} ${className}`} {...props} />;
};
