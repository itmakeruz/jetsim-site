import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";
import { ASSETS } from "@/assets";
import LanguageSwitcher from "@/components/LanguageSwitcher/LanguageSwitcher";
export default function LoginHeader() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <header className="js-auth-header">
      <button
        className="js-icon-btn"
        aria-label={t("jetstream.back")}
        onClick={() =>
          window.history.state?.idx > 0 ? navigate(-1) : navigate("/")
        }
      >
        <ArrowLeft size={20} />
      </button>
      <Link to="/" aria-label="JetSim">
        <img src={ASSETS.logo} width="118" alt="JetSim" />
      </Link>
      <LanguageSwitcher />
    </header>
  );
}
