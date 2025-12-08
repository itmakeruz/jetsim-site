import { getImageUrl } from "@/config/imageUtils";

interface Region {
  image: string;
  name: string;
}

interface CoverageZoneProps {
  regions: Region[];
  isOpen: boolean;
  onToggle: () => void;
  dropdownRef: (el: HTMLDivElement | null) => void;
}

const CoverageZone: React.FC<CoverageZoneProps> = ({
  regions,
  isOpen,
  onToggle,
  dropdownRef,
}) => {
  return (
    <div className="w-full flex items-center gap-2">
      <p className="text-[12px]">Зона покрытия:</p>
      <div className="relative flex h-[20px]" ref={dropdownRef}>
        {regions.slice(0, 4).map((region, index) => (
          <img
            className="mr-[-5px] h-[20px] w-[24px] object-cover rounded-[2px] outline-[1px] outline-[rgb(0,0,0,0.1)] outline-offset-[-1px]"
            src={getImageUrl(region.image)}
            alt={region.name}
            key={index}
          />
        ))}
        <button
          className="text-[14px] leading-[1.2] bg-[#112D6C] text-white min-w-[95px] rounded-r-[10px] rounded-l-[2px]"
          onClick={onToggle}
        >
          Подробнее
        </button>
        {isOpen && (
          <div className="absolute top-full left-0 mt-1 rounded-[20px] p-2 z-50 min-w-[300px] max-h-[300px] overflow-y-auto bg-[#EFF6FF] flex flex-wrap gap-1">
            {regions.map((region, index) => (
              <div
                key={index}
                className="flex items-center gap-2 p-2 bg-main-blue rounded-[20px] w-max"
              >
                <img
                  className="h-4 w-5 object-cover rounded-sm"
                  src={getImageUrl(region.image)}
                  alt={region.name}
                />
                <span className="text-xs text-white font-normal">
                  {region.name}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CoverageZone;
