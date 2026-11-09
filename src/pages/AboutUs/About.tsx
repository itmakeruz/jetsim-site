import { useTranslation } from "react-i18next";
import {
  WhyJetSim,
  TravelExperience,
  FinalCall,
} from "@/components/jetstream/Stories";
export default function About() {
  const { t } = useTranslation();
  return (
    <>
      <header className="ew-about-intro">
        <img
          src="/images/jetstream-departure.webp"
          width="1536"
          height="1024"
          alt={t("jetstream.departureAlt")}
        />
        <div className="container">
          <span className="ew-eyebrow">JETSIM / EVERYWHERE IS YOURS</span>
          <h1>{t("everywhere.aboutTitle")}</h1>
          <p>{t("jetstream.aboutText")}</p>
        </div>
      </header>
      <WhyJetSim />
      <TravelExperience />
      <FinalCall />
    </>
  );
}
