import { useTranslation } from "react-i18next";
import { Check } from "lucide-react";
import BenefitCard from "../../components/BenefitCard";
import LinkButton from "../../components/LinkButton";

const About = () => {
  const { t } = useTranslation();

  const audience = [
    t("about.nav1"),
    t("about.nav2"),
    t("about.nav3"),
    t("about.nav4"),
  ];

  return (
    <div className="container py-12 md:py-16">
      <header>
        <span className="inline-flex items-center rounded-full border border-main-blue/25 bg-white px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-main-blue">
          {t("about.eyebrow")}
        </span>

        {/* Две колонки: заголовок слева, вводный текст справа — иначе на широком
            экране всё схлопывается в узкий столбик по центру */}
        <div className="mt-7 grid items-start gap-8 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <h1 className="text-[28px] md:text-[40px] lg:text-[46px] leading-[1.12] font-semibold tracking-[-0.02em] text-[#0d141c] text-balance">
            {t("about.title")}
          </h1>

          <p className="text-[16px] md:text-[17px] leading-[1.75] text-[#4f7096] lg:pt-2">
            {t("about.bigtext")}
          </p>
        </div>
      </header>

      <section className="mt-12 md:mt-16">
        <BenefitCard
          benefit1={t("about.benefit1")}
          benefit2={t("about.benefit2")}
          benefit3={t("about.benefit3")}
          benefit4={t("about.benefit4")}
        />
      </section>

      <section className="mt-14 md:mt-20">
        <h2 className="text-[24px] md:text-[32px] leading-[1.2] font-semibold text-[#0d141c]">
          {t("about.for")}
        </h2>

        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {audience.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 rounded-xl bg-[#F4F8FE] px-4 py-3.5"
            >
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-main-blue text-white">
                <Check className="h-3 w-3" strokeWidth={3} />
              </span>
              <span className="text-[15px] leading-[1.5] text-[#0d141c]">
                {item.replace(/;$/, "")}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-14 md:mt-20">
        <BenefitCard
          benefit1={t("about.benefit5")}
          benefit2={t("about.benefit6")}
          benefit3={t("about.benefit7")}
          benefit4={t("about.benefit8")}
        />
      </section>

      {/* .link-btn тянется на всю ширину родителя, поэтому ограничиваем обёртку,
          иначе во flex-контейнере кнопка схлопывается до размера текста */}
      <div className="mx-auto mt-12 w-full max-w-[420px] md:mt-16">
        <LinkButton />
      </div>
    </div>
  );
};

export default About;
