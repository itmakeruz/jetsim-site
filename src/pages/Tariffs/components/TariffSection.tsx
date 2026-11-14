import TariffCard from "./TariffCard";
import type { Tariff } from "@/types/api";
import { splitTariffs } from "@/lib/tariffKind";

interface TariffSectionProps {
  title: string;
  tariffs: Tariff[];
}

export default function TariffSection({ title, tariffs }: TariffSectionProps) {
  if (!tariffs || tariffs.length === 0) {
    return null;
  }

  const { limited, unlimited } = splitTariffs(tariffs);

  return (
    <div className="flex flex-col gap-[15px]">
      <h2 className="text-[#4F7096] md:text-[30px] text-[24px] font-bold leading-none">
        {title}
      </h2>
      <div className="w-full h-[1px] bg-[#4F7096]"></div>
      {limited.length > 0 && <TariffGroup label="С пакетом трафика" tariffs={limited} showLabel={unlimited.length > 0} />}
      {unlimited.length > 0 && <TariffGroup label="∞ Безлимитные" tariffs={unlimited} showLabel={limited.length > 0} />}
    </div>
  );
}

// Подзаголовок показываем, только когда в разделе есть оба вида тарифов
function TariffGroup({ label, tariffs, showLabel }: { label: string; tariffs: Tariff[]; showLabel: boolean }) {
  return (
    <div className="flex flex-col gap-3">
      {showLabel && (
        <h3 className="text-[13px] font-semibold uppercase tracking-wide text-[#4F7096] md:text-[15px]">{label}</h3>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 2xl:gap-5 gap-4">
        {tariffs.map((tariff) => (
          <TariffCard key={tariff.id} tariff={tariff} />
        ))}
      </div>
    </div>
  );
}
