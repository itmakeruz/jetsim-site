import { useState } from "react";
import { toast } from "react-toastify";
import { formatNumber } from "@/lib/utils";
import { useAuthStore } from "@/store/authStore";
import { paymentAPI, promoCodeAPI } from "@/services/api.service";
import { APP_ROUTES } from "@/router/path";

interface PaymentFormProps {
  totalPrice: number;
}

type AppliedPromo = {
  code: string;
  discount_amount: number;
  total_amount: number;
  final_amount: number;
};

const PaymentForm = ({ totalPrice }: PaymentFormProps) => {
  const { isAuthenticated } = useAuthStore();
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [promoError, setPromoError] = useState("");
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);
  const [appliedPromo, setAppliedPromo] = useState<AppliedPromo | null>(null);

  const finalPrice = appliedPromo?.final_amount ?? totalPrice;

  const handlePromoChange = (value: string) => {
    const normalizedValue = value.toUpperCase().replace(/[^A-Z0-9]/g, "");
    setPromoCode(normalizedValue);
    setPromoError("");

    if (appliedPromo && normalizedValue !== appliedPromo.code) {
      setAppliedPromo(null);
    }
  };

  const handleApplyPromo = async () => {
    const code = promoCode.trim();

    if (!isAuthenticated) {
      toast.error("Пожалуйста, сначала войдите в систему");
      return;
    }

    if (!code) {
      setPromoError("Введите промокод");
      return;
    }

    setIsApplyingPromo(true);
    setPromoError("");

    try {
      const response = await promoCodeAPI.validate({ code });

      if (response.data.success) {
        setAppliedPromo(response.data.data);
        setPromoCode(response.data.data.code);
        toast.success(response.data.message || "Промокод применён!");
      } else {
        const message = response.data.message || "Промокод не применим";
        setAppliedPromo(null);
        setPromoError(message);
      }
    } catch (error: any) {
      const message =
        error.response?.data?.message || "Не удалось применить промокод";
      setAppliedPromo(null);
      setPromoError(message);
    } finally {
      setIsApplyingPromo(false);
    }
  };

  const handleClearPromo = () => {
    setPromoCode("");
    setPromoError("");
    setAppliedPromo(null);
  };

  const handlePayment = async () => {
    if (!agreedToTerms) {
      toast.error("Пожалуйста, согласитесь с условиями обслуживания");
      return;
    }

    if (!isAuthenticated) {
      toast.error("Пожалуйста, сначала войдите в систему");
      return;
    }

    setIsProcessingPayment(true);
    try {
      const origin = window.location.origin;
      const response = await paymentAPI.preparePayment({
        success_url: `${origin}${APP_ROUTES.THANK_YOU}`,
        failure_url: `${origin}${APP_ROUTES.PAYMENT}`,
        ...(appliedPromo ? { promo_code: appliedPromo.code } : {}),
      });
      if (response.data.success) {
        const paymentUrl = response.data.data?.payment_url;
        if (paymentUrl) {
          // Open payment URL in new tab
          window.open(paymentUrl, "_self");
        } else {
          toast.error("URL оплаты не найден");
        }
      } else {
        toast.error(response.data.message || "Не удалось подготовить платеж");
      }
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Ошибка при обработке платежа",
      );
    } finally {
      setIsProcessingPayment(false);
    }
  };

  return (
    <div className="flex flex-col gap-[26px]">
      {/* PayPal Section */}
      <div className="flex gap-3 px-4 bg-[#E1E5E85E] rounded-[10px] h-[80px] items-center">
        <img
          className="w-8 h-8"
          src="	https://cdn.tbank.ru/static/pfa-multimedia/images/33447f85-5b92-42f9-8d88-509bd152b47c.svg"
          alt=""
        />
        <span className="text-[16px] font-medium text-black">
          Оплата через T-Bank
        </span>
      </div>

      {/* Payment Info */}
      <div className="text-center space-y-2">
        <p className="text-[12px] text-[#637381] leading-[1.5]">
          100% безопасная оплата через T-Bank.
        </p>
        <p className="text-[14px] text-[#637381] leading-[1.5]">
          Это единоразовый, НЕПОВТОРЯЮЩИЙСЯ платёж. Если вам нужно пополнить
          баланс eSIM, инструкции вы найдёте в письме об активации.
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="font-bold">Промокод</h2>
        <div className="flex items-center gap-2 border border-[#DDE1EA] p-1 rounded-md">
          <input
            className="w-full font-bold px-3 py-2 outline-none"
            type="text"
            value={promoCode}
            onChange={(e) => handlePromoChange(e.target.value)}
            placeholder="Введите промокод"
            minLength={4}
            maxLength={32}
          />
          {appliedPromo ? (
            <button
              type="button"
              onClick={handleClearPromo}
              className="bg-[#E1E5E85E] text-[#112D6C] font-medium px-3 py-2 rounded-md"
            >
              Убрать
            </button>
          ) : (
            <button
              type="button"
              onClick={handleApplyPromo}
              disabled={!promoCode.trim() || isApplyingPromo}
              className="bg-[#112D6C] text-white disabled:opacity-50 font-medium px-3 py-2 rounded-md"
            >
              {isApplyingPromo ? "Проверка..." : "Применить"}
            </button>
          )}
        </div>
        {promoError && (
          <p className="text-[12px] leading-[1.3] text-red-500">
            {promoError}
          </p>
        )}
        {appliedPromo && (
          <div className="flex flex-col gap-2 rounded-md border border-[#DDE1EA] bg-[#F8FAFC] p-3 text-[14px]">
            <div className="flex justify-between gap-3 text-[#637381]">
              <span>Сумма</span>
              <span>{formatNumber(appliedPromo.total_amount)}₽</span>
            </div>
            <div className="flex justify-between gap-3 text-green-700">
              <span>Скидка</span>
              <span>-{formatNumber(appliedPromo.discount_amount)}₽</span>
            </div>
            <div className="flex justify-between gap-3 font-bold text-[#112D6C]">
              <span>К оплате</span>
              <span>{formatNumber(appliedPromo.final_amount)}₽</span>
            </div>
          </div>
        )}
      </div>
      {/* Terms and Conditions */}
      <label className="flex items-start gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={agreedToTerms}
          onChange={(e) => setAgreedToTerms(e.target.checked)}
          className="mt-1 w-4 h-4 text-[#112D6C] border-gray-300 rounded focus:ring-[#112D6C]"
        />
        <span className="text-[12px] text-[#4F7096] leading-[1.3]">
          Я согласен с условиями обслуживания, я подтвердил, что мое устройство
          совместимо с eSIM, и я согласен с Политикой возврата средств.
        </span>
      </label>

      {/* Pay Button - only show if authenticated */}
      {
        <button
          title={
            !isAuthenticated
              ? "Чтобы перейти к оплате, пожалуйста, войдите в свой аккаунт."
              : ""
          }
          onClick={handlePayment}
          disabled={!agreedToTerms || isProcessingPayment || !isAuthenticated}
          className="bg-[#112D6C] disabled:cursor-not-allowed! h-[54px] w-full rounded-[8px] text-[16px] font-medium text-white disabled:cursor-not-allowed! disabled:opacity-50 hover:bg-[#0f2659] transition-colors"
        >
          {isProcessingPayment
            ? "Обработка..."
            : `Оплатить сейчас ${formatNumber(finalPrice)}₽`}
        </button>
      }
    </div>
  );
};

export default PaymentForm;
