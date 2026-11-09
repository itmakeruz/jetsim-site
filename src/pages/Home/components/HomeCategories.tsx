import { useTranslation } from "react-i18next";
import { categories } from "@/constants";
export default function HomeCategories({
  activeCategory,
  setActiveCategory,
}: {
  activeCategory: string | null;
  setActiveCategory: (value: string | null) => void;
}) {
  const { t } = useTranslation();
  return (
    <div
      className="js-categories no-scroll"
      role="group"
      aria-label={t("jetstream.catalogueAll")}
    >
      {categories.map((category) => (
        <button
          type="button"
          className="js-category"
          aria-pressed={activeCategory === category.key}
          onClick={() => setActiveCategory(category.key)}
          key={category.key}
        >
          {t(`categories.${category.key}`)}
        </button>
      ))}
    </div>
  );
}
