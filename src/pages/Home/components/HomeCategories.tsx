import { CategoryButton } from "@/components/Buttons";
import { useTranslation } from "react-i18next";

const categories = [
  {
    id: 1,
    key: "popular",
  },
  {
    id: 2,
    key: "local",
  },
  {
    id: 3,
    key: "regional",
  },
  {
    id: 4,
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
  const { t } = useTranslation();

  return (
    <div className="flex md:gap-[20px] gap-[10px] md:justify-center items-center md:mt-[28px] mt-[20px] md:mb-[50px] mb-[30px] overflow-x-auto no-scroll snap-x">
      {categories.map((category: any) => (
        <CategoryButton
          key={category.id}
          id={category.id}
          name={t(`categories.${category.key}`)}
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
