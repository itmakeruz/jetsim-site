import React from "react";
import { useTranslation } from "react-i18next";
import { ASSETS } from "@/assets";

interface AvailableCountriesButtonProps {
  onClick: () => void;
  disabled: boolean;
}

const AvailableCountriesButton: React.FC<AvailableCountriesButtonProps> = ({
  onClick,
  disabled,
}) => {
  const { t } = useTranslation();
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="bg-[#1978E51A] w-full rounded-[9px] px-[9px] flex items-center justify-center gap-2 py-[6px] hover:bg-[#1978E52A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed relative"
    >
      <img
        src={ASSETS.availableCountries}
        alt="available countries"
        width="24"
        height="24"
      />
      <span className="text-[#1978E5] text-[20px] font-normal">
        {t("profile.available_countries")}
      </span>
    </button>
  );
};

export default AvailableCountriesButton;
