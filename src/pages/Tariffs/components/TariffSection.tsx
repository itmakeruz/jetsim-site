import TariffCard from "./TariffCard";
import type { Tariff } from "@/types/api";

interface TariffSectionProps {
  title: string;
  tariffs: Tariff[];
}

export default function TariffSection({ title, tariffs }: TariffSectionProps) {
  if (!tariffs || tariffs.length === 0) {
    return null;
  }
  console.log(tariffs);

  return (
    <div className="flex flex-col gap-[15px]">
      <h2 className="text-[#4F7096] text-[30px] font-bold leading-none">
        {title}
      </h2>
      <div className="w-full h-[1px] bg-[#4F7096]"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {tariffs.map((tariff) => (
          <TariffCard key={tariff.id} tariff={tariff} />
        ))}
      </div>
    </div>
  );
}
