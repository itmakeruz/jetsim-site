import { ArrowRight } from "lucide-react";

interface OrderButtonProps {
  onClick?: () => void;
  disabled?: boolean;
}

const OrderButton = ({ onClick, disabled }: OrderButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="flex items-center justify-center rounded gap-2 px-10 bg-[#112D6C] text-white font-bold text-[28px] disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Оформить заказ <ArrowRight className="w-7 h-7" />
    </button>
  );
};

export default OrderButton;
