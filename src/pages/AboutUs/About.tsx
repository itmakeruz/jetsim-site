import "./About.css";
import { useTranslation } from "react-i18next";
import BenefitCard from "../../components/BenefitCard";
import LinkButton from "../../components/LinkButton";

const About = () => {
  const { t } = useTranslation();
  return (
    <div className="container">
      <h1 className="about-heading">{t("about.title")}</h1>
      <br />
      <p className="about-text">{t("about.bigtext")}</p>

      <BenefitCard
        benefit1={t("about.benefit1")}
        benefit2={t("about.benefit2")}
        benefit3={t("about.benefit3")}
        benefit4={t("about.benefit4")}
      />

      <h2 className="about-who">{t("about.for")}</h2>

      <ul className="about-list">
        <li className="about-item">{t("about.nav1")}</li>

        <li className="about-item">{t("about.nav2")}</li>

        <li className="about-item">{t("about.nav3")}</li>

        <li className="about-item">{t("about.nav4")}</li>
      </ul>

      <BenefitCard
        benefit1={t("about.benefit5")}
        benefit2={t("about.benefit6")}
        benefit3={t("about.benefit7")}
        benefit4={t("about.benefit8")}
      />
      <LinkButton />
    </div>
  );
};

export default About;
