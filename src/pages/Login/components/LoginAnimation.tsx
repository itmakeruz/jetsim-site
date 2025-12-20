import Lottie from "lottie-react";
import flightAnimation from "@/assets/animations/Flight.json";
import { useTranslation } from "react-i18next";

const LoginAnimation = () => {
  const { t } = useTranslation();

  return (
    <div className="border-[#CBD2D9] md:pb-[50px] px-4 flex flex-col justify-center 2xl:gap-[50px] gap-[30px] border-0 rounded-[16px] max-md:order-[-1]">
      <div className="xl:h-[350px] md:h-[300px] h-[180px]">
        <Lottie
          animationData={flightAnimation}
          loop={true}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
      <div className="md:flex hidden flex-col gap-[10px] max-w-[550px] mx-auto">
        <h2 className="md:text-[26px] text-[20px] font-bold text-center text-black leading-none">
          {t("login.animation_title")}
        </h2>
        <p className="md:text-[18px] text-[16px] font-medium text-center text-[#4F7096] leading-[1.4]">
          {t("login.animation_description")}
        </p>
      </div>
    </div>
  );
};

export default LoginAnimation;
