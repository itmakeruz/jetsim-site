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
    <div className="flex gap-[20px] justify-center items-center mt-[28px] mb-[50px]">
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
