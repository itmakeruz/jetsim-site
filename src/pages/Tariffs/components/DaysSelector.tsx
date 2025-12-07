interface DaysSelectorProps {
  days: number;
  onDaysChange?: (days: number) => void;
}

const DaysSelector = ({ days, onDaysChange }: DaysSelectorProps) => {
  return (
    <div className="flex flex-col gap-3">
      <span className="text-black font-semibold text-[14px] leading-none">
        Количество дней
      </span>
      <div className="bg-[#E8EBEE] text-[18px] font-semibold rounded-[8px] h-[40px] flex items-center justify-center w-[130px]">
        {days}
      </div>
    </div>
  );
};

export default DaysSelector;
