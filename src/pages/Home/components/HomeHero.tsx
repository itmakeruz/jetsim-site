import { useTranslation } from "react-i18next";

function HomeHero() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center mt-[40px] gap-[32px] mb-[32px]">
      <h1 className="text-center text-[44px] max-w-[930px] leading-[1.3] font-extrabold text-[#393939]">
        {t("sims.title")}
      </h1>
      <div className="flex flex-col items-center">
        <p className="subtitle">{t("sims.subtitle")}</p>
        <p className="subtitle">{t("sims.subtitle2")}</p>
      </div>
    </div>
  );
}

export default HomeHero;
