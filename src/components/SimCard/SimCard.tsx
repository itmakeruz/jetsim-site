import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Plus } from "lucide-react";
import { getImageUrl } from "../../config/imageUtils";
import { useCart } from "../../context/CartContext";
import type { Region, Tariff } from "../../types/api";

interface SimCardProps {
  region: Region;
}

const SimCard = ({ region }: SimCardProps) => {
  const { t } = useTranslation();
  const { addToCart } = useCart();
  const [openDropdowns, setOpenDropdowns] = useState<{
    [key: string]: boolean;
  }>({});
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const handlePlusClick = async (tariff: Tariff) => {
    await addToCart(region, tariff);
  };

  const toggleDropdown = (planId: number) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [planId]: !prev[planId],
    }));
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      Object.keys(openDropdowns).forEach((planId) => {
        if (openDropdowns[planId] && dropdownRefs.current[planId]) {
          if (!dropdownRefs.current[planId]?.contains(event.target as Node)) {
            setOpenDropdowns((prev) => ({
              ...prev,
              [planId]: false,
            }));
          }
        }
      });
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openDropdowns]);

  return (
    <div className="grid grid-cols-[125px_1fr] items-center gap-[10px]">
      <div className="flex flex-col gap-[10px]">
        <div className="w-[40px]">
          <img
            className="w-full h-full object-contain rounded-[2px] outline-[1px] outline-[rgb(0,0,0,0.1)] outline-offset-[-1px]"
            src={getImageUrl(region.image)}
            alt=""
          />
        </div>
        <div className="text-lg font-medium">{region.name}</div>
      </div>
      <div className="grid grid-cols-3 gap-[10px]">
        {region.tariffs?.slice(0, 3)?.map((tariff: Tariff, index: number) => (
          <div
            key={index}
            className="flex flex-col gap-[8px] p-5 border border-[#0000004D] rounded-[10px] text-[14px]"
          >
            <div className="flex w-full border-[2px] items-center border-main-blue bg-main-blue rounded-[10px] overflow-hidden">
              <h3 className="bg-white rounded-l-[8px] w-full py-1 px-2 text-[20px] font-medium">
                {tariff?.type?.name}
              </h3>
              <button
                className="w-[100px] flex items-center justify-center"
                onClick={() => handlePlusClick(tariff)}
              >
                <span className="flex items-center justify-center bg-[#FFFFFF4D] rounded-full w-[22px] h-[22px]">
                  <Plus className="w-4 text-white" />
                </span>
              </button>
            </div>
            <p>
              {t("sims.trafic")}{" "}
              <span className="font-bold">
                {tariff.quantity_internet.toLocaleString()} мб
              </span>
            </p>
            <p>
              {t("sims.srok")}{" "}
              <span className="font-bold">{tariff.validity_period} дней</span>
            </p>
            <p>
              {t("sims.set")}
              <span className="font-bold">
                {" "}
                {tariff.is_4g ? "4G" : ""} {tariff.is_5g ? "5G" : ""}
              </span>
            </p>{" "}
            <p>
              {t("sims.trafic")}{" "}
              <span className="font-bold">
                {tariff.quantity_internet.toLocaleString()}мб
              </span>
            </p>
            <p>
              {t("sims.price")}{" "}
              <span className="font-bold">
                {tariff.price_sell.toLocaleString()} руб.
              </span>
            </p>
            <div className="w-full flex items-center gap-2">
              <p className="text-[12px]">Зона покрытия:</p>{" "}
              <div
                className="relative flex h-[20px]"
                ref={(el) => {
                  dropdownRefs.current[tariff.id] = el;
                }}
              >
                {tariff?.regions
                  .slice(0, 4)
                  .map((region: Region, index: number) => (
                    <img
                      className="mr-[-5px] h-[20px] w-[24px] object-cover rounded-[2px] outline-[1px] outline-[rgb(0,0,0,0.1)] outline-offset-[-1px]"
                      src={getImageUrl(region.image)}
                      alt={region.name}
                      key={index}
                    />
                  ))}
                <button
                  className="text-[14px] leading-[1.2] bg-main-blue text-white min-w-[95px] rounded-r-[10px] rounded-l-[2px] hover:bg-blue-600 transition-colors duration-200"
                  onClick={() => toggleDropdown(tariff.id)}
                >
                  Подробнее
                </button>
                {openDropdowns[tariff.id] && (
                  <div className="absolute top-full left-0 mt-1 rounded-[20px] p-2 z-50 min-w-[300px] max-h-[300px] overflow-y-auto bg-[#EFF6FF] flex flex-wrap gap-1">
                    {tariff.regions.map((region: Region, index: number) => (
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimCard;
