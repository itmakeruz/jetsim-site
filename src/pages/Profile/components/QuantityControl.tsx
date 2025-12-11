import { Minus, Plus } from "lucide-react";
import TotalAmount from "./TotalAmount";

interface QuantityControlProps {
  count: number;
  onIncrease?: () => void;
  onDecrease?: () => void;
  totalAmount: number;
}

const QuantityControl: React.FC<QuantityControlProps> = ({
  count,
  onIncrease,
  onDecrease,
  totalAmount,
}) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center justify-between bg-[#4F709633] rounded-[8px] h-[34px] w-[150px] py-1 px-[6px]">
        <button
          onClick={onDecrease}
          className="flex items-center justify-center w-[26px] h-[26px] bg-[#ffffff] text-black rounded-[8px] transition-colors hover:text-white hover:bg-[#000000]"
        >
          <Minus className="w-3 h-3" />
        </button>

        <span className="text-sm font-medium text-black">
          {count}
        </span>

        <button
          onClick={onIncrease}
          className="flex items-center justify-center w-[26px] h-[26px] bg-[#ffffff] text-black rounded-[8px] transition-colors hover:text-white hover:bg-[#000000]"
        >
          <Plus className="w-3 h-3" />
        </button>
      </div>
      <TotalAmount amount={totalAmount} />
    </div>
  );
};

export default QuantityControl;
