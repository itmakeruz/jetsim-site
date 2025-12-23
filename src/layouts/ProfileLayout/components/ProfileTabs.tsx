import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useAuthStore } from "../../../store/authStore";
import { useTariffStore } from "../../../store/tariffStore";
import { APP_ROUTES } from "@/router/path";
import { useSimcardStore } from "@/store/simcardStore";
import { Tabs } from "@/components/Tabs";
import type { TabItemConfig } from "@/components/Tabs";

const ProfileTabs: React.FC = () => {
  const { t } = useTranslation();
  const { isAuthenticated } = useAuthStore();
  const { selectedTariffs } = useTariffStore();
  const { myesims } = useSimcardStore();

  const cartCount = selectedTariffs.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0
  );

  const tabs: TabItemConfig[] = useMemo(() => {
    const baseTabs: TabItemConfig[] = [
      {
        to: APP_ROUTES.CART,
        translationKey: t("profile.tabs.cart"),
        count: cartCount,
        badgeVariant: "primary",
      },
    ];

    if (isAuthenticated) {
      baseTabs.push(
        {
          to: APP_ROUTES.PROFILE,
          translationKey: t("profile.tabs.profile"),
          end: true,
          order: -1,
        },
        {
          to: APP_ROUTES.MYESIM,
          translationKey: t("profile.tabs.myesim"),
          count: myesims.length,
          badgeVariant: "secondary",
        }
      );
    }

    return baseTabs;
  }, [isAuthenticated, cartCount, myesims.length, t]);

  return <Tabs tabs={tabs} />;
};

export default ProfileTabs;
