import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ASSETS } from "@/assets";
import { useTranslation } from "react-i18next";
import { authAPI } from "@/services/api.service";
import { toast } from "react-toastify";
import { APP_ROUTES } from "@/router/path";
import VerificationSubmitButton from "@/pages/Verification/components/VerificationSubmitButton";

const LoginForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValidEmail = useMemo(
    () => email.trim() !== "" && emailRegex.test(email),
    [email]
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidEmail) {
      toast.error("Введите корректный email");
      return;
    }

    setIsLoading(true);

    try {
      const response = await authAPI.sendOtp({ email });

      if (response.data.success) {
        navigate(`${APP_ROUTES.VERIFY}?email=${encodeURIComponent(email)}`);
      } else {
        toast.error(response.data.message || "Произошла ошибка");
      }
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Произошла ошибка. Попробуйте еще раз."
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
      <div className="relative rounded-[12px] border border-[#4F709680] transition-colors focus-within:border-main-blue">
        <img
          src={ASSETS.emailAddress}
          alt=""
          className="lg:w-[26px] lg:h-[26px] w-[20px] h-[20px] absolute top-1/2 lg:left-4 left-2 -translate-y-1/2"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t("login.email_placeholder")}
          className="lg:py-[14px] py-2 lg:pl-[50px] pl-8 pr-4 w-full outline-none text-[#4F7096] lg:text-[16px] text-[14px] font-medium"
          disabled={isLoading}
        />
      </div>
      <label className="mt-2 flex cursor-pointer select-none items-center gap-2 text-[14px] font-medium leading-[1.4] text-[#0d141c]">
        <input
          type="checkbox"
          className="h-4 w-4 shrink-0 cursor-pointer accent-[#1978E5]"
        />
        {t("login.remember")}
      </label>
      <VerificationSubmitButton
        isLoading={isLoading}
        isDisabled={isLoading || !isValidEmail}
      />
    </form>
  );
};

export default LoginForm;
