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
    <div className="flex flex-col items-start gap-1 mb-4">
      <span className="text-[16px] font-medium text-black">
        {t("verification.code_not_received")}
      </span>
      <div className="flex items-center gap-1">
        <span className="text-[16px] font-medium text-black">
          {formatTime(timer)}
        </span>
        <button
          type="button"
          onClick={onResend}
          disabled={!canResend}
          className="text-[16px] underline font-medium text-[#112D6C] hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {t("verification.resend")}
        </button>
      </div>
    </div>
  );
};

export default ResendCode;
