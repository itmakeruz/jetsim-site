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
    <div className="flex flex-col md:gap-3 gap-2 w-full">
      <span className="text-black font-semibold md:text-[14px] text-[12px] leading-none md:block hidden">
        Количество eSIM
      </span>

      <div className="flex gap-2 h-[40px] py-2 px-2 items-center font-semibold justify-between bg-[#E8EBEE] md:rounded-[8px] rounded-[4px]">
        <button
          disabled={selectedTariffData?.quantity ? false : true}
          onClick={handleDecrease}
          className="md:w-[24px] md:h-[24px] w-[20px] h-[20px] md:text-[22px] text-[18px] flex items-center justify-center hover:bg-[#B4BDC8] rounded disabled:opacity-20 disabled:cursor-not-allowed!"
        >
          -
        </button>
        <div className="w-[1px] bg-[#B4BDC8] self-stretch"></div>
        <span className="md:w-[40px] w-[30px] text-center leading-none md:text-[18px] text-[16px]">
          {selectedTariffData?.quantity || 0}
        </span>
        <div className="w-[1px] bg-[#B4BDC8] self-stretch"></div>
        <button
          onClick={handleIncrease}
          className="md:w-[24px] w-[20px] md:h-[24px] h-[20px] md:text-[22px] text-[18px] flex items-center justify-center hover:bg-[#B4BDC8] rounded"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default ESIMCounter;
