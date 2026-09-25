import { useTranslation } from "react-i18next";

function HomeHero() {
  const { t } = useTranslation();

  return (
    <div className="container flex flex-col items-center pt-10 md:pt-14">
      <h1 className="max-w-[24ch] text-center text-[30px] md:text-[48px] lg:text-[56px] leading-[1.1] font-extrabold tracking-[-0.02em] text-[#0d141c] text-balance">
        {t("sims.title")}
      </h1>

      <p className="mt-5 md:mt-6 max-w-[54ch] text-center text-[15px] md:text-[18px] leading-[1.55] text-[#4f7096]">
        {/* Это две отдельные фразы в переводах — разделяем точкой, иначе сливаются в одну */}
        {t("sims.subtitle")}. {t("sims.subtitle2")}
      </p>
    </div>
  );
}

export default HomeHero;
