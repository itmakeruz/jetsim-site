import { ASSETS } from "../../assets";
import { useTranslation } from "react-i18next";
import CardItem from "./components/CardItem";
import SocialMediaIcons from "./components/SocialMediaIcons";

interface CardData {
  image: string;
  headingKey: string;
  textKey: string;
  variant: "left" | "right";
  gradientType: "green" | "purple";
  imageFirst?: boolean;
}

const Card = () => {
  const { t } = useTranslation();

  const leftCards: CardData[] = [
    {
      image: ASSETS.card1,
      headingKey: "card.card1-h",
      textKey: "card.card1-t",
      variant: "left",
      gradientType: "green",
      imageFirst: false,
    },
    {
      image: ASSETS.card2,
      headingKey: "card.card2-h",
      textKey: "card.card2-t",
      variant: "left",
      gradientType: "purple",
      imageFirst: true,
    },
    {
      image: ASSETS.card3,
      headingKey: "card.card3-h",
      textKey: "card.card3-t",
      variant: "left",
      gradientType: "green",
      imageFirst: false,
    },
  ];

  const rightCards: CardData[] = [
    {
      image: ASSETS.card4,
      headingKey: "card.card4-h",
      textKey: "card.card4-t",
      variant: "right",
      gradientType: "green",
      imageFirst: false,
    },
    {
      image: ASSETS.card5,
      headingKey: "card.card5-h",
      textKey: "card.card5-t",
      variant: "right",
      gradientType: "purple",
      imageFirst: true,
    },
    {
      image: ASSETS.card6,
      headingKey: "card.card6-h",
      textKey: "card.card6-t",
      variant: "right",
      gradientType: "green",
      imageFirst: false,
    },
  ];

  const headingClasses =
    "text-black text-[36px] lg:text-[36px] md:text-[32px] max-md:text-[28px] max-[475px]:text-2xl leading-[22.42px] lg:leading-[22.42px] md:leading-5 max-md:leading-[18px] max-[475px]:leading-4 font-normal ml-[70px] lg:ml-[70px] md:ml-[50px] max-md:ml-0 max-md:text-center mb-10 lg:mb-10 md:mb-[30px] max-md:mb-5 max-[475px]:mb-[15px]";

  const wrapperClasses =
    "flex justify-between mb-5 lg:mb-5 md:mb-[15px] max-md:mb-[10px] max-[475px]:mb-2 lg:flex-row md:flex-row max-md:flex-col max-md:items-center lg:gap-0 md:gap-[15px] max-md:gap-[10px] max-[475px]:gap-2";

  const logoClasses =
    "w-[200px] lg:w-[200px] md:w-[150px] max-md:w-[120px] max-[475px]:w-[100px] h-auto object-contain max-md:my-5 max-[475px]:my-[15px]";

  const socialSectionClasses =
    "flex flex-col items-center justify-center mt-[50px] lg:mt-[50px] md:mt-10 max-md:mt-[30px] max-[475px]:mt-5";

  const socialTextClasses =
    "text-base lg:text-base md:text-sm max-md:text-[13px] max-[475px]:text-xs leading-6 lg:leading-6 md:leading-5 max-md:leading-[18px] max-[475px]:leading-4";

  return (
    <div className="my-[50px] lg:my-[50px] md:my-5 max-md:my-[15px] max-[475px]:my-[10px] mx-auto max-w-[1600px]">
      <h1 className={headingClasses}>{t("card.heading")}</h1>

      <div className={wrapperClasses}>
        <div>
          {leftCards.map((card, index) => (
            <CardItem
              key={index}
              image={card.image}
              heading={t(card.headingKey)}
              text={t(card.textKey)}
              variant={card.variant}
              gradientType={card.gradientType}
              imageFirst={card.imageFirst}
            />
          ))}
        </div>

        <img className={logoClasses} src={ASSETS.loginlogo} alt="" />

        <div>
          {rightCards.map((card, index) => (
            <CardItem
              key={index}
              image={card.image}
              heading={t(card.headingKey)}
              text={t(card.textKey)}
              variant={card.variant}
              gradientType={card.gradientType}
              imageFirst={card.imageFirst}
            />
          ))}
        </div>
      </div>

      <div className="container">
        <div className={socialSectionClasses}>
          <p className={socialTextClasses}>{t("card.us")}</p>
          <SocialMediaIcons />
        </div>
      </div>
    </div>
  );
};

export default Card;
