import type { RegionGroup } from "../../types/api";
import { ImagePreview } from "../ImgCards";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface SimCardProps {
  regionGroup: RegionGroup;
  activeCategory?: string | null;
}

const SimCard = ({ regionGroup, activeCategory }: SimCardProps) => {
  const toUrl = activeCategory
    ? `/tariffs/${regionGroup.id}?type=${activeCategory}`
    : `/tariffs/${regionGroup.id}`;

  return (
    <Link
      to={toUrl}
      className="group relative flex items-center gap-[10px] overflow-hidden rounded-[12px] border border-[#E8EDF2] bg-white
        px-[14px] py-[16px] transition-all duration-300 md:gap-[18px] md:px-[18px] md:py-[20px]
        shadow-[0px_4px_8.4px_0px_#AAAFB361]
        hover:-translate-y-0.5 hover:border-main-blue/45 hover:shadow-[0_14px_30px_-14px_rgba(25,120,229,0.5)]"
    >
      <ImagePreview
        src={regionGroup.image}
        alt={regionGroup.name}
        className="md:w-[62px] md:h-[62px] w-[48px] h-[48px]"
      />

      <div className="flex min-w-0 flex-col">
        <h2 className="truncate text-[15px] font-semibold text-black md:text-[18px]">
          {regionGroup.name}
        </h2>
        <span className="text-[14px] font-medium text-[#4F7096] md:text-[16px]">
          От{" "}
          <span className="font-semibold text-main-blue">
            {regionGroup?.min_price?.toLocaleString() || 0} ₽
          </span>
        </span>
      </div>

      <span
        aria-hidden="true"
        className="ml-auto flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-main-blue/[0.08] text-main-blue
          transition-all duration-300 group-hover:bg-main-blue group-hover:text-white"
      >
        <ArrowRight className="h-[18px] w-[18px] transition-transform duration-300 group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
};

export default SimCard;
