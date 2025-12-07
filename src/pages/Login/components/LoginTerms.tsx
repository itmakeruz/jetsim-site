import { Link } from "react-router-dom";
import { APP_ROUTES } from "@/router/path";
import { useTranslation } from "react-i18next";

const LoginTerms = () => {
  const { t } = useTranslation();

  return (
    <p className="lg:text-[14px] text-[12px] max-lg:justify-center font-medium text-[#8A9099] leading-[1.4] mt-auto flex flex-wrap gap-1">
      {t("login.terms_text")}{" "}
      <Link
        className="underline font-bold text-[#696B70]"
        to={APP_ROUTES.USLOVIYA}
      >
        {t("login.terms_link")}
      </Link>{" "}
      {t("login.and")}{" "}
      <Link
        className="underline font-bold text-[#696B70]"
        to={APP_ROUTES.CONFIDENTIAL}
      >
        {t("login.privacy_link")}
      </Link>{" "}
      {t("login.privacy_text")}
    </p>
  );
};

export default LoginTerms;
