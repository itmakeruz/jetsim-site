import { useEffect, useRef } from "react";
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

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white rounded-[16px] md:rounded-[20px] p-6 md:p-8 w-full max-w-4xl shadow-xl overflow-hidden"
          >
            {/* Bottom.tsx dagi blok: sarlavha + ro'yxat + telefon/video */}
            <div className="flex flex-col md:flex-row items-center gap-5 md:gap-[50px] text-center md:text-left mb-6 md:mb-8">
              <div className="flex-1">
                {/* eSIM savoli + tugmalar */}
                <h2 className="text-black font-bold text-base md:text-lg leading-snug mb-4 text-center">
                  {t("esim_modal.title")}
                </h2>

                <ul className="flex flex-col py-2 px-[15px] md:py-2.5 md:px-5 lg:py-3 lg:px-[30px] border border-black/30 rounded-[10px] bg-white mx-auto max-w-full md:max-w-[90%]">
                  <li className="relative pl-[15px] md:pl-5 before:content-['•'] before:absolute before:left-0 before:text-black before:text-base md:before:text-xl before:-top-0.5 md:before:-top-[3px]">
                    {t("phone.nav1")}
                    <span className="text-[#1978E5]">{t("phone.nav1-2")}</span>
                    {t("phone.nav1-3")}
                  </li>

                  <li className="relative pl-[15px] md:pl-5 before:content-['•'] before:absolute before:left-0 before:text-black before:text-base md:before:text-xl before:-top-0.5 md:before:-top-[3px]">
                    {t("phone.nav2")}
                  </li>

                  <li className="relative pl-[15px] md:pl-5 before:content-['•'] before:absolute before:left-0 before:text-black before:text-base md:before:text-xl before:-top-0.5 md:before:-top-[3px]">
                    {t("phone.nav3")}
                    <span className="text-[#28AF40]">{t("phone.nav3-2")}</span>
                    {t("phone.nav3-3")}
                  </li>
                </ul>
              </div>

              <div className="flex justify-center px-[20px] py-[10px] items-center overflow-hidden h-[280px] md:h-[350px] rounded-t-[55px] shrink-0 w-[220px] md:w-[280px] relative">
                <img
                  className="w-full h-full object-top object-cover absolute inset-0"
                  src={ASSETS.phone2}
                  alt=""
                />
                <video
                  ref={videoRef}
                  className="w-full h-full rounded-[55px] mix-blend-multiply object-cover object-top"
                  src={ASSETS.phoneVideo}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              <button
                type="button"
                onClick={onClose}
                className="text-black font-medium underline underline-offset-2 hover:opacity-80 transition-opacity"
              >
                {t("esim_modal.no")}
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                className="bg-main-blue hover:bg-main-blue/80 text-white font-bold rounded-[10px] px-8 py-3 transition-colors shadow-sm"
              >
                {t("esim_modal.yes")}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
