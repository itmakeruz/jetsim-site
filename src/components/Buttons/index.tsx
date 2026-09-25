import { Check } from "lucide-react";

interface CategoryButtonProps {
  id: number | string;
  name: string;
  active: boolean;
  onClick: (id: number | string) => void;
}

export const CategoryButton = ({
  id,
  name,
  active,
  onClick,
}: CategoryButtonProps) => {
  return (
    <button
      onClick={() => onClick(id)}
      className={`${
        active
          ? "bg-main-blue text-white border-transparent shadow-[0_8px_20px_-8px_rgba(25,120,229,0.65)]"
          : "text-[#0d141c] bg-white/70 border-[#1978E540] hover:border-main-blue hover:bg-white"
      } flex items-center gap-2 border md:px-[18px] snap-center px-[14px] md:py-[13px] py-[9px] rounded-full md:text-[16px] text-[14px] font-medium whitespace-nowrap transition-all duration-200`}
    >
      {active && (
        <Check className="md:w-[20px] md:h-[20px] w-[16px] h-[16px]" />
      )}
      {name}
    </button>
  );
};
