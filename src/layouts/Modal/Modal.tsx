import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import "./Modal.css";
import { ASSETS } from "../../assets";
import { APP_ROUTES } from "../../router/path";
import { ArrowLeftIcon } from "lucide-react";
import OtpInput from "react-otp-input";
import { toast } from "react-toastify";
import api from "../../services/api.service";
import { useAuthStore } from "../../store/authStore";
import { Link } from "react-router-dom";

interface ModalLayoutProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalLayout = ({ isOpen, onClose }: ModalLayoutProps) => {
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(true);
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [error, setError] = useState(false);
  const [timer, setTimer] = useState(60);
  const [attempts, setAttempts] = useState(5);
  const { t } = useTranslation();
  const otpRef = useRef<HTMLDivElement>(null);
  const [otpValue, setOtpValue] = useState("");
  const { setToken, getProfile } = useAuthStore();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const generateOtp = async () => {
    try {
      setLoading(true);
      const response = await api.auth.sendOtp({ email });

      if (response.data.success) {
        toast.success(response.data.message);
        setTimer(60);
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitCode = async () => {
    if (otpValue.length < 6) {
      setError(true);
      return;
    }
    try {
      setOtpLoading(true);
      const response = await api.auth.confirmEmail({
        email,
        confirm_code: otpValue,
      });

      if (response.data.success) {
        setToken(response.data.data.access_token);
        await getProfile();
        handleClose();
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Kod noto'g'ri");
      setAttempts((prev) => Math.max(0, prev - 1));
    } finally {
      setOtpLoading(false);
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await api.auth.sendOtp({ email });

      if (response.data.success) {
        setIsEmailModalOpen(false);
        setIsOtpModalOpen(true);
        setTimer(60);
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  const handleBackClick = () => {
    setIsEmailModalOpen(true);
    setIsOtpModalOpen(false);
  };

  const handleClose = () => {
    setIsEmailModalOpen(false);
    setIsOtpModalOpen(false);
    onClose();
  };

  return (
    <div className={`fixed inset-0 grid place-items-center bg-white`}>
      {isEmailModalOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
          className="bg-white z-[1] p-5 rounded-[8px] max-w-[950px] shadow-md space-y-[20px] xxl:space-y-[40px]"
        >
          <div className="mx-auto w-[250px]">
            <img src={ASSETS.loginlogo} alt="JetSIM Logo" />
          </div>
          <h3 className="text-[40px] font-normal text-black">
            {t("modal.login")}
          </h3>
          <form
            className="flex flex-col gap-[20px]"
            onSubmit={handleEmailSubmit}
          >
            <div className="flex flex-col gap-[10px]">
              <label className="text-[15px] ">{t("modal.label")}</label>
              <input
                className="border border-[#B5B5B5] rounded-[16px] px-[20px] py-[15px] outline-none text-[15px] placeholder:text-[#919EAB]"
                type="email"
                placeholder="example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button
              type="submit"
              disabled={loading || !email}
              className="w-full py-2.5 bg-main-blue hover:bg-[#156ad1] text-white rounded-[16.18px] cursor-pointer border-0 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Loading..." : t("modal.next")}
            </button>
          </form>

          <ul className="flex flex-wrap gap-[50px] text-[15px]">
            <Link className="hover:underline" to={APP_ROUTES.CONFIDENTIAL}>
              {t("modal.nav1")}
            </Link>
            <Link className="hover:underline" to={APP_ROUTES.OFERTA}>
              {t("modal.nav2")}
            </Link>
            <Link className="hover:underline" to={APP_ROUTES.USLOVIYA}>
              {t("modal.nav3")}
            </Link>
            <Link className="hover:underline" to={APP_ROUTES.RULE}>
              {t("modal.nav4")}
            </Link>
          </ul>
        </motion.div>
      )}
      {isOtpModalOpen && (
        <motion.div
          ref={otpRef}
          initial={{ opacity: 0, scale: 0.8, x: 0 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.8, x: -100 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
          className="bg-white z-[1] p-5 rounded-[8px] max-w-[950px] shadow-md space-y-[20px] xxl:space-y-[40px]"
        >
          <div className="mx-auto w-[250px]">
            <img src={ASSETS.loginlogo} alt="JetSIM Logo" />
          </div>
          <div className="text-[40px] font-normal text-black flex items-center gap-[20px]">
            <button
              className="w-[40px] h-[40px] flex items-center justify-center bg-main-blue rounded-[50%]"
              onClick={handleBackClick}
            >
              <ArrowLeftIcon style={{ color: "#FFFFFF" }} />
            </button>
            <h3>Регистрация/Авторизация</h3>
          </div>
          <p className="text-[15px] text-center">Код отправлен на {email}</p>
          <div className="flex flex-col gap-[20px] items-center">
            <div className="flex items-center justify-center">
              <OtpInput
                value={otpValue}
                onChange={(e) => {
                  setOtpValue(e);
                  setError(false);
                }}
                numInputs={6}
                renderSeparator={(index) =>
                  index === 2 ? (
                    <span style={{ margin: "0 8px" }}> - </span>
                  ) : null
                }
                inputStyle={{
                  width: "45px",
                  height: "45px",
                  margin: "0 5px",
                  fontSize: "20px",
                  borderRadius: "8px",
                  color: "#000",
                  border: "1px solid #ccc",
                  outlineColor: "var(--color-main-blue)",
                }}
                renderInput={(props, index) => {
                  const isEmpty = error && !otpValue[index];
                  const borderColor = isEmpty ? "red" : "#ccc";

                  return (
                    <input
                      {...props}
                      style={{
                        width: "45px",
                        height: "45px",
                        margin: "0 5px",
                        fontSize: "20px",
                        borderRadius: "8px",
                        color: "#000",
                        border: `1px solid ${borderColor}`,
                        outlineColor: "var(--color-main-blue)",
                        transition: "border-color 0.3s",
                        textAlign: "center",
                      }}
                    />
                  );
                }}
              />
            </div>
            <button
              type="button"
              onClick={generateOtp}
              className={`text-center text-[14px] disabled:opacity-50 ${
                timer > 0 ? "!cursor-not-allowed" : "cursor-pointer"
              }`}
              disabled={timer > 0}
            >
              {timer > 0
                ? `${t("modal.resend")} (${timer})`
                : t("modal.resend")}
            </button>
            <button
              className="w-full py-2.5 bg-main-blue hover:bg-[#156ad1] text-white rounded-[16.18px] cursor-pointer border-0 transition-colors duration-300"
              type="submit"
              disabled={attempts === 0 || otpLoading}
              onClick={handleSubmitCode}
            >
              {otpLoading ? "Loading..." : t("modal.accept")}
            </button>
          </div>
          {attempts < 5 && (
            <p className="otp-error-text">
              {t("modal.wrong")} {attempts} {t("modal.attempts")}
            </p>
          )}
          {attempts === 0 && (
            <p className="otp-error-text">{t("modal.redo")}</p>
          )}
          <ul className="flex flex-wrap gap-[50px] text-[15px]">
            <a href={APP_ROUTES.CONFIDENTIAL}>{t("modal.nav1")}</a>
            <a href={APP_ROUTES.OFERTA}>{t("modal.nav2")}</a>
            <a href={APP_ROUTES.USLOVIYA}>{t("modal.nav3")}</a>
            <a href={APP_ROUTES.RULE}>{t("modal.nav4")}</a>
          </ul>
        </motion.div>
      )}
      <div
        onClick={handleClose}
        className="bg-[linear-gradient(180deg,_#ffffff_6.01%,_rgba(136,196,255,0.59)_120%)] absolute inset-0 z-[0]"
      ></div>
    </div>
  );
};

export default ModalLayout;
// background: white;
// padding: 20px;
// border-radius: 8px;
// width: 90%;
// max-width: 800px;
// box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
// margin: 10px;
// z-index: 11;
