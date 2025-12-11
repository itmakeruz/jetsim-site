import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams, useNavigate } from "react-router-dom";
import { authAPI } from "@/services/api.service";
import { toast } from "react-toastify";
import { APP_ROUTES } from "@/router/path";
import { useAuthStore } from "@/store/authStore";
import VerificationHeader from "./VerificationHeader";
import OTPInputs from "./OTPInputs";
import ResendCode from "./ResendCode";
import VerificationSubmitButton from "./VerificationSubmitButton";
import { useTariffStore } from "@/store/tariffStore";

const VerificationForm = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setToken, getProfile } = useAuthStore();
  const email = searchParams.get("email") || "";
  const { syncToAPI } = useTariffStore();
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(120);
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
        // If token is returned, save it and get profile
        if (response.data.data?.access_token) {
          setToken(response.data.data.access_token);
          await syncToAPI();
          await getProfile();
        }

        // Navigate to home or profile after successful verification
        navigate(APP_ROUTES.HOME);
      } else {
        // Check if it's an expired OTP error (400)
        if (response.data.statusCode === 400) {
          toast.error(response.data.message || t("verification.code_expired"));
          setHasError(true);
          setOtp(Array(6).fill(""));
          setCanResend(true);
          inputRefs.current[0]?.focus();
        }
        // Check if it's an invalid OTP error (401)
        else if (response.data.statusCode === 401) {
          setHasError(true);
          toast.error(
            response.data.message || t("verification.error_occurred")
          );
        }
      }
    } catch (error: any) {
      // Check if it's an expired OTP error (400)
      if (error.response?.data?.statusCode === 400) {
        toast.error(
          error.response?.data?.message || t("verification.code_expired")
        );
        setHasError(true);
        setOtp(Array(6).fill(""));
        setCanResend(true);
        inputRefs.current[0]?.focus();
      }
      // Check if it's an invalid OTP error (401)
      else if (error.response?.data?.statusCode === 401) {
        setHasError(true);
      }
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

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col lg:gap-[10px] gap-2 lg:mt-[60px] mt-4"
    >
      <VerificationHeader email={email} />

      <OTPInputs
        otp={otp}
        inputRefs={inputRefs}
        hasError={hasError}
        isLoading={isLoading}
        onOtpChange={handleOtpChange}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
      />

      <ResendCode timer={timer} canResend={canResend} onResend={handleResend} />

      <VerificationSubmitButton
        isLoading={isLoading}
        isDisabled={isLoading || otp.join("").length !== 6}
      />
    </form>
  );
};

export default VerificationForm;
