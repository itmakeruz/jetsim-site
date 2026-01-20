import type { RegionGroup } from "../../types/api";
import { ImagePreview } from "../ImgCards";
import { Link } from "react-router-dom";
import { ASSETS } from "@/assets";

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
      className="shadow-[0px_4px_8.4px_0px_#AAAFB361] bg-white z-1 group overflow-hidden relative border border-[#E8EDF2] md:rounded-[12px] rounded-[8px] md:px-[18px] px-[10px] md:py-[27px] py-[18px]"
    >
      <div className="flex items-center md:gap-[18px] gap-[10px]">
        <ImagePreview
          src={regionGroup.image}
          alt={regionGroup.name}
          className="md:w-[66px] md:h-[66px] w-[50px] h-[50px]"
        />
        <div className="flex flex-col">
          <h2 className="md:text-[18px] text-[14px] font-semibold text-black">
            {regionGroup.name}
          </h2>
          <span className="md:text-[16px] text-[14px] text-[#4F7096] font-medium">
            От {regionGroup?.min_price?.toLocaleString() || 0} ₽
          </span>
        </div>
        <div className="absolute right-0 bottom-0">
          <div className="relative">
            <img
              src={ASSETS.waveSvg}
              alt=""
              width={138}
              height={35}
              className="block"
            />
            <div className="absolute translate-x-[-50%] right-0 bottom-0 translate-y-[-50%]">
              <img
                src={ASSETS.arrowSvg}
                alt=""
                width={22}
                height={12}
                className="block"
              />
            </div>
          </div>
        </div>
        <div className="absolute z-[-1] bottom-0 right-0 group-hover:scale-[1.5] bg-[#F0F0FB] transition-all duration-500 w-0 h-0 group-hover:w-full group-hover:h-full"></div>
      </div>
    </Link>
  );
};

export default SimCard;
