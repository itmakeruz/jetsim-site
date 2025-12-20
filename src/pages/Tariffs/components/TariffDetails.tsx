import { useTariffStore } from "@/store/tariffStore";
import type { Tariff, TariffDetail } from "@/types/api";
import { tariffDetails } from "@/constants";

const keyToFlag: Record<string, string> = {
  internet: "includes_internet",
  sms: "includes_sms",
  calls: "includes_minutes",
  internetSpeed: "is_5g",
};

const TariffDetails = () => {
  const { selectedTariff } = useTariffStore();
  return (
    <div className="grid md:grid-cols-2 grid-cols-4 max-md:col-span-2 md:gap-[10px] gap-1">
      {tariffDetails.map((detail: TariffDetail) => {
        const flagKey = keyToFlag[detail.key];
        const result = selectedTariff?.[flagKey as keyof Tariff];
        const IconComponent = detail.icon;
        const iconColor = result ? "white" : "currentColor";

        return (
          <div
            className={`bg-[#112D6C] md:min-w-[160px] md:rounded-[8px] rounded-[4px] px-2 h-[44px] flex gap-1 items-center ${
              result ? "text-white" : "bg-[#1978E51A]"
            }`}
            key={detail.id}
          >
            <div className="md:w-[28px] md:h-[28px] w-[20px] h-[20px] shrink-0 md:block hidden">
              <IconComponent color={iconColor} className="w-full h-full" />
            </div>
            <div className={`flex flex-col gap-[2px]`}>
              <span className="leading-none md:text-base text-[14px]">
                {detail.name}
              </span>
              <span className="leading-none md:text-xs text-[12px]">
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
