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
  const bgColor = variant === "primary" ? "bg-[#285cff]" : "bg-[#212b36]";

  return (
    <span
      className={`rounded-full min-w-5 h-5 px-1.5 ${bgColor} text-white flex items-center justify-center text-[10px] font-semibold ${className}`}
    >
      {count}
    </span>
  );
};

export default TabBadge;
