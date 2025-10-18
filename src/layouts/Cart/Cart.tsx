import { useCart } from "../../context/CartContext";
import { useTranslation } from "react-i18next";
import { Plus, Minus } from "lucide-react";
import { useRef, useState } from "react";
// import { APP_ROUTES } from "../../router/path";
import { getImageUrl } from "../../config/imageUtils";
import type { Region } from "../../types/api";
import { cartAPI } from "../../services/api.service";

export const CartRender = () => {
  const { t } = useTranslation();
  const {
    cartItems,
    removeFromCart,
    cartTotal,
    addToCart,
  } = useCart();
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [isProcessing, setIsProcessing] = useState(false);
  // const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

  // Payment form state
  // const [paymentMethod, setPaymentMethod] = useState("debit");
  // const [paymentData, setPaymentData] = useState({
  //   cardNumber: "",
  //   cvv: "",
  //   expiryDate: "",
  //   cardHolderName: "",
  // });
  // const [promoCode, setPromoCode] = useState("");
  // const [discount, setDiscount] = useState(0);
  // const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleBuyClick = () => {
    // setIsModalOpen(true);
    cartAPI.postESIM();
  };

  // const handleCloseModal = () => {
  //   setIsModalOpen(false);
  //   // Reset form state when closing modal
  //   setPaymentData({
  //     cardNumber: "",
  //     cvv: "",
  //     expiryDate: "",
  //     cardHolderName: "",
  //   });
  //   setPromoCode("");
  //   setDiscount(0);
  //   setAgreedToTerms(false);
  // };

  // const handlePromoCodeApply = () => {
  //   // Simulate promo code validation
  //   if (promoCode.toLowerCase() === "welcome10") {
  //     setDiscount(0.1); // 10% discount
  //     toast.success("Promo code applied! 10% discount");
  //   } else if (promoCode.toLowerCase() === "save20") {
  //     setDiscount(0.2); // 20% discount
  //     toast.success("Promo code applied! 20% discount");
  //   } else {
  //     toast.error("Invalid promo code");
  //   }
  // };

  // const handlePaymentSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   if (!agreedToTerms) {
  //     toast.error("Please agree to the terms and conditions");
  //     return;
  //   }

  //   if (
  //     paymentMethod === "debit" &&
  //     (!paymentData.cardNumber ||
  //       !paymentData.cvv ||
  //       !paymentData.expiryDate ||
  //       !paymentData.cardHolderName)
  //   ) {
  //     toast.error("Please fill in all payment details");
  //     return;
  //   }

  //   setIsProcessing(true);

  //   try {
  //     await cartAPI.postESIM();
  //     toast.success("Payment successful! Your order has been processed.");
  //     clearCart();
  //     setSelectedItems(new Set());
  //     handleCloseModal();
  //   } catch (error) {
  //     toast.error("Payment failed. Please try again.");
  //   } finally {
  //     setIsProcessing(false);
  //   }
  // };
  const [openDropdowns, setOpenDropdowns] = useState<{
    [key: string]: boolean;
  }>({});
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});


  const toggleDropdown = (tariffId: number) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [tariffId]: !prev[tariffId],
    }));
  };
  console.log(cartItems);
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
              className="border border-[#0000004D] text-[14px] p-5 flex flex-col gap-2 rounded-[10px] relative"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-[40px]">
                    <img
                      className="w-full h-full object-contain rounded-[2px] outline-[1px] outline-[rgb(0,0,0,0.1)] outline-offset-[-1px]"
                      src={getImageUrl(item.region.image)}
                      alt=""
                    />
                  </div>
                  <h3 className="font-normal text-lg md:text-xl lg:text-2xl leading-[22.42px] tracking-[0px]">
                    {item.region.name}
                  </h3>
                </div>
              </div>
              <p>
                {t("sims.trafic")}{" "}
                <span className="font-bold">
                  {item.tariff.quantity_internet.toLocaleString()}мб
                </span>
              </p>
              <p>
                {t("sims.srok")}{" "}
                <span className="font-bold">
                  {item.tariff.validity_period} дней
                </span>
              </p>
              <p>
                {t("sims.set")}
                <span className="font-bold">
                  {" "}
                  {item.tariff.is_4g ? "4G" : ""} {item.tariff.is_5g ? "5G" : ""}
                </span>
              </p>{" "}
              <p>
                {t("sims.trafic")}{" "}
                <span className="font-bold">
                  {item.tariff.quantity_internet.toLocaleString()}мб
                </span>
              </p>
              <p>
                {t("sims.price")}{" "}
                <span className="font-bold">
                  {item.tariff.price_sell.toLocaleString()} руб.
                </span>
              </p>
              <div className="w-full flex items-center gap-2">
                <p className="text-[12px]">Зона покрытия:</p>{" "}
                <div
                  className="relative flex h-[20px]"
                  ref={(el) => {
                    dropdownRefs.current[item.tariff.id] = el;
                  }}
                >
                  {item?.tariff?.regions
                    .slice(0, 4)
                    .map((region: Region, index: number) => (
                      <img
                        className="mr-[-5px] h-[20px] w-[24px] object-cover rounded-[2px] outline-[1px] outline-[rgb(0,0,0,0.1)] outline-offset-[-1px]"
                        src={getImageUrl(region.image)}
                        alt={region.name}
                        key={index}
                      />
                    ))}
                  <button
                    className="text-[14px] leading-[1.2] bg-main-blue text-white min-w-[95px] rounded-r-[10px] rounded-l-[2px] hover:bg-blue-600 transition-colors duration-200"
                    onClick={() => toggleDropdown(item.tariff.id)}
                  >
                    Подробнее
                  </button>
                  {openDropdowns[item.tariff.id] && (
                    <div className="absolute top-full left-0 mt-1 rounded-[20px] p-2 z-50 min-w-[300px] max-h-[300px] overflow-y-auto bg-[#EFF6FF] flex flex-wrap gap-1">
                      {item.tariff.regions.map(
                        (region: Region, index: number) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 p-2 bg-main-blue rounded-[20px] w-max"
                          >
                            <img
                              className="h-4 w-5 object-cover rounded-sm"
                              src={getImageUrl(region.image)}
                              alt={region.name}
                            />
                            <span className="text-xs text-white font-normal">
                              {region.name}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex w-full border-[2px] items-center border-main-blue bg-main-blue rounded-[10px] overflow-hidden">
                <h3 className="bg-white rounded-l-[8px] w-full py-1 px-2 text-[20px] font-medium">
                  {item.tariff.type?.name}
                </h3>
                <div className="flex items-center gap-2 bg-main-blue rounded-lg px-4 py-2">
                  <button
                    onClick={() => removeFromCart(item.region, item.tariff)}
                    className="flex items-center justify-center w-6 h-6 bg-[#FFFFFF4D] text-white rounded-full hover:bg-blue-600 transition-colors"
                  >
                    <Minus className="w-3 h-3" />
                  </button>

                  <span className="flex items-center justify-center w-8 h-6 text-sm font-medium text-white">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() => addToCart(item.region, item.tariff)}
                    className="flex items-center justify-center w-6 h-6 bg-[#FFFFFF4D] text-white rounded-full hover:bg-blue-600 transition-colors"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {cartItems.length > 0 && (
        <div className="mt-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-semibold">
              Total: {cartTotal.toLocaleString()} руб.
            </span>
          </div>
          <button
            className="bg-[#007bff] text-white border-none py-2.5 px-6 rounded-[10px] text-base cursor-pointer w-full self-end disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleBuyClick}
          >
            Оплатить
          </button>
        </div>
      )}

      {/* MODAL */}

      {/* {isModalOpen && (
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
              <X className="w-6 h-6" />
            </button>

            <form onSubmit={handlePaymentSubmit}>
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
                          checked={paymentMethod === "debit"}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                        />{" "}
                        DebitCard
                      </label>

                      {paymentMethod === "debit" && (
                        <div className="mt-2.5 flex flex-col gap-3">
                          <input
                            className="py-[10px] md:py-[13px] px-[7.5px] md:px-5 border border-[#b5b5b5] rounded-lg"
                            type="text"
                            placeholder="Card number"
                            value={paymentData.cardNumber}
                            onChange={(e) =>
                              setPaymentData((prev) => ({
                                ...prev,
                                cardNumber: e.target.value,
                              }))
                            }
                            maxLength={19}
                          />

                          <div className="flex items-center gap-3">
                            <input
                              className="py-[10px] md:py-[13px] px-[7.5px] md:px-5 border border-[#b5b5b5] rounded-lg w-1/2"
                              type="text"
                              placeholder="CVV"
                              value={paymentData.cvv}
                              onChange={(e) =>
                                setPaymentData((prev) => ({
                                  ...prev,
                                  cvv: e.target.value,
                                }))
                              }
                              maxLength={4}
                            />
                            <input
                              className="py-[10px] md:py-[13px] px-[7.5px] md:px-5 border border-[#b5b5b5] rounded-lg w-1/2"
                              type="text"
                              placeholder="MM/YYYY"
                              value={paymentData.expiryDate}
                              onChange={(e) =>
                                setPaymentData((prev) => ({
                                  ...prev,
                                  expiryDate: e.target.value,
                                }))
                              }
                              maxLength={7}
                            />
                          </div>

                          <input
                            className="py-[10px] md:py-[13px] px-[7.5px] md:px-5 border border-[#b5b5b5] rounded-lg"
                            type="text"
                            placeholder="Cardholder name"
                            value={paymentData.cardHolderName}
                            onChange={(e) =>
                              setPaymentData((prev) => ({
                                ...prev,
                                cardHolderName: e.target.value,
                              }))
                            }
                          />
                        </div>
                      )}
                    </div>
                    <div className="mt-[15px] p-[15px] md:p-[18px] rounded-[10px] border border-black">
                      <label className="flex items-center gap-2 text-base">
                        <input
                          className="w-[14px] h-[14px] cursor-pointer"
                          type="radio"
                          name="payment"
                          value="paypal"
                          checked={paymentMethod === "paypal"}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                        />{" "}
                        PayPal
                      </label>
                      {paymentMethod === "paypal" && (
                        <div className="mt-2.5 p-4 bg-blue-50 rounded-lg">
                          <p className="text-sm text-blue-700">
                            You will be redirected to PayPal to complete your
                            payment.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-[15px] mb-5 max-h-[450px] overflow-y-auto w-full">
                  <h2 className="text-2xl mb-[15px]">
                    {t("profile.payment.order")} ({selectedItems.size} items)
                  </h2>
                  {cartItems
                    .filter((item) => selectedItems.has(item.id))
                    .map((item, index) => (
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
                              {item.plan.type?.name}
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
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                      />
                      <button
                        className="bg-none bg-[#1978e5] text-white rounded-[10px] py-[5px] md:py-[7px] px-[10px] md:px-[15px] text-sm"
                        type="button"
                        onClick={handlePromoCodeApply}
                      >
                        {t("profile.payment.apply")}
                      </button>
                    </div>

                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Subtotal:</span>
                        <span>${selectedItemsTotal.toFixed(2)}</span>
                      </div>
                      {discount > 0 && (
                        <div className="flex justify-between text-sm text-green-600">
                          <span>
                            Discount ({(discount * 100).toFixed(0)}%):
                          </span>
                          <span>
                            -${(selectedItemsTotal * discount).toFixed(2)}
                          </span>
                        </div>
                      )}
                      <div className="border-t pt-2">
                        <h1 className="font-semibold text-[30px] md:text-[45px] leading-[100%] tracking-[0px] align-middle text-right text-[#0054b7]">
                          {t("profile.payment.overall")} $
                          {finalTotal.toFixed(2)}
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5 justify-center mt-5">
                <input
                  type="checkbox"
                  name="agree"
                  id="agree"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                />
                <label
                  htmlFor="agree"
                  className="text-center text-xs cursor-pointer"
                >
                  {t("profile.payment.okey")}
                </label>
              </div>

              <button
                className="bg-[#007bff] text-white border-none py-2 md:py-2.5 px-4 md:px-5 rounded-[16.18px] text-sm md:text-base cursor-pointer w-full mt-5 disabled:opacity-50 disabled:cursor-not-allowed"
                type="submit"
                disabled={isProcessing || selectedItems.size === 0}
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processing...
                  </div>
                ) : (
                  `Pay $${finalTotal.toFixed(2)}`
                )}
              </button>
            </form>

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
      )} */}
    </div>
  );
};
