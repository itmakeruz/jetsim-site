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
      className={`w-[35px] md:w-[35px] sm:w-[25px] h-[22px] md:h-[22px] sm:h-[20px] rounded-[10px] ${bgColor} text-white flex items-center justify-center text-[15px] md:text-[15px] sm:text-[13px] font-semibold ${className}`}
    >
      {count}
    </span>
  );
};

export default TabBadge;
