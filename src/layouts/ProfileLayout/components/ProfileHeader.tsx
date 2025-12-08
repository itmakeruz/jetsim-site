import React from "react";
import { useTranslation } from "react-i18next";

const ProfileHeader: React.FC = () => {
  const { t } = useTranslation();

  return (
    <h1 className="font-extrabold text-[44px] md:text-[44px] sm:text-[30px] leading-[100%] tracking-[0px] text-center m-0 mb-[40px] md:mb-[40px] sm:mb-[20px]">
      {t("profile.title")}
    </h1>
  );
};

export default ProfileHeader;
