import { useRef } from "react";
import { ArrowDown, ArrowUpRight, ScanLine, MoveUpRight } from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useTranslation } from "react-i18next";
import HomeSearch from "./HomeSearch";

export default function HomeHero() {
  const { t } = useTranslation();
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const photoY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  return (
    <section ref={ref} className="ew-hero">
      <div className="ew-scene" aria-hidden="true">
        <motion.img
          src="/images/everywhere-city.webp"
          srcSet="/images/everywhere-city-mobile.webp 900w, /images/everywhere-city.webp 1672w"
          sizes="100vw"
          width="1672"
          height="941"
          fetchPriority="high"
          alt=""
          style={{ y: reduced ? 0 : photoY }}
          initial={reduced ? false : { scale: 1.08, opacity: 0.3 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.8, ease: [0.2, 0.7, 0.2, 1] }}
        />
        <div className="ew-scene-shade" />
      </div>
      <div className="container ew-hero-content">
        <div className="ew-hero-top">
          <span>
            <i />
            {t("everywhere.heroLabel")}
          </span>
          <span>EVERYWHERE IS YOURS</span>
        </div>
        <div className="ew-message">
          <h1>
            {[1, 2, 3].map((n) => (
              <span
                className={`ew-headline-line ew-headline-line--${n}`}
                key={n}
              >
                <motion.span
                  initial={reduced ? false : { y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 0.9,
                    delay: 0.12 + n * 0.12,
                    ease: [0.2, 0.75, 0.25, 1],
                  }}
                >
                  {t(`everywhere.heroTitle${n}`)}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            {t("everywhere.heroLead")}
          </motion.p>
        </div>
        <div className="ew-scene-caption">
          <span className="ew-scene-cross">+</span>
          <small>{t("everywhere.sceneCaption")}</small>
          <MoveUpRight strokeWidth={1} />
        </div>
        <span className="ew-side-note">{t("everywhere.sideNote")}</span>
        <motion.div
          className="ew-route"
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
        >
          <div className="ew-route-heading">
            <span>
              <ScanLine size={16} />
              {t("everywhere.routeLabel")}
            </span>
            <span>
              {t("everywhere.nextChapter")} <ArrowUpRight size={13} />
            </span>
          </div>
          <HomeSearch />
        </motion.div>
        <div className="ew-hero-bottom">
          <a href="#tarifs">
            <span>{t("everywhere.explore")}</span>
            <ArrowDown size={15} />
          </a>
          <span>{t("everywhere.heroFoot")}</span>
          <span className="ew-hero-index">01 — JETSIM / ESIM</span>
        </div>
      </div>
    </section>
  );
}
