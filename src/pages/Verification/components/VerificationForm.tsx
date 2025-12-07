import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams, useNavigate } from "react-router-dom";
import { authAPI } from "@/services/api.service";
import { toast } from "react-toastify";
import { APP_ROUTES } from "@/router/path";
import { useAuthStore } from "@/store/authStore";

const VerificationForm = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setToken, getProfile } = useAuthStore();
  const email = searchParams.get("email") || "";

  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [hasError, setHasError] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Focus first input on mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  // Redirect if no email
  useEffect(() => {
    if (!email) {
      navigate(APP_ROUTES.LOGIN);
    }
  }, [email, navigate]);

  // Timer countdown
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleOtpChange = (index: number, value: string) => {
    // Only allow numbers
    if (value && !/^\d$/.test(value)) return;

    // Clear error when user starts typing
    if (hasError) {
      setHasError(false);
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
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
      // Focus the last filled input or the last input
      const lastIndex = Math.min(pastedData.length - 1, 5);
      inputRefs.current[lastIndex]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const code = otp.join("");
    if (code.length !== 6) {
      toast.error(t("verification.enter_all_digits"));
      return;
    }

    if (!email) {
      toast.error(t("verification.email_not_found"));
      navigate(APP_ROUTES.LOGIN);
      return;
    }

    setIsLoading(true);
    setHasError(false);

    try {
      const response = await authAPI.confirmEmail({
        email,
        confirm_code: code,
      });

      if (response.data.success) {
        toast.success(
          response.data.message || t("verification.email_verified")
        );

        // If token is returned, save it and get profile
        if (response.data.data?.access_token) {
          setToken(response.data.data.access_token);
          await getProfile();
        }

        // Navigate to home or profile after successful verification
        navigate(APP_ROUTES.HOME);
      } else {
        // Check if it's an invalid OTP error (401)
        if (response.data.statusCode === 401) {
          setHasError(true);
        }
      }
    } catch (error: any) {
      // Check if it's an invalid OTP error (401)
      if (error.response?.data?.statusCode === 401) {
        setHasError(true);
      }
      toast.error(
        error.response?.data?.message || t("verification.error_occurred")
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email || !canResend) return;

    setIsLoading(true);
    try {
      const response = await authAPI.sendOtp({ email });
      if (response.data.success) {
        toast.success(response.data.message || t("verification.code_sent"));
        setTimer(60);
        setCanResend(false);
        setOtp(Array(6).fill(""));
        setHasError(false);
        inputRefs.current[0]?.focus();
      } else {
        toast.error(response.data.message || t("verification.error_occurred"));
      }
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || t("verification.error_occurred")
      );
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col lg:gap-[10px] gap-2 lg:mt-[60px] mt-4"
    >
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

      <div className="flex gap-2 lg:gap-3 justify-center mb-4">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleOtpChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            disabled={isLoading}
            className={`w-[45px] h-[45px] lg:w-[60px] lg:h-[60px] border lg:rounded-[12px] rounded text-center text-[20px] lg:text-[24px] font-bold outline-none disabled:opacity-50 ${
              hasError
                ? "border-red-500 border-2 focus:border-red-500 focus:border-2"
                : "border-[#4F709680] text-[#4F7096] focus:border-[#112D6C] focus:border-2"
            }`}
          />
        ))}
      </div>

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
            onClick={handleResend}
            disabled={!canResend}
            className="text-[16px] underline font-medium text-[#112D6C] hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {t("verification.resend")}
          </button>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading || otp.join("").length !== 6}
        className="bg-[#112D6C] lg:text-base text-[14px] font-medium lg:py-5 py-3 lg:rounded-[16px] rounded-lg text-white lg:mt-[30px] mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? t("verification.loading") : t("verification.continue")}
      </button>
    </form>
  );
};

export default VerificationForm;
