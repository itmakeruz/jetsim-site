import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import "./Modal.css";
import { ASSETS } from "../../assets";
import { APP_ROUTES } from "../../router/path";
import { ArrowLeftIcon } from "lucide-react";
import OtpInput from "react-otp-input";
import { useCustomPost } from "../../hooks/useCustomPost";
import { toast } from "react-toastify";
import endpoints from "../../services/endpoints";
import { setToken } from "../../config/api";

interface ModalLayoutProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalLayout = ({ isOpen, onClose }: ModalLayoutProps) => {
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(true);
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [email, setEmail] = useState("");

  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [timer, setTimer] = useState(0);
  const [attempts, setAttempts] = useState(5);
  const { t } = useTranslation();
  const modalRef = useRef<HTMLDivElement>(null);
  const otpRef = useRef<HTMLDivElement>(null);
  const [otpValue, setOtpValue] = useState("");

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isEmailModalOpen &&
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
      if (
        isOtpModalOpen &&
        otpRef.current &&
        !otpRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, isEmailModalOpen, isOtpModalOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      setIsEmailModalOpen(true);
      setIsOtpModalOpen(false);
      resetModal();
    }
  }, [isOpen]);

  const generateOtp = () => {
    const newOtp = Math.floor(100000 + Math.random() * 900000)
      .toString()
      .slice(0, 6);
    setGeneratedOtp(newOtp);
    setTimer(60);
  };

  const { mutate, isPending } = useCustomPost({
    onSuccess: async (res: any) => {
      toast.success(res?.message);
      setIsEmailModalOpen(false);
      setIsOtpModalOpen(true);
      generateOtp();
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Error");
    },
  });

  const { mutate: sendCode, isPending: sendCodePending } = useCustomPost({
    onSuccess: async (res: any) => {
      toast.success(res?.message);
      setToken(res?.data?.access_token);
      onClose();
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Error");
    },
  });

  const handleSubmit = () => {
    mutate({
      endpoint: endpoints.login,
      body: {
        email,
      },
    });
  };
  const handleSubmitCode = () => {
    sendCode({
      endpoint: endpoints.confirmEmail,
      body: {
        email,
        confirm_code: otpValue,
      },
    });
  };

  const handleEmailSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email.includes("@")) {
      handleSubmit();
    }
  };

  const handleBackClick = () => {
    setIsEmailModalOpen(true);
    setIsOtpModalOpen(false);
  };

  const resetModal = () => {
    setOtp(new Array(6).fill(""));
    setAttempts(5);
    setTimer(0);
    setGeneratedOtp("");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div className="modal-overlay">
          {isEmailModalOpen && (
            <motion.div
              ref={modalRef}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              className="modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-logo">
                <img src={ASSETS.loginlogo} alt="JetSIM Logo" />
              </div>
              <h3 className="modal-heading">{t("modal.login")}</h3>
              <form onSubmit={handleEmailSubmit}>
                <label>{t("modal.label")}</label>
                <input
                  type="email"
                  placeholder="example@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  className="modal-accept"
                  type="submit"
                  disabled={!email.includes("@")}
                >
                  {isPending ? "Loading..." : t("modal.next")}
                </button>
              </form>
              <ul className="modal-list">
                <a href={APP_ROUTES.CONFIDENTIAL}>{t("modal.nav1")}</a>
                <a href={APP_ROUTES.OFERTA}>{t("modal.nav2")}</a>
                <a href={APP_ROUTES.USLOVIYA}>{t("modal.nav3")}</a>
                <a href={APP_ROUTES.RULE}>{t("modal.nav4")}</a>
              </ul>
            </motion.div>
          )}
          {isOtpModalOpen && (
            <motion.div
              ref={otpRef}
              className="modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-logo">
                <img src={ASSETS.loginlogo} alt="JetSIM Logo" />
              </div>
              <div className="otp-header">
                <div className="back-button" onClick={handleBackClick}>
                  <ArrowLeftIcon style={{ color: "#FFFFFF" }} />
                </div>
                <h3 className="modal-heading">Регистрация/Авторизация → OTP</h3>
              </div>
              <p className="otp-sent-text">Код отправлен на {email}</p>
              <div>
                <div className="otp-inputs">
                  <OtpInput
                    value={otpValue}
                    onChange={(e) => setOtpValue(e)}
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
                    }}
                    renderInput={(props) => <input {...props} />}
                  />
                </div>
                <p
                  type="button"
                  onClick={generateOtp}
                  className="resend-button text-center text-[14px]"
                  disabled={timer > 0}
                >
                  {timer > 0
                    ? `${t("modal.resend")} (${timer})`
                    : t("modal.resend")}
                </p>
                <button
                  className="modal-accept"
                  type="submit"
                  disabled={otpValue.length < 6 || attempts === 0}
                  onClick={handleSubmitCode}
                >
                  {sendCodePending ? "Loading..." : t("modal.accept")}
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
              <ul className="modal-list">
                <a href={APP_ROUTES.CONFIDENTIAL}>{t("modal.nav1")}</a>
                <a href={APP_ROUTES.OFERTA}>{t("modal.nav2")}</a>
                <a href={APP_ROUTES.USLOVIYA}>{t("modal.nav3")}</a>
                <a href={APP_ROUTES.RULE}>{t("modal.nav4")}</a>
              </ul>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ModalLayout;
