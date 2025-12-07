import type { TariffDetail } from "@/types/api";
import TariffDetails from "./TariffDetails";
import DaysSelector from "./DaysSelector";
import ESIMCounter from "./ESIMCounter";
import OrderButton from "./OrderButton";

interface TariffBottomBarProps {
  tariffDetails: TariffDetail[];
  days?: number;
  onDaysChange?: (days: number) => void;
  onESIMCountChange?: (count: number) => void;
  onOrderClick?: () => void;
}

const TariffBottomBar = ({
  tariffDetails,
  days = 15,
  onDaysChange,
  onESIMCountChange,
  onOrderClick,
}: TariffBottomBarProps) => {
  return (
    <div className="fixed z-1 py-3 left-0 right-0 bottom-0 bg-white shadow-[0px_-6px_20px_#4F709633] border-t-[0.5px] border-[#E8EDF2]">
      <div className="container grid grid-cols-[auto_auto_1fr] gap-5">
        <TariffDetails details={tariffDetails} />
        <div className="border-2 border-[#112D6C] rounded-[8px] flex items-center gap-5 px-5 py-2">
          <DaysSelector days={days} onDaysChange={onDaysChange} />
          <ESIMCounter onCountChange={onESIMCountChange} />
        </div>
        <OrderButton onClick={onOrderClick} />
      </div>
    </div>
  );
};

export default TariffBottomBar;
