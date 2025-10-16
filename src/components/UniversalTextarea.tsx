import React from "react";

interface UniversalTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: "default" | "readonly";
}

export const UniversalTextarea: React.FC<UniversalTextareaProps> = ({
  variant = "default",
  className = "",
  ...props
}) => {
  const baseClasses =
    "bg-[#F8F8F8] rounded-[10px] py-[18px] px-[16px] text-[16px] outline-none resize-none min-h-[100px]";
  const readonlyClasses =
    "bg-[#F8F8F8] rounded-[10px] py-[18px] px-[16px] text-[16px] outline-none cursor-not-allowed opacity-70 resize-none min-h-[100px]";

  const textareaClasses =
    variant === "readonly" ? readonlyClasses : baseClasses;

  return <textarea className={`${textareaClasses} ${className}`} {...props} />;
};
