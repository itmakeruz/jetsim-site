import { CategoryButton } from "@/components/Buttons";
import { useTranslation } from "react-i18next";
import { categories } from "@/constants";

interface HomeCategoriesProps {
  activeCategory: string | null;
  setActiveCategory: (category: string | null) => void;
}

function HomeCategories({
  activeCategory,
  setActiveCategory,
}: HomeCategoriesProps) {
  const { t } = useTranslation();

  return (
    <div className="flex md:gap-[20px] gap-[10px] md:justify-center items-center md:mt-[28px] mt-[20px] md:mb-[50px] mb-[30px] overflow-x-auto no-scroll snap-x">
      {categories.map((category) => (
        <CategoryButton
          key={category.id}
          id={category.key}
          name={t(`categories.${category.key}`)}
          active={activeCategory === category.key}
          onClick={(key) => {
            setActiveCategory(key as string);
          }}
        />
      ))}
    </div>
  );
}

export default HomeCategories;
