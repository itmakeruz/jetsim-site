import React from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { useAuthStore } from "../../../store/authStore";
import { useTariffStore } from "../../../store/tariffStore";
import { APP_ROUTES } from "@/router/path";

interface ProfileTabsProps {
  activeCount: number;
  inactiveCount: number;
}

const ProfileTabs: React.FC<ProfileTabsProps> = ({
  activeCount,
  inactiveCount,
}) => {
  const { t } = useTranslation();
  const { isAuthenticated } = useAuthStore();
  const { selectedTariffs } = useTariffStore();

  const cartCount = selectedTariffs.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0
  );

  const getTabClassName = (isActive: boolean) =>
    `font-bold text-[15px] md:text-[15px] sm:text-[14px] leading-[22px] md:leading-[22px] sm:leading-[18px] tracking-[0px] pb-[5px] md:pb-[5px] sm:pb-[3px] ${
      isActive ? "text-[#212b36] border-b-2 border-[#212b36]" : "text-[#637381]"
    }`;

  return (
    <div className="flex gap-[50px] md:gap-[50px] sm:gap-[15px] mb-[23px] flex-wrap justify-center items-center">
      <NavLink
        to={APP_ROUTES.CART}
        className={({ isActive }) => getTabClassName(isActive)}
      >
        <div className="flex items-center gap-2 md:gap-2">
          {t("profile.tabs.cart")}{" "}
          <span className="w-[35px] md:w-[35px] sm:w-[25px] h-[22px] md:h-[22px] sm:h-[20px] rounded-[10px] bg-[#e31d1c] text-white flex items-center justify-center text-[15px] md:text-[15px] sm:text-[13px] font-semibold">
            {cartCount}
          </span>
        </div>
      </NavLink>
      {isAuthenticated && (
        <>
          <NavLink
            to={APP_ROUTES.PROFILE}
            end
            className={({ isActive }) =>
              getTabClassName(isActive) + " !order-[-1]"
            }
          >
            {t("profile.tabs.profile")}
          </NavLink>
          <NavLink
            to={APP_ROUTES.ACTIVE}
            className={({ isActive }) => getTabClassName(isActive)}
          >
            <div className="flex items-center gap-2 md:gap-2">
              {t("profile.tabs.active") || "Активные"}{" "}
              <span className="w-[35px] md:w-[35px] sm:w-[25px] h-[22px] md:h-[22px] sm:h-[20px] rounded-[10px] bg-[#212b36] text-white flex items-center justify-center text-[15px] md:text-[15px] sm:text-[13px] font-semibold">
                {activeCount}
              </span>
            </div>
          </NavLink>
          <NavLink
            to={APP_ROUTES.INACTIVE}
            className={({ isActive }) => getTabClassName(isActive)}
          >
            <div className="flex items-center gap-2 md:gap-2">
              {t("profile.tabs.inactive") || "Не активные"}{" "}
              <span className="w-[35px] md:w-[35px] sm:w-[25px] h-[22px] md:h-[22px] sm:h-[20px] rounded-[10px] bg-[#212b36] text-white flex items-center justify-center text-[15px] md:text-[15px] sm:text-[13px] font-semibold">
                {inactiveCount}
              </span>
            </div>
          </NavLink>
          <NavLink
            to={APP_ROUTES.HISTORY}
            className={({ isActive }) => getTabClassName(isActive)}
          >
            {t("profile.tabs.history")}
          </NavLink>
        </>
      )}
    </div>
  );
};

export default ProfileTabs;
