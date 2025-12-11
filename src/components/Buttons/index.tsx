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
          ? "bg-black text-white border-transparent"
          : "text-black border-[#1978E580]"
      } flex items-center gap-2 border md:px-[15px] snap-center px-[10px] md:py-[16px] py-[10px] rounded-[41px] md:text-[18px] text-[14px] transition-colors duration-200`}
    >
      {active && (
        <Check className="md:w-[20px] md:h-[20px] w-[16px] h-[16px]" />
      )}
      {name}
    </button>
  );
};
