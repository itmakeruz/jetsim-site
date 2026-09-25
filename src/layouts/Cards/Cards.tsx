import { ASSETS } from "../../assets";
import { useTranslation } from "react-i18next";
import CardItem, { type CardAccent } from "./components/CardItem";
import SocialMediaIcons from "./components/SocialMediaIcons";

interface CardData {
  image: string;
  headingKey: string;
  textKey: string;
  accent: CardAccent;
}

// Акценты чередуются так, чтобы соседние карточки в сетке не совпадали по цвету
const CARDS: CardData[] = [
  { image: ASSETS.card1, headingKey: "card.card1-h", textKey: "card.card1-t", accent: "blue" },
  { image: ASSETS.card2, headingKey: "card.card2-h", textKey: "card.card2-t", accent: "purple" },
  { image: ASSETS.card3, headingKey: "card.card3-h", textKey: "card.card3-t", accent: "green" },
  { image: ASSETS.card4, headingKey: "card.card4-h", textKey: "card.card4-t", accent: "green" },
  { image: ASSETS.card5, headingKey: "card.card5-h", textKey: "card.card5-t", accent: "blue" },
  { image: ASSETS.card6, headingKey: "card.card6-h", textKey: "card.card6-t", accent: "purple" },
];

const Card = () => {
  const { t } = useTranslation();

  return (
    <section className="relative w-full overflow-hidden pt-[70px] md:pt-[110px] pb-[46px] md:pb-[64px] bg-[linear-gradient(180deg,#ffffff_0%,#f3f8ff_28%,#f3f8ff_78%,#ffffff_100%)]">
      {/* Мягкое свечение за сеткой — чисто декоративное */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 h-[420px] w-[820px] rounded-full bg-main-blue/[0.07] blur-3xl"
      />

      <div className="container relative">
        <header className="flex flex-col items-center text-center mb-12 md:mb-16">
          <span className="inline-flex items-center rounded-full border border-main-blue/25 bg-white/70 px-4 py-1.5 text-[12px] md:text-[13px] font-semibold uppercase tracking-[0.14em] text-main-blue">
            {t("card.eyebrow")}
          </span>

          <h2 className="mt-6 max-w-[22ch] text-[32px] md:text-[44px] lg:text-[52px] leading-[1.1] font-semibold tracking-[-0.02em] text-[#0d141c] text-balance">
            {t("card.heading")}
          </h2>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {/* Брендовая плитка — визуальный якорь сетки, занимает два столбца */}
          <article className="sm:col-span-2 relative overflow-hidden rounded-[20px] bg-[linear-gradient(145deg,#16357a_0%,#1e4ca8_55%,#1978e5_100%)] p-7 md:p-9 flex flex-col justify-between min-h-[220px]">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -bottom-20 h-64 w-64 rounded-full bg-white/10 blur-2xl"
            />
            <img
              src={ASSETS.whitelogo}
              alt="JetSim"
              className="relative w-[130px] md:w-[150px] h-auto object-contain"
            />
            <p className="relative mt-8 text-[17px] md:text-[20px] leading-[1.4] font-medium text-white/90 max-w-[34ch] text-balance">
              {t("card.brand-t")}
            </p>
          </article>

          {CARDS.map((card) => (
            <CardItem
              key={card.headingKey}
              image={card.image}
              heading={t(card.headingKey)}
              text={t(card.textKey)}
              accent={card.accent}
            />
          ))}
        </div>

        <div className="mt-12 md:mt-16 pt-8 border-t border-black/10 flex flex-col items-center">
          <p className="text-[15px] md:text-base leading-6 text-[#4f7096]">
            {t("card.us")}
          </p>
          <SocialMediaIcons />
        </div>
      </div>
    </section>
  );
};

export default Card;
