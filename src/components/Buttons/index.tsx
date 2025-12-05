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
      } flex items-center gap-2 border px-[15px] py-[16px] rounded-[41px] text-[18px] transition-colors duration-200`}
    >
      {active && <Check />}
      {name}
    </button>
  );
};
