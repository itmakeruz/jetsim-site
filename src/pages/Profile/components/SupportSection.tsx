import React from "react";

const SupportSection: React.FC = () => {
  const supportData = [
    { label: "Номер телефона:", value: "+71 50 123 454 45" },
    { label: "Телеграм-бот:", value: "@JetSim" },
  ];

  return (
    <div className="flex flex-col gap-2 bg-linear border-b border-[#0000004D] h-full pr-[30px]">
      <h2 className="text-base font-medium text-[#2f2d2d]">
        Служба поддержки:
      </h2>
      <div className="flex flex-col gap-1 text-[14px] text-[#2f2d2d] font-normal">
        {supportData.map((item, index) => (
          <React.Fragment key={item.label}>
            <div className="flex items-center justify-between">
              <span>{item.label}</span>
              <span>{item.value}</span>
            </div>
            {index < supportData.length - 1 && <hr className="bg-[#E4E4E4]" />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default SupportSection;
