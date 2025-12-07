import { useState } from "react";

interface ESIMCounterProps {
  initialValue?: number;
  onCountChange?: (count: number) => void;
}

const ESIMCounter = ({ initialValue = 1, onCountChange }: ESIMCounterProps) => {
  const [count, setCount] = useState(initialValue);

  const handleDecrease = () => {
    if (count > 1) {
      const newCount = count - 1;
      setCount(newCount);
      onCountChange?.(newCount);
    }
  };

  const handleIncrease = () => {
    const newCount = count + 1;
    setCount(newCount);
    onCountChange?.(newCount);
  };

  return (
    <div className="flex flex-col gap-3">
      <span className="text-black font-semibold text-[14px] leading-none">
        Количество eSIM
      </span>
      <div className="flex gap-2 h-[40px] py-2 px-2 items-center font-semibold justify-center bg-[#E8EBEE] rounded-[8px]">
        <button
          onClick={handleDecrease}
          className="w-[24px] h-[24px] text-[22px] flex items-center justify-center hover:bg-[#B4BDC8] rounded"
        >
          -
        </button>
        <div className="w-[1px] bg-[#B4BDC8] self-stretch"></div>
        <span className="w-[40px] text-center leading-none text-[18px]">
          {count}
        </span>
        <div className="w-[1px] bg-[#B4BDC8] self-stretch"></div>
        <button
          onClick={handleIncrease}
          className="w-[24px] h-[24px] text-[22px] flex items-center justify-center hover:bg-[#B4BDC8] rounded"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default ESIMCounter;
