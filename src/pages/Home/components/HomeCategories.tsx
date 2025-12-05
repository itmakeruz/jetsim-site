import { CategoryButton } from "@/components/Buttons";
import { useState } from "react";
const categories = [
  {
    id: 1,
    name: "Популярный",
  },
  {
    id: 2,
    name: "Локальные",
  },
  {
    id: 3,
    name: "Региональные",
  },
  {
    id: 4,
    name: "Глобальные",
  },
];
function HomeCategories() {
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  return (
    <div className="flex gap-[25px] justify-center items-center mt-[28px] mb-[50px]">
      {categories.map((category: any) => (
        <CategoryButton
          key={category.id}
          id={category.id}
          name={category.name}
          active={activeCategory === category.id}
          onClick={(id) => {
            setActiveCategory(activeCategory === id ? null : Number(id));
          }}
        />
      ))}
    </div>
  );
}

export default HomeCategories;
