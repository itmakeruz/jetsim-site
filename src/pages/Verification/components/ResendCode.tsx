import { useTranslation } from "react-i18next";

interface ResendCodeProps {
  timer: number;
  canResend: boolean;
  onResend: () => void;
}

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
};

const ResendCode = ({ timer, canResend, onResend }: ResendCodeProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-start gap-1 md:mb-4 mb-2">
      <span className="md:text-[16px] text-[14px] font-medium text-black md:leading-[1.4] leading-none">
        {t("verification.code_not_received")}
      </span>
      <div className="flex items-center gap-1">
        <span className="md:text-[16px] text-[14px] font-medium text-black md:leading-[1.4] leading-none">
          {formatTime(timer)}
        </span>
        <button
          type="button"
          onClick={onResend}
          disabled={!canResend}
          className="md:text-[16px] text-[14px] underline font-medium text-[#112D6C] hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {t("verification.resend")}
        </button>
      </div>
    </div>
  );
};

export default ResendCode;
