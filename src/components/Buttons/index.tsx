interface CategoryButtonProps {
  id: number | string;
  name: string;
  icon: string;
  active: boolean;
  onClick: (id: number | string) => void;
}

export const CategoryButton = ({
  id,
  name,
  icon,
  active,
  onClick,
}: CategoryButtonProps) => {
  return (
    <button
      onClick={() => onClick(id)}
      className={`${
        active ? "bg-main-blue text-white" : "text-black"
      } flex items-center gap-2 border border-main-blue px-[12px] py-[10px] rounded-[12px] text-[18px] transition-colors duration-200`}
    >
      <img className="w-[25px] h-[25px] object-contain" src={icon} alt={name} />
      {name}
    </button>
  );
};
