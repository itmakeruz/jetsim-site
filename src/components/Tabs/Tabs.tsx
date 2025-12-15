import React from "react";
import TabItem, { TabItemConfig } from "./TabItem";

export interface TabsProps {
  tabs: TabItemConfig[];
  className?: string;
  getTabClassName?: (isActive: boolean) => string;
}

const defaultGetTabClassName = (isActive: boolean) =>
  `font-bold text-[15px] md:text-[15px] sm:text-[14px] leading-[22px] md:leading-[22px] sm:leading-[18px] tracking-[0px] pb-[5px] md:pb-[5px] sm:pb-[3px] ${
    isActive ? "text-[#212b36] border-b-2 border-[#212b36]" : "text-[#637381]"
  }`;

const Tabs: React.FC<TabsProps> = ({
  tabs,
  className = "",
  getTabClassName = defaultGetTabClassName,
}) => {
  return (
    <div
      className={`flex gap-[20px] whitespace-nowrap md:gap-[50px] sm:gap-[30px] mb-[23px] items-center overflow-x-auto no-scroll snap-x ${className}`}
    >
      {tabs.map((tab, index) => (
        <TabItem key={index} config={tab} getTabClassName={getTabClassName} />
      ))}
    </div>
  );
};

export default Tabs;
