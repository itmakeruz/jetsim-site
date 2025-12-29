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
  const [email, setEmail] = useState("");
  const [emailLoading, setEmailLoading] = useState(false);

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValidEmail = useMemo(
    () => email.trim() !== "" && emailRegex.test(email),
    [email]
  );

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidEmail) {
      toast.error("Введите корректный email");
      return;
    }

    setEmailLoading(true);

    try {
      const response = await authAPI.sendOtp({ email });

      if (response.data.success) {
        toast.success("Код подтверждения отправлен на вашу почту");
        onTimerReset();
        onEmailSubmitted(email);
      } else {
        toast.error(response.data.message || "Произошла ошибка");
      }
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Произошла ошибка. Попробуйте еще раз."
      );
    } finally {
      setEmailLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleEmailSubmit}
      className="flex items-center md:flex-row flex-col gap-2"
    >
      <div className="flex flex-col gap-2 relative w-full">
        {/* <label
          className="absolute top-0 left-[16px] bg-white px-1 translate-y-[-50%] text-[12px] font-medium text-[#637381]"
          htmlFor="email-input"
        >
          Email
        </label> */}
        <input
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
        className="bg-[#112D6C] max-md:w-full  disabled:cursor-not-allowed!  disabled:bg-[#919EAB] disabled:opacity-50 h-[54px] px-[64px] rounded-[8px] text-[16px] font-medium text-white transition-colors"
      >
        {emailLoading ? "..." : "Далее"}
      </button>
    </form>
  );
};

export default EmailInputForm;
