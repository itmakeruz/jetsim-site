import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useCart } from "../../context/CartContext";
import { useAuthStore } from "../../store/authStore";
import { useSearchParams, useNavigate } from "react-router-dom";
import { ProfileRender } from "../../layouts/Profile/Profile";
import { CartRender } from "../../layouts/Cart/Cart";
import { MyRender } from "../../layouts/My/My";
import { HistoryRender } from "../../layouts/History/History";
import { useQuery } from "@tanstack/react-query";
import { cartAPI } from "../../services/api.service";

const Profile: React.FC = () => {
  const { t } = useTranslation();
  const { cartCount, mySimCount, setMySimCount } = useCart();
  const { isAuthenticated, isInitialized, initializeAuth } = useAuthStore();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const tabParam = searchParams.get("tab");
  const [activeTab, setActiveTab] = useState("cart");

  // Initialize authentication state on component mount
  useEffect(() => {
    if (!isInitialized) {
      initializeAuth();
    }
  }, [isInitialized, initializeAuth]);
  const { data: ordersResponse } = useQuery({
    queryKey: ["staticOrders"],
    queryFn: async () => {
      const response = await cartAPI.getStaticOrders();
      return response;
    },
    enabled: isAuthenticated, // 🔥 faqat login bo‘lsa so‘rov ketadi
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    refetchOnMount: false,
  });

  // Update mySimCount when ordersResponse changes
  useEffect(() => {
    if (ordersResponse?.data?.success) {
      setMySimCount(ordersResponse.data.meta.totalItems);
    }
  }, [ordersResponse, setMySimCount]);
  useEffect(() => {
    // Wait for authentication to be initialized before making tab decisions
    if (!isInitialized) return;

    if (tabParam) {
      // Check if the tab is allowed for the current authentication status
      const allowedTabs = isAuthenticated
        ? ["profile", "cart", "esim", "history"]
        : ["cart"];

      if (allowedTabs.includes(tabParam)) {
        setActiveTab(tabParam);
      } else {
        // If tab is not allowed, redirect to default tab
        setActiveTab("cart");
        navigate("/profile?tab=cart", { replace: true });
      }
    } else if (isAuthenticated) {
      setActiveTab("profile");
    } else {
      setActiveTab("cart");
    }
  }, [searchParams, isAuthenticated, isInitialized, navigate]);

  const handleTabChange = (tabId: string) => {
    // Check if the tab is allowed for the current authentication status
    const allowedTabs = isAuthenticated
      ? ["profile", "cart", "esim", "history"]
      : ["cart"];

    if (allowedTabs.includes(tabId)) {
      setActiveTab(tabId);
      navigate(`/profile?tab=${tabId}`, { replace: true });
    }
  };

  const tabs = [
    ...(isAuthenticated
      ? [{ id: "profile", label: t("profile.tabs.profile") }]
      : []),
    {
      id: "cart",
      label: (
        <div className="flex items-center gap-2 md:gap-2">
          {t("profile.tabs.cart")}{" "}
          <span className="w-[35px] md:w-[35px] sm:w-[25px] h-[22px] md:h-[22px] sm:h-[20px] rounded-[10px] bg-[#e31d1c] text-white flex items-center justify-center text-[15px] md:text-[15px] sm:text-[13px] font-semibold">
            {cartCount}
          </span>
        </div>
      ),
    },
    ...(isAuthenticated
      ? [
          {
            id: "esim",
            label: (
              <div className="flex items-center gap-2 md:gap-2">
                {t("profile.tabs.esim")}{" "}
                <span className="w-[35px] md:w-[35px] sm:w-[25px] h-[22px] md:h-[22px] sm:h-[20px] rounded-[10px] bg-[#212b36] text-white flex items-center justify-center text-[15px] md:text-[15px] sm:text-[13px] font-semibold">
                  {mySimCount}
                </span>
              </div>
            ),
          },
          { id: "history", label: t("profile.tabs.history") },
        ]
      : []),
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileRender />;
      case "cart":
        return <CartRender />;
      case "esim":
        return <MyRender />;
      case "history":
        return <HistoryRender />;
      default:
        return null;
    }
  };

  return (
    <div className="container">
      <div className="py-[50px] md:py-[50px] sm:py-[25px]">
        <h1 className="font-extrabold text-[44px] md:text-[44px] sm:text-[30px] leading-[100%] tracking-[0px] text-center m-0 mb-[40px] md:mb-[40px] sm:mb-[20px]">
          {t("profile.title")}
        </h1>
        <div className="flex gap-[50px] md:gap-[50px] sm:gap-[15px] mb-[23px] flex-wrap justify-center items-center">
          {tabs.map((tab) => (
            <a
              key={tab.id}
              className={`font-bold text-[15px] md:text-[15px] sm:text-[14px] leading-[22px] md:leading-[22px] sm:leading-[18px] tracking-[0px] pb-[5px] md:pb-[5px] sm:pb-[3px] cursor-pointer ${
                activeTab === tab.id
                  ? "text-[#212b36] border-b-2 border-[#212b36]"
                  : "text-[#637381]"
              }`}
              onClick={(e) => {
                e.preventDefault();
                handleTabChange(tab.id);
              }}
            >
              {tab.label}
            </a>
          ))}
        </div>
        <div className="w-full">{renderContent()}</div>
      </div>
    </div>
  );
};

export default Profile;
