import Lottie from "lottie-react";
import flightAnimation from "@/assets/animations/Flight.json";

const LoginAnimation = () => {
  return (
    <div className="border-[#CBD2D9] pb-[50px] max-lg:hidden px-4 flex flex-col justify-center 2xl:gap-[50px] gap-[30px] border-2 rounded-[16px]">
      <div className=":h-[450px] h-[300px]">
        <Lottie
          animationData={flightAnimation}
          loop={true}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
      <div className="flex flex-col shrink-0 gap-[10px] ">
        <h2 className="text-[26px] font-bold text-center text-black leading-none">
          Отправляешься в путешествие?
        </h2>
        <p className="text-[18px] font-medium text-center text-[#4F7096] leading-[1.4]">
          Возьми с собой Jet Sim и будь онлайн с первых минут приземления.
        </p>
      </div>
    </div>
  );
};

export default LoginAnimation;
