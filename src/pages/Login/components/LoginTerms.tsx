import { Link } from "react-router-dom";
import { APP_ROUTES } from "@/router/path";
import { useTranslation } from "react-i18next";

const LoginTerms = () => {
  const { t } = useTranslation();

  return (
    <p className="js-auth-terms">
      {t("login.terms_text")}{" "}
      <Link
        className="underline font-bold text-[#696B70]"
        to={APP_ROUTES.REFUND_POLICY}
      >
        {t("login.terms_link")}
      </Link>{" "}
      {t("login.and")}{" "}
      <Link
        className="underline font-bold text-[#696B70]"
        to={APP_ROUTES.PRIVACY_POLICY}
      >
        {t("login.privacy_link")}
      </Link>{" "}
      {t("login.privacy_text")}
    </p>
  );
};

export default LoginTerms;
