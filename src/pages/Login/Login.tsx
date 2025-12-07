import Lottie from "lottie-react";
import flightAnimation from "@/assets/animations/Flight.json";
import { ASSETS } from "@/assets";
import LanguageSwitcher from "@/components/LanguageSwitcher/LanguageSwitcher";
import { Link } from "react-router-dom";
import { APP_ROUTES } from "@/router/path";
const Login = () => {
  return (
    <div className="h-screen 2xl:px-[70px] 2xl:py-[80px] 2xl:gap-[150px] gap-[100px] py-[60px] px-[50px] overflow-hidden grid lg:grid-cols-[2fr_1.7fr] 2xl:grid-cols-[auto_600px]">
      <div className="w-full flex flex-col h-full">
        <div className="flex items-center justify-between">
          <Link className="w-[200px] h-auto" to={APP_ROUTES.HOME}>
            <img className="w-full" src={ASSETS.logo} alt="" />
          </Link>
          <LanguageSwitcher />
        </div>
        <div className="text-[26px] font-bold text-black leading-none mt-[30px] flex flex-col gap-[10px]">
          <h1 className="">Уже купил(а) eSIM?</h1>
          <h1> Войди в JetSim, чтобы управлять ей.</h1>
        </div>
        <form className="flex flex-col gap-[10px] mt-[60px]">
          <p className="text-[14px] font-medium text-black leading-[1.4]">
            Введи тот же адрес электронной почты, который был использован при
            покупке.
          </p>
          <div className="border border-[#4F709680] rounded-[12px] relative">
            <img
              src={ASSETS.emailAddress}
              alt=""
              className="w-[26px] h-[26px] absolute top-1/2 left-4 -translate-y-1/2"
            />
            <input
              type="email"
              placeholder="Введите адрес электронной почты для покупки"
              className="py-[14px] pl-[50px] w-full outline-none text-[#4F7096] text-[16px] font-medium"
            />
          </div>
          <label className="flex items-center gap-[5px] text-[14px] font-bold text-black leading-[1.4] cursor-pointer select-none mt-3">
            <input type="checkbox" />
            Запомнить мою информацию
          </label>
          <button className="bg-[#112D6C] text-base font-medium py-5 rounded-[16px] text-white mt-[50px]">
            Продолжить
          </button>
        </form>
        <p className="text-[14px] font-medium text-[#8A9099] leading-[1.4] mt-auto">
          Продолжая, ты принимаешь наши{" "}
          <Link
            className="underline font-bold text-[#696B70]"
            to={APP_ROUTES.USLOVIYA}
          >
            Условия и положения
          </Link>
           и 
          <Link
            className="underline font-bold text-[#696B70]"
            to={APP_ROUTES.CONFIDENTIAL}
          >
            Политику
          </Link>
          конфиденциальности.
        </p>
      </div>
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
    </div>
  );
};

export default Login;
