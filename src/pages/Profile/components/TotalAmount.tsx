import React from "react";
import { useTranslation } from "react-i18next";

interface TotalAmountProps {
  amount: number;
}

const TotalAmount: React.FC<TotalAmountProps> = ({ amount }) => {
  const { t } = useTranslation();

  return (
    <span className="text-[#4F7096] text-[20px] font-semibold shrink-0">
      {t("profile.payment.overall")} {amount.toLocaleString()} ₽
    </span>
  );
};

export default TotalAmount;
