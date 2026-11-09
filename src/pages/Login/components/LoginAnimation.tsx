import { useTranslation } from "react-i18next";
export default function LoginAnimation() {
  const { t } = useTranslation();
  return (
    <aside className="ew-auth-photo">
      <img
        src="/images/jetstream-departure.webp"
        width="1536"
        height="1024"
        alt={t("jetstream.departureAlt")}
      />
      <div>
        <span className="ew-eyebrow">JETSIM / EVERYWHERE IS YOURS</span>
        <h2>{t("everywhere.authVisualTitle")}</h2>
        <p>{t("everywhere.authVisualText")}</p>
      </div>
    </aside>
  );
}
