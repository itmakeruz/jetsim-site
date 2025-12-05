"use client";

import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslation } from "react-i18next";
import { ASSETS } from "@/assets";
const languages = [
  { code: "ru", image: ASSETS.ru, label: "Русский" },
  { code: "en", image: ASSETS.en, label: "English" },
];

function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);

  useEffect(() => {
    setLanguage(i18n.language);
  }, [i18n.language]);

  const handleChange = (value: string) => {
    setLanguage(value);
    i18n.changeLanguage(value);
  };

  return (
    <Select value={language} onValueChange={handleChange}>
      <SelectTrigger className="w-[120px] border-none shadow-none! focus:ring-0! focus:ring-offset-0! focus:shadow-none! focus:outline-none! text-[16px] font-semibold [&_svg]:hidden">
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent className="border-none shadow w-max">
        {languages.map((lang) => (
          <SelectItem
            key={lang.code}
            value={lang.code}
            className="text-[14px] font-semibold cursor-pointer hover:bg-gray-100"
          >
            <img
              className="w-[22px] h-[22px] object-contain"
              src={lang.image}
              alt={lang.code}
            />
            <span>{lang.label}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default LanguageSwitcher;
