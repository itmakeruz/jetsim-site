import React from "react";

const SupportSection: React.FC = () => {
  const supportData = [
    { label: "Номер телефона:", value: "+7 (933) 900-00-03" },
    { label: "Телеграм-бот:", value: "@JetSim" },
  ];

  return (
    <div className="flex flex-col md:gap-2 gap-1 bg-linear border-b md:pb-1 pb-2 border-[#0000004D] h-full md:pr-[30px] pr-4">
      <h2 className="text-base font-medium text-[#2f2d2d]">
        Служба поддержки:
      </h2>
      <div className="flex flex-col md:gap-1 gap-0.5 text-[14px] text-[#2f2d2d] font-normal">
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
