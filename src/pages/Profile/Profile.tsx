import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useCart } from "../../context/CartContext";
import "./Profile.css";
import { ProfileRender } from "../../layouts/Profile/Profile";
import { CartRender } from "../../layouts/Cart/Cart";
import { MyRender } from "../../layouts/My/My";
import { HistoryRender } from "../../layouts/History/History";

const Profile: React.FC = () => {
  const { t } = useTranslation();
  const { cartCount } = useCart();
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", label: t("profile.tabs.profile") },
    {
      id: "cart",
      label: (
        <div className="profile-wrapper">
          {t("profile.tabs.cart")}{" "}
          <span className="cart-counter">{cartCount}</span>
        </div>
      ),
    },
    {
      id: "esim",
      label: (
        <div className="profile-wrapper">
          {t("profile.tabs.esim")} <span className="esim-counter">5</span>
        </div>
      ),
    },
    { id: "history", label: t("profile.tabs.history") },
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
      <div className="profile-page">
        <h1 className="profile-title">{t("profile.title")}</h1>
        <div className="profile-nav">
          {tabs.map((tab) => (
            <a
              key={tab.id}
              className={activeTab === tab.id ? "active-tab" : "tab"}
              onClick={(e) => {
                e.preventDefault();
                setActiveTab(tab.id);
              }}
            >
              {tab.label}
            </a>
          ))}
        </div>
        <div className="profile-content-area">{renderContent()}</div>
      </div>
    </div>
  );
};

export default Profile;
