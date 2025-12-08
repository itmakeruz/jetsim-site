import { ASSETS } from "@/assets";
import type { Region } from "@/types/api";
import { useNavigate } from "react-router-dom";
import { useTariffStore } from "@/store/tariffStore";

function SingleRegionHead({ regions }: { regions: Region[] }) {
  const navigate = useNavigate();
  const { setSelectedTariff, setSelectedTariffs } = useTariffStore();
  return (
    <div className="flex items-center justify-between mb-[26px]">
      <button
        onClick={() => {
          navigate(-1);
          setSelectedTariff(null);
          setSelectedTariffs([]);
        }}
        className="flex items-center gap-[15px]"
      >
        <div className="w-[50px] h-[50px] flex items-center justify-center rounded-full bg-[#E8EDF2]">
          <img
            src={ASSETS.backArrow}
            alt="back"
            className="translate-x-[-1px]"
            width="13"
            height="22"
          />
        </div>
        <h1 className="text-[30px] font-bold text-[#0D141C]">
          {regions.map((region) => region.name).join(", ")}
        </h1>
      </button>
      <button className="flex flex-col items-center gap-[6px] max-w-[150px]">
        <div className="w-[40px] h-[40px] flex items-center justify-center rounded-full bg-[#E8EDF2]">
          <img
            src={ASSETS.questionMark}
            alt="question"
            width="25"
            height="25"
          />
        </div>
        <span className="text-sm font-medium text-[#4F7096] leading-[1.1]">
          Как работают пакеты JetSim eSIM
        </span>
      </button>
    </div>
  );
}

export default SingleRegionHead;
