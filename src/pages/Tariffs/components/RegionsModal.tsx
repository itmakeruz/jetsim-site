import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { getImageUrl } from "@/config/imageUtils";
import type { Region } from "@/types/api";

interface RegionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  regions: Region[];
  title: string;
}

export default function RegionsModal({
  isOpen,
  onClose,
  regions,
  title,
}: RegionsModalProps) {
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
            className="relative bg-white md:rounded-[16px] rounded-[8px] md:p-6 p-4 max-w-3xl w-full mx-4 max-h-[80vh] overflow-hidden flex flex-col shadow-xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[#4F7096] md:text-[28px] text-[20px] font-bold">
                {title}
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close modal"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            {/* Regions List */}
            <div className="flex-1 overflow-y-auto pr-2">
              {regions && regions.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-3 gap-2">
                  {regions.map((region) => (
                    <div
                      key={region.id}
                      className="flex items-center gap-2 p-3 bg-[#EFF6FF] rounded-[12px] hover:bg-[#1978E51A] transition-colors"
                    >
                      <img
                        className="h-8 w-8 object-cover rounded-sm shrink-0"
                        src={getImageUrl(region.image)}
                        alt={region.name}
                      />
                      <span className="text-sm text-[#4F7096] font-medium truncate">
                        {region.name}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  Mavjud mamlakatlar yo'q
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
