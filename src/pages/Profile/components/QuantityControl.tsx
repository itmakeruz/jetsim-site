import { Minus, Plus } from "lucide-react";

interface QuantityControlProps {
  count: number;
  onIncrease?: () => void;
  onDecrease?: () => void;
}

const QuantityControl: React.FC<QuantityControlProps> = ({
  count,
  onIncrease,
  onDecrease,
}) => {
  return (
    <div className="flex w-full border-[2px] items-center border-[#112D6C] bg-[#112D6C] rounded-[10px] overflow-hidden">
      <div className="bg-white rounded-l-[8px] w-full py-1 px-2 text-[20px] font-medium hover:bg-gray-50 transition-colors">
        Количество
      </div>

      <div className="flex items-center gap-2 bg-[#112D6C] rounded-lg px-4 py-2">
        <button
          onClick={onDecrease}
          className="flex items-center justify-center w-6 h-6 bg-[#FFFFFF4D] text-white rounded-full transition-colors hover:bg-[#FFFFFF66]"
        >
          <Minus className="w-3 h-3" />
        </button>

        <span className="flex items-center justify-center w-8 h-6 text-sm font-medium text-white">
          {count}
        </span>

        <button
          onClick={onIncrease}
          className="flex items-center justify-center w-6 h-6 bg-[#FFFFFF4D] text-white rounded-full transition-colors hover:bg-[#FFFFFF66]"
        >
          <Plus className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};

export default QuantityControl;
