import { CategoryButton } from "@/components/Buttons";
const categories = [
  {
    id: 1,
    name: "Популярный",
    key: "popular",
  },
  {
    id: 2,
    name: "Локальные",
    key: "local",
  },
  {
    id: 3,
    name: "Региональные",
    key: "regional",
  },
  {
    id: 4,
    name: "Глобальные",
    key: "global",
  },
];

interface HomeCategoriesProps {
  activeCategory: number | null;
  setActiveCategory: (category: number | null) => void;
}

function HomeCategories({
  activeCategory,
  setActiveCategory,
}: HomeCategoriesProps) {
  return (
    <div className="flex md:gap-[20px] gap-[10px] md:justify-center items-center md:mt-[28px] mt-[20px] md:mb-[50px] mb-[30px] overflow-x-auto no-scroll snap-x">
      {categories.map((category: any) => (
        <CategoryButton
          key={category.id}
          id={category.id}
          name={category.name}
          active={activeCategory === category.id}
          onClick={(id) => {
            setActiveCategory(Number(id));
          }}
        />
      ))}
    </div>
  );
}

export default HomeCategories;
