import { useTariffStore } from "@/store/tariffStore";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "@/router/path";
import { ArrowRight } from "lucide-react";

const OrderButton = () => {
  const { selectedTariff, selectedTariffs } = useTariffStore();
  const navigate = useNavigate();
  const selectedTariffData = selectedTariffs.find(
    (t) => t.id === selectedTariff?.id
  );

  const handleOrderClick = async () => {
    if (!selectedTariffData || selectedTariffData.quantity === 0) return;

    try {
      // Payment page'ga o'tish
      navigate(APP_ROUTES.PAYMENT);
    } catch (error) {
      console.error("Error navigating to payment:", error);
    }
  };
  const disabled = selectedTariffs.length === 0;
  console.log(selectedTariffs);

  return (
    <button
      onClick={handleOrderClick}
      disabled={disabled}
      className="flex items-center justify-center rounded gap-2 md:px-10 px-5 bg-[#112D6C] text-white font-bold md:text-[28px] text-base disabled:opacity-50 disabled:cursor-not-allowed! duration-300"
    >
      Оформить заказ <ArrowRight className="w-7 h-7 hidden md:block" />
    </button>
  );
};

export default OrderButton;
