import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ASSETS } from "@/assets";

interface ESIMSupportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ESIMSupportModal({
  isOpen,
  onClose,
  onConfirm,
}: ESIMSupportModalProps) {
  const { t } = useTranslation();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [confirmDelay, setConfirmDelay] = useState(10);

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
    if (!isOpen) return;
    const video = videoRef.current;
    if (!video) return;

    video.setAttribute("playsinline", "true");
    video.setAttribute("webkit-playsinline", "true");
    video.muted = true;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {});
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setConfirmDelay(10);
      return;
    }

    setConfirmDelay(10);
    const intervalId = window.setInterval(() => {
      setConfirmDelay((currentDelay) => {
        if (currentDelay <= 1) {
          window.clearInterval(intervalId);
          return 0;
        }

        return currentDelay - 1;
      });
    }, 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [isOpen]);

  const handleConfirm = () => {
    if (confirmDelay > 0) return;
    onConfirm();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-3 sm:p-4 min-h-screen overflow-y-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white rounded-[12px] sm:rounded-[16px] md:rounded-[20px] p-4 sm:p-6 md:p-8 w-full max-w-[calc(100vw-1.5rem)] sm:max-w-2xl md:max-w-4xl max-h-[90vh] overflow-y-auto shadow-xl my-auto"
          >
            {/* Sarlavha + ro'yxat + telefon/video — mobil: ustun, md+: qator */}
            <div className="flex flex-col md:flex-row items-center gap-4 sm:gap-5 md:gap-[50px] text-center md:text-left mb-4 sm:mb-6 md:mb-8">
              <div className="flex-1 w-full min-w-0">
                <h2 className="text-black font-bold text-sm sm:text-base md:text-lg leading-snug mb-3 sm:mb-4 text-center md:text-left">
                  {t("esim_modal.title")}
                </h2>

                <ul className="flex flex-col py-1.5 px-3 sm:py-2 sm:px-4 md:py-2.5 md:px-5 lg:py-3 lg:px-[30px] border border-black/30 rounded-[8px] sm:rounded-[10px] bg-white mx-auto max-w-full md:max-w-[90%] text-left">
                  <li className="relative pl-3 sm:pl-4 md:pl-5 text-sm sm:text-base before:content-['•'] before:absolute before:left-0 before:text-black before:text-sm md:before:text-xl before:-top-0.5 md:before:-top-[3px]">
                    {t("phone.nav1")}
                    <span className="text-[#1978E5]">{t("phone.nav1-2")}</span>
                    {t("phone.nav1-3")}
                  </li>

                  <li className="relative pl-3 sm:pl-4 md:pl-5 text-sm sm:text-base before:content-['•'] before:absolute before:left-0 before:text-black before:text-sm md:before:text-xl before:-top-0.5 md:before:-top-[3px]">
                    {t("phone.nav2")}
                  </li>

                  <li className="relative pl-3 sm:pl-4 md:pl-5 text-sm sm:text-base before:content-['•'] before:absolute before:left-0 before:text-black before:text-sm md:before:text-xl before:-top-0.5 md:before:-top-[3px]">
                    {t("phone.nav3")}
                    <span className="text-[#28AF40]">{t("phone.nav3-2")}</span>
                    {t("phone.nav3-3")}
                  </li>

                  <li className="relative pl-3 text-red-500 sm:pl-4 md:pl-5 text-sm sm:text-base before:content-['•'] before:absolute before:left-0 before:text-black before:text-sm md:before:text-xl before:-top-0.5 md:before:-top-[3px]">
                    {t("phone.nav4")}
                  </li>
                </ul>
              </div>

              <div className="flex justify-center px-2 py-1 sm:px-4 sm:py-2 md:px-5 md:py-[10px] items-center overflow-hidden h-[180px] w-[140px] min-[400px]:h-[200px] min-[400px]:w-[160px] sm:h-[240px] sm:w-[200px] md:h-[280px] md:w-[220px] lg:h-[350px] lg:w-[280px] rounded-t-[32px] sm:rounded-t-[45px] md:rounded-t-[55px] shrink-0 relative">
                <img
                  className="w-full h-full object-top object-cover absolute inset-0 rounded-t-[inherit]"
                  src={ASSETS.phone2}
                  alt=""
                />
                <video
                  ref={videoRef}
                  className="w-full h-full rounded-t-[inherit] mix-blend-multiply object-cover object-top"
                  src={ASSETS.phoneVideo}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                />
              </div>
            </div>

            <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 md:gap-6">
              <button
                type="button"
                onClick={onClose}
                className="text-black font-medium text-sm sm:text-base underline underline-offset-2 hover:opacity-80 transition-opacity py-2 sm:py-0"
              >
                {t("esim_modal.no")}
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                disabled={confirmDelay > 0}
                className="bg-main-blue hover:bg-main-blue/80 text-white font-bold text-sm sm:text-base rounded-[8px] sm:rounded-[10px] px-6 py-2.5 sm:px-8 sm:py-3 transition-colors shadow-sm w-full sm:w-auto disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-main-blue"
              >
                {confirmDelay > 0
                  ? `${t("esim_modal.yes")} (${confirmDelay})`
                  : t("esim_modal.yes")}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
