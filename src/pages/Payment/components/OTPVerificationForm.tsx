import { useState, useRef, useEffect, useCallback } from "react";
import { authAPI } from "@/services/api.service";
import { toast } from "react-toastify";
import { useAuthStore } from "@/store/authStore";
import { useTariffStore } from "@/store/tariffStore";
import OTPInputs from "../../Verification/components/OTPInputs";
import { Clock } from "lucide-react";

interface OTPVerificationFormProps {
  email: string;
}

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
};

const OTPVerificationForm = ({ email }: OTPVerificationFormProps) => {
  const { setToken, getProfile } = useAuthStore();
  const { syncToAPI } = useTariffStore();

  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [otpLoading, setOtpLoading] = useState(false);
  const [timer, setTimer] = useState(120);
  const [canResend, setCanResend] = useState(false);
  const [hasError, setHasError] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const hasAutoResentRef = useRef(false);

  // Focus first input on mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleOtpSubmit = useCallback(
    async (e?: React.FormEvent) => {
      if (e) {
        e.preventDefault();
      }

      const code = otp.join("");

      if (!email) {
        toast.error("Email not found");
        return;
      }

      setOtpLoading(true);
      setHasError(false);

      try {
        const response = await authAPI.confirmEmail({
          email,
          confirm_code: code,
        });

        if (response.data.success) {
          if (response.data.data?.access_token) {
            setToken(response.data.data.access_token);
            await syncToAPI();
            await getProfile();
          }
          toast.success("Email verified successfully");
        } else {
          if (response.data.statusCode === 400) {
            toast.error(response.data.message || "Code expired");
            setHasError(true);
            setOtp(Array(6).fill(""));
            setCanResend(true);
            inputRefs.current[0]?.focus();
          } else if (response.data.statusCode === 401) {
            setHasError(true);
            toast.error(response.data.message || "Invalid code");
          }
        }
      } catch (error: any) {
        if (error.response?.data?.statusCode === 400) {
          toast.error(error.response?.data?.message || "Code expired");
          setHasError(true);
          setOtp(Array(6).fill(""));
          setCanResend(true);
          inputRefs.current[0]?.focus();
        } else if (error.response?.data?.statusCode === 401) {
          setHasError(true);
          toast.error("Invalid verification code");
        } else {
          toast.error("Xatolik yuz berdi");
        }
      } finally {
        setOtpLoading(false);
      }
    },
    [otp, email, setToken, syncToAPI, getProfile]
  );

  const handleResend = useCallback(async () => {
    if (!email) return;

    setOtpLoading(true);
    try {
      const response = await authAPI.sendOtp({ email });
      if (response.data.success) {
        toast.success("Verification code sent");
        setTimer(120);
        setCanResend(false);
        setOtp(Array(6).fill(""));
        setHasError(false);
        hasAutoResentRef.current = false; // Reset after successful resend
        inputRefs.current[0]?.focus();
      } else {
        toast.error(response.data.message || "Error occurred");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Error occurred");
    } finally {
      setOtpLoading(false);
    }
  }, [email]);

  // Timer countdown and auto-resend
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            hasAutoResentRef.current = false; // Reset when timer reaches 0
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  // Auto-resend when timer reaches 0
  useEffect(() => {
    if (
      timer === 0 &&
      canResend &&
      !otpLoading &&
      email &&
      !hasAutoResentRef.current
    ) {
      hasAutoResentRef.current = true;
      handleResend();
    }
  }, [timer, canResend, otpLoading, email, handleResend]);

  // Auto-submit when OTP is complete (6 digits)
  useEffect(() => {
    const code = otp.join("");
    if (code.length === 6 && !otpLoading && !hasError) {
      handleOtpSubmit();
    }
  }, [otp, otpLoading, hasError, handleOtpSubmit]);

  const handleOtpChange = (index: number, value: string) => {
    if (value && !/^\d$/.test(value)) return;

    if (hasError) {
      setHasError(false);
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    if (/^\d+$/.test(pastedData)) {
      const newOtp = [...otp];
      pastedData.split("").forEach((char, index) => {
        if (index < 6) {
          newOtp[index] = char;
        }
      });
      setOtp(newOtp);
      const lastIndex = Math.min(pastedData.length - 1, 5);
      inputRefs.current[lastIndex]?.focus();
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <p className="text-[14px] font-medium text-[#0D141C]">
          Введите код подтверждения, отправленный на{" "}
          <span className="font-bold">{email}</span>
        </p>
        <form onSubmit={handleOtpSubmit} className="flex flex-col gap-4">
          <OTPInputs
            otp={otp}
            inputRefs={inputRefs}
            hasError={hasError}
            isLoading={otpLoading}
            onOtpChange={handleOtpChange}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
          />

          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#637381]" />
            <span className="text-[14px] font-medium text-[#637381]">
              {formatTime(timer)}
            </span>
            <span className="text-[14px] font-medium text-[#637381]">
              Я не получил код
            </span>
            <button
              type="button"
              onClick={handleResend}
              disabled={!canResend || otpLoading}
              className="text-[14px] underline font-medium text-[#112D6C] hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Повторная отправка ОТР
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OTPVerificationForm;
