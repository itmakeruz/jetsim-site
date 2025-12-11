import { useState } from "react";
import { useTariffStore } from "@/store/tariffStore";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "@/router/path";
import { ArrowLeft } from "lucide-react";
import { ImagePreview } from "@/components/ImgCards";
import type { cartTariff } from "@/types/api";

const PaymentPage = () => {
  const { selectedTariffs, increaseQuantity, decreaseQuantity } =
    useTariffStore();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState<"card" | "paypal">("card");
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);

  const total = selectedTariffs.reduce(
    (sum, tariff) => sum + (tariff.price_sell || 0) * (tariff.quantity || 1),
    0
  );

  const handleIncrease = async (tariff: cartTariff) => {
    await increaseQuantity(tariff);
  };

  const handleDecrease = async (tariff: cartTariff) => {
    await decreaseQuantity(tariff);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="container py-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate(APP_ROUTES.CART)}
            className="w-10 h-10 rounded-full bg-[#112D6C] flex items-center justify-center text-white hover:bg-[#0e2458] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-3xl font-bold text-black">Оплата</h1>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Payment Methods */}
            <div>
              <h2 className="text-xl font-bold mb-6">Способ оплаты</h2>

              {/* Debit Card Option */}
              <div className="mb-6">
                <label className="flex items-center gap-3 mb-4 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "card"}
                    onChange={() => setPaymentMethod("card")}
                    className="w-5 h-5 text-[#112D6C]"
                  />
                  <span className="text-lg font-semibold">DebitCard</span>
                </label>

                {paymentMethod === "card" && (
                  <div className="space-y-4 pl-8">
                    <input
                      type="text"
                      placeholder="card number"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#112D6C]"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="cvv"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        maxLength={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#112D6C]"
                      />
                      <input
                        type="text"
                        placeholder="mm/yyyy"
                        value={expiry}
                        onChange={(e) => setExpiry(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#112D6C]"
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="CardHolder name"
                      value={cardHolder}
                      onChange={(e) => setCardHolder(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#112D6C]"
                    />
                  </div>
                )}
              </div>

              {/* PayPal Option */}
              <div>
                <label className="flex items-center gap-3 cursor-pointer border border-gray-300 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "paypal"}
                    onChange={() => setPaymentMethod("paypal")}
                    className="w-5 h-5 text-[#112D6C]"
                  />
                  <span className="text-lg font-semibold">PayPal</span>
                  <div className="ml-auto">
                    <img
                      src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_111x69.jpg"
                      alt="PayPal"
                      className="h-8"
                    />
                  </div>
                </label>
              </div>
            </div>

            {/* Right Column - Order Summary */}
            <div>
              <h2 className="text-xl font-bold mb-6">Заказ</h2>
              <div className="max-h-[500px] overflow-y-auto pr-2 space-y-4">
                {selectedTariffs.map((tariff: cartTariff) => (
                  <div
                    key={tariff.id}
                    className="bg-white border border-gray-200 rounded-lg p-4"
                  >
                    {/* Country Header */}
                    <div className="flex items-center gap-2 mb-3">
                      <ImagePreview
                        src={tariff.image}
                        alt={tariff.name}
                        width={24}
                        height={16}
                        rounded={false}
                      />
                      <span className="font-semibold text-lg">
                        {tariff.name}
                      </span>
                    </div>

                    {/* Tariff Details */}
                    <div className="space-y-1 text-sm mb-3">
                      <p>
                        Трафик:{" "}
                        <span className="font-bold">
                          {tariff.quantity_internet.toLocaleString()}мб
                        </span>
                      </p>
                      <p>
                        Срок действия:{" "}
                        <span className="font-bold">
                          {tariff.validity_period} дней
                        </span>
                      </p>
                      <p>
                        Сеть:{" "}
                        <span className="font-bold">
                          {tariff.is_4g ? "4G" : ""}
                          {tariff.is_4g && tariff.is_5g ? ", " : ""}
                          {tariff.is_5g ? "5G" : ""}
                        </span>
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-xs">Зона покрытия:</span>
                        <div className="flex items-center gap-1">
                          {tariff.regions?.slice(0, 4).map((region, idx) => (
                            <ImagePreview
                              key={idx}
                              src={region.image}
                              alt={region.name}
                              width={20}
                              height={16}
                              rounded={false}
                            />
                          ))}
                          {tariff.regions && tariff.regions.length > 4 && (
                            <span className="text-xs text-blue-600 ml-1">
                              +{tariff.regions.length - 4}
                            </span>
                          )}
                        </div>
                        <button className="text-xs text-blue-600 hover:underline ml-2">
                          Подробнее
                        </button>
                      </div>
                    </div>

                    {/* Plan Type and Quantity */}
                    <div className="flex items-center gap-2">
                      <div className="bg-[#112D6C] text-white px-4 py-2 rounded-lg font-semibold flex-1 text-center">
                        {tariff?.name || "Стандарт"}
                      </div>
                      <div className="flex items-center gap-2 bg-gray-800 text-white rounded-lg px-3 py-2">
                        <button
                          onClick={() => handleDecrease(tariff)}
                          className="w-6 h-6 flex items-center justify-center hover:bg-gray-700 rounded transition-colors"
                        >
                          <span className="text-lg">-</span>
                        </button>
                        <span className="w-8 text-center font-medium">
                          {tariff.quantity || 1}
                        </span>
                        <button
                          onClick={() => handleIncrease(tariff)}
                          className="w-6 h-6 flex items-center justify-center hover:bg-gray-700 rounded transition-colors"
                        >
                          <span className="text-lg">+</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Promo Code Section */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex items-center gap-4">
              <label className="text-sm font-semibold whitespace-nowrap">
                Промокод:
              </label>
              <input
                type="text"
                placeholder="Код купона"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#112D6C]"
              />
              <button className="px-6 py-2 bg-[#112D6C] text-white rounded-lg hover:bg-[#0e2458] transition-colors font-semibold">
                Применить
              </button>
            </div>
          </div>

          {/* Total */}
          <div className="mt-6">
            <div className="text-right">
              <span className="text-2xl font-bold text-[#112D6C]">
                Итого: {total.toLocaleString()} ₽
              </span>
            </div>
          </div>

          {/* Terms Checkbox */}
          <div className="mt-6 flex items-start gap-3">
            <input
              type="checkbox"
              id="agreeTerms"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="mt-1 w-5 h-5 text-[#112D6C] rounded"
            />
            <label htmlFor="agreeTerms" className="text-sm text-gray-700">
              Согласен с{" "}
              <a
                href={APP_ROUTES.CONFIDENTIAL}
                className="text-blue-600 hover:underline"
              >
                "Политикой конфиденциальности"
              </a>{" "}
              и с{" "}
              <a
                href={APP_ROUTES.USLOVIYA}
                className="text-blue-600 hover:underline"
              >
                "Условиями использования"
              </a>
            </label>
          </div>

          {/* Pay Button */}
          <div className="mt-8">
            <button
              disabled={!agreeTerms || selectedTariffs.length === 0}
              className="w-full bg-[#112D6C] text-white py-4 rounded-lg font-bold text-lg hover:bg-[#0e2458] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Оплатить
            </button>
          </div>

          {/* Footer Links */}
          <div className="mt-8 pt-6 border-t border-gray-200 flex flex-wrap gap-4 justify-center text-sm text-gray-500">
            <a
              href={APP_ROUTES.OFERTA}
              className="hover:text-[#112D6C] transition-colors"
            >
              Пользовательское соглашение
            </a>
            <a
              href={APP_ROUTES.CONFIDENTIAL}
              className="hover:text-[#112D6C] transition-colors"
            >
              Политика конфиденциальности
            </a>
            <a
              href={APP_ROUTES.RULE}
              className="hover:text-[#112D6C] transition-colors"
            >
              Правила оплаты
            </a>
            <a
              href={APP_ROUTES.USLOVIYA}
              className="hover:text-[#112D6C] transition-colors"
            >
              Условия использования
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
