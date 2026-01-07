import { ArrowRight, Copy, Info } from "lucide-react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

interface DeviceInstructionsProps {
  icon: string;
  link: string;
  showRawLink?: boolean;
}

const DeviceInstructions: React.FC<DeviceInstructionsProps> = ({
  icon,
  link,
  showRawLink = false,
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
    <div className="flex flex-col gap-[10px] w-full md:py-[5px] py-4 pr-4 bg-linear border-b border-[#0000004D] h-full">
      <div className="flex items-center gap-[10px]">
        <img
          className="md:w-[45px] w-[30px] md:h-[45px] h-[30px] shrink-0 object-contain"
          src={icon}
          alt=""
        />
        <div className="flex flex-col gap-[2px] font-medium w-full overflow-hidden">
          {instructions.map((instruction, index) => (
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
          ))}
        </div>
        <button className="self-start text-[#323D4A]" onClick={handleOpenModal}>
          <Info className="w-5 h-5" />
        </button>
      </div>
      {showRawLink ? (
        link ? (
          <button
            className="md:text-[16px] justify-between flex items-center gap-2 text-[14px] px-2 py-[6px] bg-[#112D6C] text-white rounded-md"
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
          className="md:text-[16px] justify-between flex items-center gap-2 text-[14px] px-2 py-[6px] bg-[#112D6C] text-white w-full rounded-md"
          onClick={() => window.open(link, "_blank")}
        >
          {t("profile.device_instructions_connect_button")} <ArrowRight />
        </button>
      )}

      {isModalOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center z-[1000]"
          onClick={handleCloseModal}
        >
          <div
            className="bg-white rounded-[10px] w-[95%] md:w-[90%] lg:w-[80%] max-w-[800px] relative shadow-[0_4px_6px_rgba(0,0,0,0.1)] max-h-[95vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 md:p-8">
              <h2 className="text-xl md:text-2xl font-bold text-center mb-6 text-[#0D141C]">
                {t("profile.device_instructions_modal_title")}
              </h2>

              <div className="w-full mb-6">
                <div className="relative w-full aspect-video bg-black rounded-[8px] overflow-hidden">
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/_zwwHlh65K4?si=PDaXNuyu6NPpPZCK"
                    title="YouTube video player"
                    frameBorder={0}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>

              <button
                onClick={handleCloseModal}
                className="w-full bg-main-blue hover:bg-[#1565c0] text-white py-3 px-6 rounded-[8px] transition-colors duration-200 text-[20px] font-semibold hover:text-white"
              >
                {t("profile.device_instructions_modal_close")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeviceInstructions;
