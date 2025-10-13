import { useTranslation } from "react-i18next";
import "../styles/main.css";
import { APP_ROUTES } from "../router/path";

export default function LinkButton() {
  const { t } = useTranslation();
  return (
    <a className="link-btn" href={APP_ROUTES.HOME}>
      {t("about.buy")}
    </a>
  );
}
