import { useTranslation } from "react-i18next";

function HomeHero() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center mt-[40px] md:gap-[32px] gap-[20px] mb-[32px]">
      <h1 className="text-center md:text-[44px] text-[24px] max-w-[930px] leading-[1.3] font-extrabold text-[#393939]">
        {t("sims.title")}
      </h1>
      <div className="flex flex-col items-center text-center md:text-[16px] text-[14px]">
        <p className="leading-[1.3]">{t("sims.subtitle")}</p>
        <p className="leading-[1.3]">{t("sims.subtitle2")}</p>
      </div>
    </div>
  );
}

export default HomeHero;
