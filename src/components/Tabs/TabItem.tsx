import React from "react";
import { NavLink } from "react-router-dom";
import { UserRound, ShoppingBag, Smartphone } from "lucide-react";

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

  const Icon =
    to === "/profile" ? UserRound : to === "/cart" ? ShoppingBag : Smartphone;
  const tabContent = (
    <>
      <Icon size={17} strokeWidth={1.7} />
      <span>{translationKey}</span>
      {count !== undefined && count > 0 && (
        <span className={`ew-account-count ew-account-count--${badgeVariant}`}>
          {count}
        </span>
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
