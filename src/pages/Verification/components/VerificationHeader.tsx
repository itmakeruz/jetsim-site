import { useTranslation } from "react-i18next";

interface VerificationHeaderProps {
  email: string;
}

const VerificationHeader = ({ email }: VerificationHeaderProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-4 mb-8">
      <h2 className="text-[26px] font-bold text-black leading-none">
        {t("verification.title")}
      </h2>
      <div className="flex flex-col gap-1">
        <p className="text-[16px] font-medium text-black leading-[1.4]">
          {t("verification.description1")}{" "}
          <span className="font-bold">{email}</span>
        </p>
        <p className="text-[16px] font-medium text-black leading-[1.4]">
          {t("verification.description2")}
        </p>
      </div>
    </div>
  );
};

export default VerificationHeader;
