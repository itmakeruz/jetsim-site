import React from "react";
import { NavLink } from "react-router-dom";
import TabBadge from "./TabBadge";

export interface TabItemConfig {
  to: string;
  translationKey: string;
  count?: number;
  badgeVariant?: "primary" | "secondary";
  end?: boolean;
  order?: number;
  className?: string;
}

interface TabItemProps {
  config: TabItemConfig;
  getTabClassName: (isActive: boolean) => string;
}

const TabItem: React.FC<TabItemProps> = ({ config, getTabClassName }) => {
  const {
    to,
    translationKey,
    count,
    badgeVariant = "secondary",
    end = false,
    order,
    className = "",
  } = config;

  const tabContent = (
    <>
      {count !== undefined ? (
        <div className="flex items-center gap-2 md:gap-2">
          {translationKey}{" "}
          {count > 0 && <TabBadge count={count} variant={badgeVariant} />}
        </div>
      ) : (
        translationKey
      )}
    </>
  );

  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `${getTabClassName(isActive)} ${
          order ? "!order-[-1]" : ""
        } ${className}`
      }
    >
      {tabContent}
    </NavLink>
  );
};

export default TabItem;
