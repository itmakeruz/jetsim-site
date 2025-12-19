import TariffDetails from "./TariffDetails";
import DaysSelector from "./DaysSelector";
import ESIMCounter from "./ESIMCounter";
import OrderButton from "./OrderButton";

const TariffBottomBar = () => {
  return (
    <div className="fixed z-[100] py-3 left-0 right-0 bottom-0 bg-white shadow-[0px_-6px_20px_#4F709633] border-t-[0.5px] border-[#E8EDF2]">
      <div className="container grid md:grid-cols-[auto_auto_1fr] grid-cols-[1fr_auto] md:gap-5 gap-3">
        <TariffDetails />
        <div className="md:border-2 border-[#112D6C] rounded-[8px] flex items-center md:gap-5 gap-3 md:px-5 px-0 py-0">
          <DaysSelector />
          <ESIMCounter />
        </div>
        <OrderButton />
      </div>
    </div>
  );
};

export default TariffBottomBar;
