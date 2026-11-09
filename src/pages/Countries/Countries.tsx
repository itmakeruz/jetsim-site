import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { categories } from "@/constants";
import PageIntro from "@/components/jetstream/PageIntro";
import HomeSearch from "@/pages/Home/components/HomeSearch";
import HomeCategories from "@/pages/Home/components/HomeCategories";
import HomeSimCards from "@/pages/Home/components/HomeSimCards";

export default function Countries() {
  const [params, setParams] = useSearchParams();
  const { t } = useTranslation();
  const type = params.get("type");
  const active = categories.some((category) => category.key === type)
    ? type
    : "local";
  return (
    <section className="ew-countries container">
      <PageIntro
        eyebrow={t("countries.eyebrow")}
        title={t("countries.title")}
        description={t("countries.description")}
      />
      <div className="ew-countries-search ew-route">
        <HomeSearch />
        <p className="js-small">{t("jetstream.searchHelp")}</p>
      </div>
      <HomeCategories
        activeCategory={active}
        setActiveCategory={(value) => {
          const next = new URLSearchParams(params);
          if (value) next.set("type", value);
          else next.delete("type");
          setParams(next, { preventScrollReset: true });
        }}
      />
      <HomeSimCards activeCategory={active} />
    </section>
  );
}
