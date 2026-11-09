import { useTranslation } from "react-i18next";
import { apiFailure } from "@/lib/apiFailure";
import { useState, useMemo } from "react";
import { authAPI } from "@/services/api.service";
import { toast } from "react-toastify";

interface EmailInputFormProps {
  onEmailSubmitted: (email: string) => void;
  onTimerReset: () => void;
}

const EmailInputForm = ({
  onEmailSubmitted,
  onTimerReset,
}: EmailInputFormProps) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [emailLoading, setEmailLoading] = useState(false);

  // Email validation
  const isValidEmail = useMemo(
    () => email.trim() !== "" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
    [email],
  );

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidEmail) {
      toast.error(t("everywhere.invalidEmail"));
      return;
    }

    setEmailLoading(true);

    try {
      const response = await authAPI.sendOtp({ email });

      if (response.data.success) {
        toast.success(t("everywhere.codeSent"));
        onTimerReset();
        onEmailSubmitted(email);
      } else {
        toast.error(response.data.message || t("everywhere.genericError"));
      }
    } catch (cause: unknown) {
      const error = apiFailure(cause);
      toast.error(
        error.response?.data?.message || t("everywhere.genericError"),
      );
    } finally {
      setEmailLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleEmailSubmit}
      className="ew-checkout-email flex flex-col gap-3"
    >
      <div className="flex flex-col gap-2 relative w-full">
        {/* <label
          className="absolute top-0 left-[16px] bg-white px-1 translate-y-[-50%] text-[12px] font-medium text-[#637381]"
          htmlFor="email-input"
        >
          Email
        </label> */}
        <input
          aria-label="Email"
          autoComplete="email"
          id="email-input"
          className="border border-[#919EAB33] px-[14px] py-[18px] text-[14px] rounded-[8px] w-full"
          type="email"
          required
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={emailLoading}
        />
      </div>
      <button
        type="submit"
        disabled={!isValidEmail || emailLoading}
        className="js-btn w-full"
      >
        {emailLoading ? "..." : t("everywhere.next")}
      </button>
    </form>
  );
};

export default EmailInputForm;
