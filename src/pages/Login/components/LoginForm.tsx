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
      className="flex flex-col lg:gap-[10px] gap-2 lg:mt-[60px] md:mt-4 mt-2"
    >
      <p className="md:text-[14px] text-[12px] font-medium text-black md:leading-[1.4] leading-[1.2]">
        {t("login.description")}
      </p>
      <div className="border border-[#4F709680] lg:rounded-[12px] rounded relative">
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
      <label className="flex items-center gap-[5px] text-[14px] font-bold text-black leading-[1.4] cursor-pointer select-none md:mt-3 mt-1">
        <input type="checkbox" />
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
