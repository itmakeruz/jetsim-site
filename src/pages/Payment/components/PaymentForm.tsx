import { useState } from "react";
import { toast } from "react-toastify";
import { formatNumber } from "@/lib/utils";
import { useAuthStore } from "@/store/authStore";
import { paymentAPI } from "@/services/api.service";

interface PaymentFormProps {
  totalPrice: number;
}

const PaymentForm = ({ totalPrice }: PaymentFormProps) => {
  const { isAuthenticated } = useAuthStore();
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

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
      const response = await paymentAPI.preparePayment();
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
        error.response?.data?.message || "Ошибка при обработке платежа"
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
            : `Оплатить сейчас ${formatNumber(totalPrice)}₽`}
        </button>
      }
    </div>
  );
};

export default PaymentForm;
