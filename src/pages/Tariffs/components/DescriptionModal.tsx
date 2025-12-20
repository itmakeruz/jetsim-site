import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Info } from "lucide-react";

interface DescriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
}

export default function DescriptionModal({
  isOpen,
  onClose,
  title,
  description,
}: DescriptionModalProps) {
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

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white md:rounded-[16px] rounded-[8px] md:p-6 p-4 max-w-2xl w-full mx-4 max-h-[80vh] overflow-hidden flex flex-col shadow-xl"
          >
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#1978E51A] shrink-0">
                <Info className="w-5 h-5 text-[#1978E5]" />
              </div>
              <div className="flex-1">
                <h2 className="text-[#4F7096] text-[24px] font-bold">
                  {title}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors shrink-0"
                aria-label="Close modal"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            {/* Description Content */}
            <div className="flex-1 overflow-y-auto pr-2">
              <div className="bg-[#F5F9FF] md:rounded-[12px] rounded-[8px] md:p-5 p-3">
                <p className="text-[16px] text-[#4F7096] leading-relaxed whitespace-pre-line">
                  {description}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
