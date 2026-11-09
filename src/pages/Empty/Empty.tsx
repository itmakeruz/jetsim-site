import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Compass, ArrowRight } from "lucide-react";
export default function Empty({ text }: { text: string }) {
  const { t } = useTranslation();
  return (
    <section className="js-empty">
      <Compass size={44} strokeWidth={1} />
      <h2>{text}</h2>
      <Link to="/#tarifs" className="js-btn">
        {t("error.back_to_list")}
        <ArrowRight size={17} />
      </Link>
    </section>
  );
}
