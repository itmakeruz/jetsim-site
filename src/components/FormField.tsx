import React from "react";

interface FormFieldProps {
  label: string;
  children: React.ReactNode;
  className?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  children,
  className = "flex-1 min-w-0 max-w-full",
}) => {
  return (
    <div className={`flex flex-col gap-2 mb-4 ${className}`}>
      <label className="text-[14px] text-[#111111]">{label}</label>
      {children}
    </div>
  );
};
