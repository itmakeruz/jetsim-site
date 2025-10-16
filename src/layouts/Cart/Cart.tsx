import { useCart } from "../../context/CartContext";
import { useTranslation } from "react-i18next";
import { Plus } from "lucide-react";
import { useState } from "react";
import { APP_ROUTES } from "../../router/path";
import { ASSETS } from "../../assets";
import { getImageUrl } from "../../config/imageUtils";

export const CartRender = () => {
  const { t } = useTranslation();
  const { cartItems } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBuyClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="w-full">
      {cartItems.length === 0 ? (
        <p className="text-center text-gray-600 py-8">
          {t("profile.cart.empty")}
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {cartItems.map((item, index) => (
            <div
              key={index}
              className="border border-black/30 p-5 rounded-[10px]"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-[40px]">
                    <img
                      className="w-full h-full object-contain rounded-[2px] outline-[1px] outline-[rgb(0,0,0,0.1)] outline-offset-[-1px]"
                      src={getImageUrl(item.flag)}
                      alt=""
                    />
                  </div>
                  <h3 className="font-normal text-lg md:text-xl lg:text-2xl leading-[22.42px] tracking-[0px]">
                    {item.name}
                  </h3>
                </div>
                <input className="w-5 h-5 cursor-pointer" type="checkbox" />
              </div>
              <div className="flex flex-col gap-2.5 mb-2.5">
                <p>
                  {t("sims.trafic")} {item.plan.quantity_internet}
                </p>
                <p>
                  {t("sims.srok")} {item.plan.validity_period}
                </p>
                <p>
                  {t("sims.set")} {item.plan.is_4g && "4G"}{" "}
                  {item.plan.is_5g && "5G"}
                </p>
              </div>
              <div className="flex items-center w-fit">
                <div className="flex">
                  <img
                    className="w-[23px] h-[23px] -mb-0.5 -mr-1.5 object-cover"
                    src={ASSETS.country1}
                    alt=""
                  />
                  <img
                    className="w-[23px] h-[23px] -mb-0.5 -mr-1.5 object-cover"
                    src={ASSETS.country2}
                    alt=""
                  />
                  <img
                    className="w-[23px] h-[23px] -mb-0.5 -mr-1.5 object-cover"
                    src={ASSETS.country3}
                    alt=""
                  />
                  <img
                    className="w-[23px] h-[23px] -mb-0.5 -mr-1.5 object-cover"
                    src={ASSETS.country4}
                    alt=""
                  />
                </div>
                <a
                  className="text-white px-2.5 bg-[#1978e5] rounded-tr-[10px] rounded-br-[10px] text-sm font-light"
                  href="#"
                >
                  {item.plan.status}
                </a>
              </div>
              <div className="flex items-center mt-[15px]">
                <div className="border-2 border-[#1978e5] border-r-0 py-0.5 pl-2 pr-[30px] md:pr-[50px] lg:pr-[85px] rounded-tl-[10px] rounded-bl-[10px]">
                  <h3 className="font-medium italic text-sm md:text-lg lg:text-xl tracking-[0px]">
                    {item.plan.type}
                  </h3>
                </div>
                <div className="bg-[#1978e5] py-[8px] md:py-[10px] lg:py-[11.5px] px-[15px] md:px-[20px] lg:px-10 rounded-tr-[10px] rounded-br-[10px] cursor-pointer">
                  <div className="flex items-center justify-center">
                    <Plus color="#FFFFFF" size={10} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {cartItems.length > 0 && (
        <button
          className="bg-[#007bff] text-white border-none py-2.5 px-6 rounded-[16.18px] text-base cursor-pointer w-full mt-[23px] self-end"
          onClick={handleBuyClick}
        >
          {t("profile.cart.buy")}
        </button>
      )}

      {/* MODAL */}

      {isModalOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center z-[1000]"
          onClick={handleCloseModal}
        >
          <div
            className="bg-white p-5 rounded-[10px] w-[95%] md:w-[90%] lg:w-[80%] relative shadow-[0_4px_6px_rgba(0,0,0,0.1)] max-h-[95vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl mb-[15px]">{t("profile.payment.title")}</h2>
            <button
              className="absolute top-2.5 right-2.5 bg-none border-none text-2xl cursor-pointer text-black p-0 leading-none"
              onClick={handleCloseModal}
            >
              ×
            </button>

            <div className="flex items-stretch gap-3 lg:flex-row flex-col">
              <div className="flex-1">
                <h2 className="text-2xl mb-[15px]">
                  {t("profile.payment.type")}
                </h2>
                <div className="flex flex-col items-stretch gap-5">
                  <div className="mt-[15px] p-[15px] md:p-[18px] rounded-[10px] border border-black">
                    <label className="flex items-center gap-2 text-base">
                      <input
                        className="w-[14px] h-[14px] cursor-pointer"
                        type="radio"
                        name="payment"
                        value="debit"
                        defaultChecked
                      />{" "}
                      DebitCard
                    </label>

                    <div className="mt-2.5 flex flex-col gap-3">
                      <input
                        className="py-[10px] md:py-[13px] px-[7.5px] md:px-5 border border-[#b5b5b5] rounded-lg"
                        type="text"
                        placeholder="card number"
                        name=""
                        id=""
                      />

                      <div className="flex items-center gap-3">
                        <input
                          className="py-[10px] md:py-[13px] px-[7.5px] md:px-5 border border-[#b5b5b5] rounded-lg w-1/2"
                          type="text"
                          placeholder="cvv"
                          name=""
                          id=""
                        />
                        <input
                          className="py-[10px] md:py-[13px] px-[7.5px] md:px-5 border border-[#b5b5b5] rounded-lg w-1/2"
                          type="text"
                          placeholder="mm/yyyy"
                          name=""
                          id=""
                        />
                      </div>

                      <input
                        className="py-[10px] md:py-[13px] px-[7.5px] md:px-5 border border-[#b5b5b5] rounded-lg"
                        type="text"
                        placeholder="CardHolder name"
                        name=""
                        id=""
                      />
                    </div>
                  </div>
                  <div className="mt-[15px] p-[15px] md:p-[18px] rounded-[10px] border border-black">
                    <label className="flex items-center gap-2 text-base">
                      <input
                        className="w-[14px] h-[14px] cursor-pointer"
                        type="radio"
                        name="payment"
                        value="paypal"
                      />{" "}
                      PayPal
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-[15px] mb-5 max-h-[450px] overflow-y-auto w-full">
                <h2 className="text-2xl mb-[15px]">
                  {t("profile.payment.order")}
                </h2>
                {cartItems.map((item, index) => (
                  <div
                    key={index}
                    className="border border-black/30 p-[15px] rounded-[10px]"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-4xl">{item.flag}</span>
                      <h3 className="font-normal text-lg md:text-xl lg:text-2xl leading-[22.42px] tracking-[0px]">
                        {item.name}
                      </h3>
                    </div>
                    <div className="flex flex-col gap-2.5 mb-2.5">
                      <p>
                        {t("sims.trafic")} {item.plan.quantity_internet}
                      </p>
                      <p>
                        {t("sims.srok")} {item.plan.validity_period}
                      </p>
                      <p>
                        {t("sims.set")} {item.plan.is_4g && "4G"}{" "}
                        {item.plan.is_5g && "5G"}
                      </p>
                    </div>
                    <a
                      className="bg-[#1978e5] text-white py-0.5 px-2.5 rounded-[10px]"
                      href="#"
                    >
                      {item.plan.status}
                    </a>
                    <div className="flex items-center mt-[15px]">
                      <div className="border-2 border-[#1978e5] border-r-0 py-0.5 pl-2 pr-[30px] md:pr-[50px] lg:pr-[85px] rounded-tl-[10px] rounded-bl-[10px]">
                        <h3 className="font-medium italic text-xl tracking-[0px]">
                          {item.plan.type}
                        </h3>
                      </div>
                      <div className="bg-[#1978e5] py-[8px] md:py-[10px] lg:py-[11.5px] px-[15px] md:px-[20px] lg:px-10 rounded-tr-[10px] rounded-br-[10px] cursor-pointer">
                        <div className="flex items-center justify-center">
                          <Plus color="#FFFFFF" size={10} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="mt-5">
                  <p className="font-normal text-base leading-[24.07px] tracking-[0px] text-black mb-[7px]">
                    {t("profile.payment.promokod")}
                  </p>

                  <div className="flex items-stretch gap-[7px]">
                    <input
                      className="w-full border border-[#e8edf2] rounded-[10px] bg-[#e8edf2] py-[5px] md:py-[7px] px-2 md:px-2.5"
                      type="text"
                      name="kupon"
                      placeholder={t("profile.payment.code")}
                      id=""
                    />
                    <button
                      className="bg-none bg-[#1978e5] text-white rounded-[10px] py-[5px] md:py-[7px] px-[10px] md:px-[15px] text-sm"
                      type="submit"
                    >
                      {t("profile.payment.apply")}
                    </button>
                  </div>

                  <h1 className="font-semibold text-[30px] md:text-[45px] leading-[100%] tracking-[0px] align-middle mt-5 text-right text-[#0054b7]">
                    {t("profile.payment.overall")} $4.99
                  </h1>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5 justify-center mt-5">
              <input type="checkbox" name="agree" id="" />
              <p className="text-center text-xs">{t("profile.payment.okey")}</p>
            </div>

            <button
              className="bg-[#007bff] text-white border-none py-2 md:py-2.5 px-4 md:px-5 rounded-[16.18px] text-sm md:text-base cursor-pointer w-full mt-5"
              type="submit"
            >
              {t("modal.accept")}
            </button>

            <ul className="flex items-center justify-between mt-[25px] flex-wrap md:flex-row flex-col">
              <a
                className="text-xs md:text-sm leading-[12.63px] text-black my-1"
                href={APP_ROUTES.CONFIDENTIAL}
              >
                {t("modal.nav1")}
              </a>
              <a
                className="text-xs md:text-sm leading-[12.63px] text-black my-1"
                href={APP_ROUTES.OFERTA}
              >
                {t("modal.nav2")}
              </a>
              <a
                className="text-xs md:text-sm leading-[12.63px] text-black my-1"
                href={APP_ROUTES.USLOVIYA}
              >
                {t("modal.nav3")}
              </a>
              <a
                className="text-xs md:text-sm leading-[12.63px] text-black my-1"
                href={APP_ROUTES.RULE}
              >
                {t("modal.nav4")}
              </a>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
