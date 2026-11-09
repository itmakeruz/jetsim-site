import { useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { ArrowRight, RotateCcw, Play } from "lucide-react";
import { useTranslation } from "react-i18next";
import phoneVideo from "@/assets/video.mp4";

export default function Compatibility({
  compact = false,
}: {
  compact?: boolean;
}) {
  const { t } = useTranslation();
  const reduced = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  return (
    <section className={`ew-compat ${compact ? "ew-compat--compact" : ""}`}>
      <div className="ew-compat-copy">
        <span className="ew-eyebrow">{t("jetstream.compatLabel")}</span>
        <h2>{t("jetstream.compatTitle")}</h2>
        <p>{t("jetstream.compatText")}</p>
        <p className="ew-compat-note">{t("jetstream.compatNote")}</p>
        <button
          className="js-btn"
          type="button"
          onClick={() => {
            const video = videoRef.current;
            if (!video) return;
            video.currentTime = 0;
            void video.play().catch(() => {
              /* Native controls remain available if autoplay is blocked. */
            });
          }}
        >
          {started ? <RotateCcw size={16} /> : <Play size={17} />}
          {t(started ? "everywhere.replayDemo" : "everywhere.playDemo")}
          <ArrowRight size={17} />
        </button>
      </div>
      <div className="ew-compat-device">
        <span className="ew-demo-label">{t("everywhere.demonstration")}</span>
        <video
          ref={videoRef}
          className="ew-compat-original-video"
          src={phoneVideo}
          aria-label={t("everywhere.compatVideoLabel")}
          autoPlay={compact && !reduced}
          muted
          loop
          playsInline
          controls
          preload="metadata"
          onPlay={() => setStarted(true)}
        />
      </div>
    </section>
  );
}
