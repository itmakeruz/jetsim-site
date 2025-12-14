import React from "react";

interface DeviceInstructionsProps {
  icon: string;
}

const DeviceInstructions: React.FC<DeviceInstructionsProps> = ({ icon }) => {
  const instructions = [
    "Настройки → Сотовая связь → Добавить тариф",
    "Отсканируйте QR-код выше",
    "Или используйте ссылку ниже",
  ];

  return (
    <div className="flex items-center gap-[10px] py-[25px] pr-4 bg-linear border-b border-[#0000004D] h-full">
      <img className="w-[45px] h-[45px] object-contain" src={icon} alt="" />
      <div className="flex flex-col gap-[2px] font-medium">
        {instructions.map((instruction, index) => (
          <h6 key={index} className="flex items-center gap-[5px]">
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
    </div>
  );
};

export default DeviceInstructions;
