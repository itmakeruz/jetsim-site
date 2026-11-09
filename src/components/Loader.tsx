import { useTranslation } from "react-i18next";
export default function Loader({ isFullScreen = false, className = "" }) {
  const { t } = useTranslation();
  return (
    <div
      className={`js-loader ${isFullScreen ? "js-loader--full" : ""} ${className}`}
      role="status"
    >
      <span className="loader" aria-hidden="true" />
      <span className="js-kicker">{t("common.loading")}</span>
    </div>
  );
}
