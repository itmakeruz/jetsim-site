import React from "react";

interface UniversalSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: { value: string; label: string }[];
  placeholder?: string;
}

export const UniversalSelect: React.FC<UniversalSelectProps> = ({
  options,
  placeholder = "Выберите...",
  className = "",
  ...props
}) => {
  const baseClasses =
    "bg-[#F8F8F8] rounded-[10px] py-[18px] px-[16px] text-[16px] outline-none cursor-pointer";

  return (
    <select className={`${baseClasses} ${className}`} {...props}>
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
