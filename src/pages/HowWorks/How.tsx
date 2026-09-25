import { useTranslation } from "react-i18next";

const How = () => {
  const { t } = useTranslation();

  const steps = [
    { headingKey: "how.how1-h", textKey: "how.how1-t", badgeKey: "how.how1-s" },
    { headingKey: "how.how2-h", textKey: "how.how2-t", badgeKey: "how.how2-s" },
    { headingKey: "how.how3-h", textKey: "how.how3-t", badgeKey: "how.how3-s" },
  ];

  return (
    <section className="container py-12 md:py-16">
      <h2 className="mx-auto max-w-[26ch] text-center text-[22px] md:text-[34px] lg:text-[38px] leading-[1.15] font-semibold tracking-[-0.01em] text-[#0d141c] text-balance">
        {t("how.title")}
      </h2>

      <ol className="relative mt-10 md:mt-14 grid gap-5 md:gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Линия, связывающая шаги на десктопе */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-[16%] right-[16%] top-[42px] hidden lg:block h-px bg-[linear-gradient(90deg,transparent,rgba(25,120,229,0.35),transparent)]"
        />

        {steps.map((step, index) => (
          <li
            key={step.headingKey}
            className="relative flex h-full flex-col items-center rounded-2xl border border-black/10 bg-white
              px-6 py-8 text-center transition-all duration-300
              hover:-translate-y-1 hover:border-main-blue/35 hover:shadow-[0_14px_34px_-16px_rgba(25,120,229,0.45)]"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-main-blue text-[22px] font-semibold text-white shadow-[0_8px_18px_-8px_rgba(25,120,229,0.8)]">
              {index + 1}
            </span>

            <h3 className="mt-6 text-[19px] md:text-[21px] leading-[1.25] font-semibold text-[#0d141c] text-balance">
              {t(step.headingKey)}
            </h3>

            <p className="mt-3 flex-1 text-[15px] leading-[1.6] text-[#4f7096]">
              {t(step.textKey)}
            </p>

            <span className="mt-5 inline-flex items-center rounded-full bg-main-blue/[0.08] px-4 py-1.5 text-[14px] font-semibold text-main-blue">
              {t(step.badgeKey)}
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
};

export default How;
