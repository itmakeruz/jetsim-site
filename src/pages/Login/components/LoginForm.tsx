import { apiFailure } from "@/lib/apiFailure";
import { useState, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { useTranslation } from "react-i18next";
import { authAPI } from "@/services/api.service";
import { toast } from "react-toastify";
import { APP_ROUTES } from "@/router/path";
import VerificationSubmitButton from "@/pages/Verification/components/VerificationSubmitButton";

const LoginForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const next = params.get("next");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Email validation
  const isValidEmail = useMemo(
    () => email.trim() !== "" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
    [email],
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidEmail) {
      toast.error(t("everywhere.invalidEmail"));
      return;
    }

    setIsLoading(true);

    try {
      const response = await authAPI.sendOtp({ email });

      if (response.data.success) {
        const query = new URLSearchParams({ email });
        if (next === APP_ROUTES.MYESIM || next === APP_ROUTES.PROFILE)
          query.set("next", next);
        navigate(`${APP_ROUTES.VERIFY}?${query}`);
      } else {
        toast.error(response.data.message || t("everywhere.genericError"));
      }
    } catch (cause: unknown) {
      const error = apiFailure(cause);
      toast.error(
        error.response?.data?.message || t("everywhere.genericError"),
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-7 flex flex-col gap-2.5 lg:mt-9"
    >
      <p className="text-[13px] font-medium leading-[1.45] text-[#4f7096] md:text-[14px]">
        {t("login.description")}
      </p>
      <label htmlFor="login-email" className="js-field-label">
        {t("jetstream.authEmail")}
      </label>
      <input
        id="login-email"
        className="js-input"
        type="email"
        autoComplete="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        disabled={isLoading}
      />
      <VerificationSubmitButton
        isLoading={isLoading}
        isDisabled={isLoading || !isValidEmail}
      />
    </form>
  );
};

export default LoginForm;
