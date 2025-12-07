import { ASSETS } from "@/assets";

const LoginForm = () => {
  return (
    <form className="flex flex-col lg:gap-[10px] gap-2 lg:mt-[60px] mt-4">
      <p className="text-[14px] font-medium text-black leading-[1.4]">
        Введи тот же адрес электронной почты, который был использован при
        покупке.
      </p>
      <div className="border border-[#4F709680] lg:rounded-[12px] rounded relative">
        <img
          src={ASSETS.emailAddress}
          alt=""
          className="lg:w-[26px] lg:h-[26px] w-[20px] h-[20px] absolute top-1/2 lg:left-4 left-2 -translate-y-1/2"
        />
        <input
          type="email"
          placeholder="Введите адрес электронной почты для покупки"
          className="lg:py-[14px] py-2 lg:pl-[50px] pl-8 pr-4 w-full outline-none text-[#4F7096] lg:text-[16px] text-[14px] font-medium"
        />
      </div>
      <label className="flex items-center gap-[5px] text-[14px] font-bold text-black leading-[1.4] cursor-pointer select-none mt-3">
        <input type="checkbox" />
        Запомнить мою информацию
      </label>
      <button className="bg-[#112D6C] lg:text-base text-[14px] font-medium lg:py-5 py-3 lg:rounded-[16px] rounded-lg text-white lg:mt-[50px] mt-4">
        Продолжить
      </button>
    </form>
  );
};

export default LoginForm;
