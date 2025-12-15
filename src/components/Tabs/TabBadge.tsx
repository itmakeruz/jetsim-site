import React from "react";

interface TabBadgeProps {
  count: number;
  variant?: "primary" | "secondary";
  className?: string;
}

const TabBadge: React.FC<TabBadgeProps> = ({
  count,
  variant = "secondary",
  className = "",
}) => {
  const bgColor = variant === "primary" ? "bg-[#e31d1c]" : "bg-[#212b36]";

  return (
    <span
      className={`rounded-[10px] w-[25px] h-[16px] md:w-[35px] md:h-[22px] ${bgColor} text-white flex items-center justify-center text-[14px] md:text-[15px] font-semibold ${className}`}
    >
      {count}
    </span>
  );
};

export default TabBadge;
