import { useTariffStore } from "@/store/tariffStore";

const ESIMCounter = () => {
  const {
    selectedTariff,
    selectedTariffs,
    setSelectedTariffs,
    setSelectedTariff,
  } = useTariffStore();

  const selectedTariffData = selectedTariffs.find(
    (t) => t.id === selectedTariff?.id
  );

  const handleDecrease = () => {
    if (!selectedTariffData) return;

    if (selectedTariffData.count > 1) {
      const updated = selectedTariffs.map((t) =>
        t.id === selectedTariffData.id ? { ...t, count: t.count - 1 } : t
      );

      setSelectedTariffs(updated);

      setSelectedTariff({
        ...selectedTariffData,
        count: selectedTariffData.count - 1,
      });
    } else {
      setSelectedTariffs(
        selectedTariffs.filter((t) => t.id !== selectedTariffData.id)
      );
      setSelectedTariff(null);
    }
  };

  const handleIncrease = () => {
    if (!selectedTariff) return;

    const exists = selectedTariffs.find((t) => t.id === selectedTariff.id);

    if (exists) {
      const updated = selectedTariffs.map((t) =>
        t.id === selectedTariff.id ? { ...t, count: t.count + 1 } : t
      );

      setSelectedTariffs(updated);

      setSelectedTariff({ ...exists, count: exists.count + 1 });
    } else {
      setSelectedTariffs([...selectedTariffs, { ...selectedTariff, count: 1 }]);
      setSelectedTariff({ ...selectedTariff, count: 1 });
    }
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
          {selectedTariffData?.count || 0}
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
