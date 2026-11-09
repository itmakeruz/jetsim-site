import type { RefObject } from "react";

interface OTPInputsProps {
  otp: string[];
  inputRefs: RefObject<(HTMLInputElement | null)[]>;
  hasError: boolean;
  isLoading: boolean;
  onOtpChange: (index: number, value: string) => void;
  onKeyDown: (index: number, e: React.KeyboardEvent<HTMLInputElement>) => void;
  onPaste: (e: React.ClipboardEvent) => void;
}

const OTPInputs = ({
  otp,
  inputRefs,
  hasError,
  isLoading,
  onOtpChange,
  onKeyDown,
  onPaste,
}: OTPInputsProps) => {
  return (
    <div className="js-otp-group">
      {otp.map((digit, index) => (
        <input
          key={index}
          ref={(el) => {
            if (inputRefs.current) {
              inputRefs.current[index] = el;
            }
          }}
          aria-label={`OTP ${index + 1}`}
          autoComplete={index === 0 ? "one-time-code" : "off"}
          aria-invalid={hasError}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => onOtpChange(index, e.target.value)}
          onKeyDown={(e) => onKeyDown(index, e)}
          onPaste={onPaste}
          disabled={isLoading}
          className={`min-w-0 w-full h-[54px] border lg:rounded-[12px] rounded text-center text-[20px] lg:text-[24px] font-bold outline-none disabled:opacity-50 ${
            hasError
              ? "border-red-500 border-2 focus:border-red-500 focus:border-2"
              : "border-[#4F709680] text-[#4F7096] focus:border-[#112D6C] focus:border-2"
          }`}
        />
      ))}
    </div>
  );
};

export default OTPInputs;
