import { useTranslation } from "react-i18next";
export default function LoginTitle() {
  const { t } = useTranslation();
  return (
    <header>
      <span className="js-kicker">{t("jetstream.authLabel")}</span>
      <h1>{t("jetstream.authTitle")}</h1>
    </header>
  );
}
