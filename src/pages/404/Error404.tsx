import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
export default function Error404() {
  const { t } = useTranslation();
  return (
    <main className="ew-not-found">
      <img
        src="/images/jetstream-coast.webp"
        width="1672"
        height="941"
        alt=""
      />
      <div className="container">
        <span className="ew-eyebrow">JETSIM / 404</span>
        <h1>{t("error.notFound.title")}</h1>
        <p>{t("error.notFound.description")}</p>
        <Link className="js-btn ew-purchase-button" to="/">
          {t("error.notFound.home")}
          <ArrowUpRight size={18} />
        </Link>
      </div>
    </main>
  );
}
