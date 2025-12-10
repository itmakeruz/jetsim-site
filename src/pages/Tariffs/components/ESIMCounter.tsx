import { useTariffStore } from "@/store/tariffStore";
import { useQueryClient } from "@tanstack/react-query";

const ESIMCounter = () => {
  const {
    selectedTariff,
    selectedTariffs,
    increaseQuantity,
    decreaseQuantity,
  } = useTariffStore();
  const queryClient = useQueryClient();

  const selectedTariffData = selectedTariffs.find(
    (t) => t.id === selectedTariff?.id
  );

  const handleIncrease = async () => {
    if (selectedTariff) {
      await increaseQuantity(selectedTariff);
      queryClient.invalidateQueries({ queryKey: ["cartItems"] });
    }
  };

  const handleDecrease = async () => {
    if (selectedTariff) {
      await decreaseQuantity(selectedTariff);
      queryClient.invalidateQueries({ queryKey: ["cartItems"] });
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <span className="text-black font-semibold text-[14px] leading-none">
        Количество eSIM
      </span>

      <div className="flex gap-2 h-[40px] py-2 px-2 items-center font-semibold justify-center bg-[#E8EBEE] rounded-[8px]">
        <button
          disabled={selectedTariffData?.quantity ? false : true}
          onClick={handleDecrease}
          className="w-[24px] h-[24px] text-[22px] flex items-center justify-center hover:bg-[#B4BDC8] rounded disabled:opacity-20 disabled:cursor-not-allowed!"
        >
          -
        </button>
        <div className="w-[1px] bg-[#B4BDC8] self-stretch"></div>
        <span className="w-[40px] text-center leading-none text-[18px]">
          {selectedTariffData?.quantity || 0}
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
