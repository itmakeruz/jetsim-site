import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { queryClient } from "./main";

import ru from "./locales/ru/translations.json";
import en from "./locales/en/translations.json";

const savedLang = localStorage.getItem("lang") || "ru";

i18n.use(initReactI18next).init({
  resources: {
    ru: { translation: ru },
    en: { translation: en },
  },
  react: { bindI18nStore: "added" },
  lng: savedLang,
  fallbackLng: "ru",
  interpolation: {
    escapeValue: false,
  },
});

i18n.on("languageChanged", (lng) => {
  localStorage.setItem("lang", lng);
  // Til o'zgarganda barcha querylarni invalidate qilish
  queryClient.invalidateQueries();
});

export default i18n;

// Keep translations live during design work without resetting cart or form state.
if (import.meta.hot) {
  import.meta.hot.accept(
    ["./locales/ru/translations.json", "./locales/en/translations.json"],
    (modules) => {
      modules.forEach((module, index) => {
        if (module?.default)
          i18n.addResourceBundle(
            index === 0 ? "ru" : "en",
            "translation",
            module.default,
            true,
            true,
          );
      });
    },
  );
}
