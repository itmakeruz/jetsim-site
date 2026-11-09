import { ArrowRight, Copy } from "lucide-react";
import Modal from "@/components/jetstream/Modal";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const VIDEO = {
  android: "https://www.youtube.com/embed/hgpoFufSV9I",
  iphone: "https://www.youtube.com/embed/9WHRRAMmWu8",
} as const;

interface DeviceInstructionsProps {
  icon: string;
  link?: string;
  showRawLink?: boolean;
  deviceType?: "android" | "iphone";
}

const DeviceInstructions: React.FC<DeviceInstructionsProps> = ({
  icon,
  link,
  showRawLink = false,
  deviceType = "android",
}) => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const instructions = [
    t("profile.device_instructions_step1"),
    t("profile.device_instructions_step2"),
    t("profile.device_instructions_step3"),
  ];

  const handleCopyLink = async () => {
    if (link) {
      try {
        await navigator.clipboard.writeText(link);
        // Optional: You can add a toast notification here if needed
      } catch (err) {
        console.error("Failed to copy link:", err);
      }
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col gap-[10px] justify-center w-full md:py-[15px] py-4 pr-4 bg-linear border-b border-[#0000004D] h-full">
      <div className="flex items-start gap-[10px]">
        <img
          className="md:w-[45px] w-[30px] md:h-[45px] h-[30px] shrink-0 object-contain"
          src={icon}
          alt=""
        />
        <div className="flex flex-col gap-[2px] font-medium w-full overflow-hidden">
          {instructions.map((instruction, index) => {
            if (!link && index === 2) {
              return;
            }
            return (
              <h6
                key={index}
                className="flex md:text-[16px] text-[14px] items-center gap-[5px]"
              >
                <svg
                  width="9"
                  height="9"
                  viewBox="0 0 9 9"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    y="4.24264"
                    width="6"
                    height="6"
                    rx="0.781443"
                    transform="rotate(-45 0 4.24264)"
                    fill="black"
                  />
                </svg>
                {instruction}
              </h6>
            );
          })}
        </div>
      </div>

      {showRawLink ? (
        link ? (
          <button
            className="md:text-[16px] justify-between flex items-center gap-2 text-[14px] px-2 py-[6px] bg-[#101722] text-white rounded-md"
            onClick={handleCopyLink}
          >
            <span className="block overflow-hidden whitespace-nowrap">
              {link}
            </span>{" "}
            <Copy className="" size={18} />
          </button>
        ) : null
      ) : (
        <button
          className="md:text-[16px] justify-between flex items-center gap-2 text-[14px] px-2 py-[6px] bg-[#101722] text-white w-full rounded-md"
          disabled={!link}
          onClick={() =>
            link && window.open(link, "_blank", "noopener,noreferrer")
          }
        >
          {t("profile.device_instructions_connect_button")}{" "}
          <ArrowRight className="animate-right" />
        </button>
      )}
      <button
        className="md:text-[16px] justify-between flex items-center gap-4 text-[14px] px-2 py-[6px] bg-[#101722] text-white rounded-md"
        onClick={handleOpenModal}
      >
        {t(`profile.device_instructions_video_button_${deviceType}`)}
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 shrink-0"
        >
          <path
            d="M3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10 15V9L15 12L10 15Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        title={t("profile.device_instructions_modal_title")}
        wide
      >
        <div className="aspect-video overflow-hidden rounded-xl bg-black">
          <iframe
            className="w-full h-full"
            src={VIDEO[deviceType]}
            title={`Installation — ${deviceType}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </Modal>
    </div>
  );
};

export default DeviceInstructions;
