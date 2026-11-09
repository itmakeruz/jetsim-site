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
      className="js-coverage-button"
    >
      <img src={ASSETS.availableCountries} alt="" width="24" height="24" />
      <span className="">{t("profile.available_countries")}</span>
    </button>
  );
};

export default AvailableCountriesButton;
