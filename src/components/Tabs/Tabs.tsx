import { useTranslation } from "react-i18next";
import React from "react";
import TabItem from "./TabItem";
import type { TabItemConfig } from "@/components/Tabs";

export interface TabsProps {
  tabs: TabItemConfig[];
  className?: string;
  getTabClassName?: (isActive: boolean) => string;
}

const defaultGetTabClassName = (isActive: boolean) =>
  `js-account-tab ${isActive ? "is-active" : ""}`;

const Tabs: React.FC<TabsProps> = ({
  tabs,
  className = "",
  getTabClassName = defaultGetTabClassName,
}) => {
  const { t } = useTranslation();
  return (
    <nav
      aria-label={t("profile.title")}
      className={`js-account-tabs ${className}`}
    >
      {tabs.map((tab, index) => (
        <TabItem key={index} config={tab} getTabClassName={getTabClassName} />
      ))}
    </nav>
  );
};

export default Tabs;
