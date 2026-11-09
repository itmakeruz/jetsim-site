import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import PageIntro from "@/components/jetstream/PageIntro";
export default function ProfileHeader() {
  const { t } = useTranslation();
  const path = useLocation().pathname;
  if (path === "/cart")
    return (
      <PageIntro
        eyebrow={t("everywhere.cartEyebrow")}
        title={t("everywhere.cartTitle")}
        description={t("everywhere.cartLead")}
      />
    );
  return (
    <header className="ew-account-heading">
      <span className="ew-eyebrow">{t("everywhere.yourAccount")}</span>
      <h1>
        {t(path === "/myesim" ? "profile.tabs.myesim" : "profile.tabs.profile")}
      </h1>
      <p>
        {t(
          path === "/myesim"
            ? "everywhere.simsLead"
            : "everywhere.profileHeadingLead",
        )}
      </p>
    </header>
  );
}
