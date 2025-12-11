import React from "react";
import { useTranslation } from "react-i18next";
import { formatNumber } from "@/lib/utils";

interface TotalAmountProps {
  amount: number;
}

const TotalAmount: React.FC<TotalAmountProps> = ({ amount }) => {
  const { t } = useTranslation();

  return (
    <span className="text-[#000000] text-[20px] font-semibold shrink-0">
      {t("profile.payment.overall")} {formatNumber(amount)} ₽
    </span>
  );
};

export default TotalAmount;
