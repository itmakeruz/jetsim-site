import Lottie from "lottie-react";
import flightAnimation from "@/assets/animations/Flight.json";
import { useTranslation } from "react-i18next";

const LoginAnimation = () => {
  const { t } = useTranslation();

  return (
    <div className="border-[#CBD2D9] pb-[50px] max-lg:hidden px-4 flex flex-col justify-center 2xl:gap-[50px] gap-[30px] border-2 rounded-[16px]">
      <div className=":h-[450px] h-[300px]">
        <Lottie
          animationData={flightAnimation}
          loop={true}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
      <div className="flex flex-col gap-[10px] max-w-[550px] mx-auto">
        <h2 className="text-[26px] font-bold text-center text-black leading-none">
          {t("login.animation_title")}
        </h2>
        <p className="text-[18px] font-medium text-center text-[#4F7096] leading-[1.4]">
          {t("login.animation_description")}
        </p>
      </div>
    </div>
  );
};

export default LoginAnimation;
