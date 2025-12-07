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
    <div className="flex gap-2 lg:gap-3 justify-center mb-4">
      {otp.map((digit, index) => (
        <input
          key={index}
          ref={(el) => {
            if (inputRefs.current) {
              inputRefs.current[index] = el;
            }
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => onOtpChange(index, e.target.value)}
          onKeyDown={(e) => onKeyDown(index, e)}
          onPaste={onPaste}
          disabled={isLoading}
          className={`w-[45px] h-[45px] lg:w-[60px] lg:h-[60px] border lg:rounded-[12px] rounded text-center text-[20px] lg:text-[24px] font-bold outline-none disabled:opacity-50 ${
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
