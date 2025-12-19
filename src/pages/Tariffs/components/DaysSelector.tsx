import { useTariffStore } from "@/store/tariffStore";

const DaysSelector = () => {
  const { selectedTariff } = useTariffStore();

  return (
    <div className="md:flex hidden flex-col gap-3 w-full">
      <span className="text-black font-semibold md:text-[14px] text-[12px] leading-none">
        Количество дней
      </span>
      <div className="bg-[#E8EBEE] md:text-[18px] text-[16px] font-semibold rounded-[8px] md:h-[40px] h-[30px] flex items-center justify-center md:w-[130px] w-full">
        {selectedTariff?.validity_period}
      </div>
    </div>
  );
};

export default DaysSelector;
