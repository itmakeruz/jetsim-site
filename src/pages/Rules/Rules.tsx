import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
export default function Rules() {
  const { t } = useTranslation();
  return (
    <section className="container js-page">
      <span className="js-kicker">JETSIM / INFORMATION</span>
      <h1 className="js-page-title">{t("jetstream.documents")}</h1>
      <div className="js-document-list">
        {[
          ["/public-offer", "offer"],
          ["/privacy-policy", "privacy"],
          ["/refund-policy", "refund"],
          ["/how", "installGuide"],
        ].map(([path, key]) => (
          <Link to={path} key={path}>
            {t(`jetstream.${key}`)}
            <ArrowUpRight size={24} />
          </Link>
        ))}
      </div>
    </section>
  );
}
