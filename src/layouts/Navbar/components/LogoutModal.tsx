import { useTranslation } from "react-i18next";
import { X } from "lucide-react";

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const LogoutModal = ({ isOpen, onClose, onConfirm }: LogoutModalProps) => {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex justify-center items-center z-[1000]"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-[12px] p-8 w-[90%] max-w-[400px] shadow-xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={20} />
        </button>

        {/* Modal content */}
        <div className="flex flex-col items-center gap-6 pt-1">
          {/* Icon */}
          <div className="flex items-center justify-center">
            <svg
              width="56"
              height="56"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9M16 17L21 12M21 12L16 7M21 12H9"
                stroke="#E84118"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Title */}
          <h2 className="text-[22px] font-bold text-black text-center">
            {t("modal.logout_title")}
          </h2>

          {/* Message */}
          <p className="text-[15px] text-gray-600 text-center leading-relaxed px-2">
            {t("modal.logout_message")}
          </p>

          {/* Buttons */}
          <div className="flex items-center gap-3 w-full mt-2">
            <button
              onClick={onClose}
              className="flex-1 px-5 py-2.5 rounded-[8px] border border-black text-black text-[15px] font-medium hover:bg-gray-50 transition-colors bg-white"
            >
              {t("modal.logout_cancel")}
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-5 py-2.5 rounded-[8px] bg-[#E84118] text-white text-[15px] font-medium hover:bg-[#d63914] transition-colors"
            >
              {t("modal.logout_confirm")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
