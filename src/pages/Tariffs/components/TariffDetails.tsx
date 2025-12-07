import { useTariffStore } from "@/store/tariffStore";
import type { Tariff, TariffDetail } from "@/types/api";

interface TariffDetailsProps {
  details: TariffDetail[];
}
const keyToFlag: Record<string, string> = {
  internet: "includes_internet",
  sms: "includes_sms",
  calls: "includes_minutes",
  internetSpeed: "is_5g",
};
const TariffDetails = ({ details }: TariffDetailsProps) => {
  const { selectedTariff } = useTariffStore();
  return (
    <div className="grid grid-cols-2 gap-[10px]">
      {details.map((detail: TariffDetail) => {
        const flagKey = keyToFlag[detail.key];
        const result = selectedTariff?.[flagKey as keyof Tariff];
        return (
          <div
            className="bg-[#112D6C] min-w-[160px] text-white rounded-[8px] px-2 h-[44px] flex gap-2 items-center"
            key={detail.id}
          >
            <img
              className="w-[28px] h-[28px] object-contain shrink-0"
              src={detail.icon}
              alt={detail.name}
            />
            <div className="flex flex-col gap-[2px]">
              <span className="leading-none text-base">{detail.name}</span>
              <span className="leading-none text-xs">
                {" "}
                {result ? "Есть" : "Нет"}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TariffDetails;
