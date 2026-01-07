import { ArrowRight, Copy } from "lucide-react";
import React from "react";

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
  const instructions = [
    "Настройки → Сотовая связь → Добавить тариф",
    "Отсканируйте QR-код выше",
    "Или используйте ссылку ниже",
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

  return (
    <div className="flex items-center gap-[10px] md:py-[25px] py-4 pr-4 bg-linear border-b border-[#0000004D] h-full">
      <img
        className="md:w-[45px] w-[30px] md:h-[45px] h-[30px] shrink-0 object-contain"
        src={icon}
        alt=""
      />
      <div className="flex flex-col gap-[2px] font-medium w-full">
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
        {showRawLink ? (
          link ? (
            <button
              className="md:text-[16px] justify-between flex items-center gap-2 text-[14px] px-2 py-[6px] bg-[#112D6C] text-white rounded-md"
              onClick={handleCopyLink}
            >
              <span className="block min-w-0 overflow-hidden whitespace-nowrap">
                {link}
              </span>{" "}
              <Copy size={18} />
            </button>
          ) : null
        ) : (
          <button
            className="md:text-[16px] justify-between flex items-center gap-2 text-[14px] px-2 py-[6px] bg-[#112D6C] text-white w-full rounded-md"
            onClick={() => window.open(link, "_blank")}
          >
            Перейти <ArrowRight />
          </button>
        )}
      </div>
    </div>
  );
};

export default DeviceInstructions;
