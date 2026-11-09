import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  ArrowRight,
  MapPin,
  ScanLine,
  Signal,
  Check,
  Smartphone,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuthStore } from "@/store/authStore";
import { ASSETS } from "@/assets";
import Reveal from "./Reveal";
import Compatibility from "./Compatibility";
import FAQ from "@/components/Faq";

export function ConnectionStory({
  standalone = false,
}: {
  standalone?: boolean;
}) {
  const { t } = useTranslation();
  const [stage, setStage] = useState(0);
  const reduced = useReducedMotion();
  const icons = [MapPin, ScanLine, Signal];
  const Icon = icons[stage];
  return (
    <section className="ew-story" id="how-it-works">
      <div className="container">
        <Reveal className="ew-story-heading">
          <span className="ew-eyebrow">{t("everywhere.storyEyebrow")}</span>
          {standalone ? (
            <h1>{t("everywhere.storyTitle")}</h1>
          ) : (
            <h2>{t("everywhere.storyTitle")}</h2>
          )}
          <p>{t("jetstream.howLead")}</p>
        </Reveal>
        <div className="ew-story-layout">
          <div className="ew-device-scene">
            <img
              className="ew-device-backdrop"
              src="/images/jetstream-departure.webp"
              alt=""
              width="1536"
              height="1024"
              loading="lazy"
            />
            <span className="ew-demo-label">
              {t("everywhere.demonstration")}
            </span>
            <div
              className="ew-demo-device"
              aria-label={t("everywhere.productDemo")}
            >
              <div className="ew-device-camera" />
              <div className="ew-device-top">
                <img src={ASSETS.logo} alt="JetSim" width="75" />
                <Signal size={13} />
              </div>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={stage}
                  className={`ew-device-content ew-device-content--${stage}`}
                  initial={reduced ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: reduced ? 0 : -10 }}
                  transition={{ duration: 0.22 }}
                >
                  <span className="ew-device-step">0{stage + 1} / 03</span>
                  <h3>{t(`everywhere.demo${stage + 1}Title`)}</h3>
                  {stage === 0 ? (
                    <div className="ew-device-destination">
                      <img
                        src="/images/destination-istanbul.webp"
                        width="1000"
                        height="700"
                        alt=""
                        loading="lazy"
                      />
                      <MapPin size={30} />
                      <span>{t("everywhere.demoExplore")}</span>
                    </div>
                  ) : stage === 1 ? (
                    <div className="ew-demo-qr" aria-hidden="true">
                      {Array.from({ length: 49 }, (_, i) => (
                        <i key={i} />
                      ))}
                    </div>
                  ) : (
                    <div className="ew-device-signal" aria-hidden="true">
                      <Signal strokeWidth={1} />
                      <Check size={24} />
                    </div>
                  )}
                  <p>{t(`everywhere.demo${stage + 1}Text`)}</p>
                  <div className="ew-device-footer">
                    <Icon size={17} />
                    <span>{t("everywhere.demoFooter")}</span>
                    <ArrowUpRight size={15} />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="ew-device-caption">
              <span>JETSIM</span>
              <span>{t("everywhere.digitalCompanion")}</span>
            </div>
          </div>
          <ol className="ew-story-steps">
            {[0, 1, 2].map((index) => (
              <li key={index} className={stage === index ? "is-active" : ""}>
                <button
                  type="button"
                  onClick={() => setStage(index)}
                  aria-expanded={stage === index}
                  aria-controls={`story-step-${index}`}
                >
                  <span className="ew-step-number">0{index + 1}</span>
                  <span>{t(`jetstream.step${index + 1}Title`)}</span>
                  <ArrowUpRight size={22} />
                </button>
                <div id={`story-step-${index}`} className="ew-step-description">
                  <p>{t(`jetstream.step${index + 1}Text`)}</p>
                </div>
              </li>
            ))}
            <li className="ew-story-action">
              <Link to={standalone ? "/#tarifs" : "/how"}>
                {t(
                  standalone ? "jetstream.chooseSim" : "jetstream.installGuide",
                )}
                <ArrowRight size={19} />
              </Link>
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}
export function WhyJetSim() {
  const { t } = useTranslation();
  const authenticated = useAuthStore((state) => state.isAuthenticated);
  return (
    <section className="ew-benefits">
      <div className="container">
        <Reveal className="ew-editorial-heading">
          <span className="ew-eyebrow">{t("jetstream.whyLabel")}</span>
          <h2>{t("everywhere.benefitsTitle")}</h2>
        </Reveal>
        <div className="ew-benefit-mosaic">
          <Reveal className="ew-benefit-feature">
            <img
              src="/images/jetstream-departure.webp"
              srcSet="/images/jetstream-departure-mobile.webp 800w,/images/jetstream-departure.webp 1536w"
              sizes="(max-width:650px) 100vw, 55vw"
              width="1536"
              height="1024"
              alt={t("jetstream.departureAlt")}
              loading="lazy"
            />
            <div>
              <span>01 /</span>
              <h3>{t("jetstream.why1Title")}</h3>
              <p>{t("jetstream.why1Text")}</p>
            </div>
          </Reveal>
          <div className="ew-benefit-side">
            <Reveal className="ew-benefit-number">
              <span>02 /</span>
              <Smartphone strokeWidth={1} />
              <h3>{t("everywhere.keepNumber")}</h3>
              <p>{t("everywhere.keepNumberText")}</p>
            </Reveal>
            <Reveal className="ew-benefit-route">
              <span>03 /</span>
              <h3>{t("jetstream.why2Title")}</h3>
              <p>{t("jetstream.why2Text")}</p>
              <Link to="/#tarifs" aria-label={t("jetstream.chooseSim")}>
                <ArrowUpRight size={32} />
              </Link>
            </Reveal>
          </div>
        </div>
        <Reveal className="ew-benefit-account">
          <span>04 /</span>
          <h3>{t("jetstream.why3Title")}</h3>
          <p>{t("jetstream.why3Text")}</p>
          <Link to={authenticated ? "/myesim" : "/login?next=%2Fmyesim"}>
            {t("jetstream.account")}
            <ArrowUpRight size={18} />
          </Link>
        </Reveal>
        <Compatibility />
      </div>
    </section>
  );
}
export function TravelExperience() {
  const { t } = useTranslation();
  return (
    <section className="ew-travel">
      <div className="ew-travel-photo">
        <img
          src="/images/jetstream-coast.webp"
          srcSet="/images/jetstream-coast-mobile.webp 800w,/images/jetstream-coast.webp 1672w"
          sizes="100vw"
          width="1672"
          height="941"
          alt={t("jetstream.travelImageAlt")}
          loading="lazy"
        />
      </div>
      <div className="container ew-travel-content">
        <Reveal>
          <span className="ew-eyebrow">{t("everywhere.travelEyebrow")}</span>
          <h2>{t("everywhere.travelTitle")}</h2>
        </Reveal>
        <Reveal className="ew-travel-note">
          <span>JETSIM / 02</span>
          <p>{t("jetstream.travelText")}</p>
          <Link to="/#tarifs">
            {t("everywhere.travelAction")}
            <ArrowUpRight size={21} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
export function Questions({ standalone = false }: { standalone?: boolean }) {
  const { t } = useTranslation();
  const items = [1, 2, 3, 4, 5, 6].map((n) => ({
    question: t(`jetstream.faq${n}Q`),
    answer: t(`jetstream.faq${n}A`),
  }));
  return (
    <section className="ew-questions">
      <div className="container ew-questions-layout">
        <Reveal className="ew-question-intro">
          <span className="ew-eyebrow">{t("jetstream.faqLabel")}</span>
          {standalone ? (
            <h1>{t("everywhere.faqTitle")}</h1>
          ) : (
            <h2>{t("everywhere.faqTitle")}</h2>
          )}
          <p>{t("jetstream.faqLead")}</p>
          <a href="https://t.me/Operator1jet" target="_blank" rel="noreferrer">
            {t("jetstream.contactSupport")}
            <ArrowUpRight size={19} />
          </a>
        </Reveal>
        <Reveal>
          <FAQ items={items} />
        </Reveal>
      </div>
    </section>
  );
}
export function FinalCall() {
  const { t } = useTranslation();
  return (
    <section className="ew-final">
      <div className="container">
        <span className="ew-eyebrow">JETSIM — EVERYWHERE IS YOURS</span>
        <div className="ew-final-main">
          <Reveal>
            <h2>{t("everywhere.finalTitle")}</h2>
            <p>{t("everywhere.finalText")}</p>
          </Reveal>
          <Link to="/#tarifs" className="ew-final-cta">
            <span>{t("jetstream.chooseSim")}</span>
            <ArrowUpRight strokeWidth={1} />
          </Link>
        </div>
        <div className="ew-final-bottom">
          <span>{t("everywhere.finalBottom")}</span>
          <span>JETSIM / ESIM</span>
        </div>
      </div>
    </section>
  );
}
