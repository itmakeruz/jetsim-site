import React from "react";
import type { ActiveSim } from "@/types/api";

interface SimDataSectionProps {
  sim: ActiveSim;
}

const SimDataSection: React.FC<SimDataSectionProps> = ({ sim }) => {
  const dataFields = [
    { label: "ICCID:", value: sim.iccid || "-" },
    { label: "UID:", value: sim.uid || "-" },
    { label: "PIN:", value: sim.pin_1 || "-" },
    { label: "PUK:", value: sim.puk_1 || "-" },
  ];

  return (
    <div className="flex flex-col gap-2 bg-linear border-b pb-1 border-[#0000004D] h-full pr-[30px]">
      <h2 className="text-base font-medium text-[#2f2d2d]">Данные SIM:</h2>
      <div className="flex flex-col gap-1 text-[14px] text-[#2f2d2d] font-normal">
        {dataFields.map((field, index) => (
          <React.Fragment key={field.label}>
            <div className="flex items-center justify-between">
              <span>{field.label}</span>
              <span>{field.value}</span>
            </div>
            {index < dataFields.length - 1 && <hr className="bg-[#E4E4E4]" />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default SimDataSection;
