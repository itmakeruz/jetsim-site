import type { RegionGroup } from "../../types/api";
import { ImagePreview } from "../ImgCards";
import { Link } from "react-router-dom";
import { ASSETS } from "@/assets";

interface SimCardProps {
  regionGroup: RegionGroup;
}

const SimCard = ({ regionGroup }: SimCardProps) => {
  return (
    <Link
      to={`/tariffs/${regionGroup.id}`}
      className="shadow-[0px_4px_8.4px_0px_#AAAFB361] bg-white z-1 group overflow-hidden relative border border-[#E8EDF2] rounded-[12px] px-[18px] py-[27px]"
    >
      <div className="flex items-center gap-[18px]">
        <ImagePreview
          src={regionGroup.image}
          alt={regionGroup.name}
          width={66}
          height={66}
        />
        <div className="flex flex-col">
          <h2 className="text-[18px] font-semibold text-black">
            {regionGroup.name}
          </h2>
          <span className="text-[16px] text-[#4F7096] font-medium">
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
