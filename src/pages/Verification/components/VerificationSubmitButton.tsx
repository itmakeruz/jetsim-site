import { useTranslation } from "react-i18next";

interface VerificationSubmitButtonProps {
  isLoading: boolean;
  isDisabled: boolean;
}

const VerificationSubmitButton = ({
  isLoading,
  isDisabled,
}: VerificationSubmitButtonProps) => {
  const { t } = useTranslation();

  return (
    <button
      type="submit"
      disabled={isDisabled}
      className="bg-[#112D6C] lg:text-base text-[14px] font-medium lg:py-5 py-3 lg:rounded-[16px] rounded-lg text-white lg:mt-[30px] mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isLoading ? t("verification.loading") : t("verification.continue")}
    </button>
  );
};

export default VerificationSubmitButton;
