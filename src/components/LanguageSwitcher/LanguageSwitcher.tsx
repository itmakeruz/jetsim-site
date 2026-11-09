import { useTranslation } from "react-i18next";
import PremiumSelect from "@/components/jetstream/PremiumSelect";
export default function LanguageSwitcher() {
  const { i18n, t } = useTranslation();
  return (
    <div className="js-language">
      <PremiumSelect
        compact
        label={t("everywhere.language")}
        value={i18n.language.startsWith("en") ? "en" : "ru"}
        onValueChange={(language) => {
          void i18n.changeLanguage(language);
        }}
        options={[
          {
            value: "ru",
            shortLabel: "RU",
            label: "Русский",
            description: t("everywhere.languageRu"),
            image: "/flags/ru.svg",
          },
          {
            value: "en",
            shortLabel: "EN",
            label: "English",
            description: t("everywhere.languageEn"),
            image: "/flags/gb.svg",
          },
        ]}
      />
    </div>
  );
}
