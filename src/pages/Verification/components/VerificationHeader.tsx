import { useTranslation } from "react-i18next";

interface VerificationHeaderProps {
  email: string;
}

const VerificationHeader = ({ email }: VerificationHeaderProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-4 md:mb-8 mb-2">
      <h2 className="lg:text-[26px] md:text-[20px] text-[18px] font-bold text-black leading-none">
        {t("verification.title")}
      </h2>
      <div className="flex flex-col gap-1 md:text-[16px] text-[14px] font-medium text-black md:leading-[1.4] leading-[1.2]">
        <p>
          {t("verification.description1")}{" "}
          <span className="font-bold">{email}</span>
        </p>
        <p>{t("verification.description2")}</p>
      </div>
    </div>
  );
};

export default VerificationHeader;
