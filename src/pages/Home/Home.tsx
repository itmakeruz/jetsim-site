import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowUpRight } from "lucide-react";
import { categories } from "@/constants";
import HomeHero from "./components/HomeHero";
import HomeCategories from "./components/HomeCategories";
import HomeSimCards from "./components/HomeSimCards";
import Reveal from "@/components/jetstream/Reveal";
import {
  ConnectionStory,
  WhyJetSim,
  TravelExperience,
  Questions,
  FinalCall,
} from "@/components/jetstream/Stories";

export default function Home() {
  const [params, setParams] = useSearchParams();
  const { t } = useTranslation();
  const type = params.get("type");
  const active = categories.some((category) => category.key === type)
    ? type
    : "popular";
  const setCategory = (value: string | null) => {
    const next = new URLSearchParams(params);
    if (value) next.set("type", value);
    else next.delete("type");
    setParams(next, { preventScrollReset: true });
  };
  return (
    <>
      <HomeHero />
      <section id="tarifs" className="js-section js-destinations">
        <div className="container">
          <Reveal className="js-section-heading">
            <div>
              <span className="js-kicker">{t("jetstream.catalogueLabel")}</span>
              <h2 className="js-section-title">
                {t("jetstream.catalogueTitle")}
              </h2>
            </div>
            <p className="js-copy">{t("jetstream.catalogueLead")}</p>
          </Reveal>
          <HomeCategories
            activeCategory={active}
            setActiveCategory={setCategory}
          />
          <HomeSimCards activeCategory={active} />
          <Reveal className="js-category-guide">
            <div>
              <h3>{t("jetstream.categoryGuideTitle")}</h3>
              <p>{t("jetstream.categoryGuideText")}</p>
            </div>
            <div className="js-category-guide-list">
              {["local", "regional", "global"].map((key, i) => (
                <button
                  type="button"
                  key={key}
                  onClick={() => {
                    setCategory(key);
                    document.getElementById("tarifs")?.scrollIntoView();
                  }}
                >
                  <small>0{i + 1}</small>
                  <strong>{t(`categories.${key}`)}</strong>
                  <span>
                    {t(`jetstream.guide${key[0].toUpperCase()}${key.slice(1)}`)}
                  </span>
                  <ArrowUpRight />
                </button>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
      <ConnectionStory />
      <WhyJetSim />
      <TravelExperience />
      <Questions />
      <FinalCall />
    </>
  );
}
