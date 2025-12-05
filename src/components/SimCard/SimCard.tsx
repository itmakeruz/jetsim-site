import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { ArrowBigRight, ArrowRight, Plus } from "lucide-react";
import { getImageUrl } from "../../config/imageUtils";
import { useCart } from "../../context/CartContext";
import type { Region, Tariff } from "../../types/api";
import { ImagePreview } from "../ImgCards";
import { Link } from "react-router-dom";

interface SimCardProps {
  region: Region;
}

const SimCard = ({ region }: SimCardProps) => {
  const { t } = useTranslation();
  const { addToCart } = useCart();

  const handlePlusClick = async (region: Region, tariff: Tariff) => {
    await addToCart(region, tariff);
  };
  console.log(region);

  return (
    <Link
      to={`/sim-card/${region.id}`}
      className="shadow-[0px_4px_8.4px_0px_#AAAFB361] group overflow-hidden relative border border-[#E8EDF2] rounded-[12px] px-[18px] py-[27px]"
    >
      <div className="flex items-center gap-[18px] z-1">
        <ImagePreview
          src={region.image}
          alt={region.name}
          width={66}
          height={66}
        />
        <div className="flex flex-col">
          <h2 className="text-[18px] font-semibold text-black">
            {region.name}
          </h2>
          <span className="text-[16px] text-[#4F7096] font-medium">
            От 150 ₽
          </span>
        </div>
        <div className="absolute right-0 bottom-0">
          <div className="relative">
            <svg
              width="138"
              height="35"
              viewBox="0 0 138 35"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M145.001 19.7283C145.001 29.3933 143.748 41.3592 120 41.3592C96.2518 41.3592 0 44.5244 0 34.8594C64.5 29.3594 93 4.4814 109.5 0.859195C126 -2.76301 140 5.35936 145.001 19.7283Z"
                fill="#F0F0FB"
              />
            </svg>
            <div className="absolute translate-x-[-50%] right-0 bottom-0 translate-y-[-50%]">
              <svg
                width="22"
                height="12"
                viewBox="0 0 22 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.75 4.77295C0.335786 4.77295 3.62117e-08 5.10874 0 5.52295C-3.62117e-08 5.93716 0.335786 6.27295 0.75 6.27295L0.75 5.52295L0.75 4.77295ZM21.2803 6.05328C21.5732 5.76039 21.5732 5.28551 21.2803 4.99262L16.5074 0.21965C16.2145 -0.0732437 15.7396 -0.0732437 15.4467 0.21965C15.1538 0.512543 15.1538 0.987417 15.4467 1.28031L19.6893 5.52295L15.4467 9.76559C15.1538 10.0585 15.1538 10.5334 15.4467 10.8263C15.7396 11.1191 16.2145 11.1191 16.5074 10.8263L21.2803 6.05328ZM0.75 5.52295L0.75 6.27295L20.75 6.27295L20.75 5.52295L20.75 4.77295L0.75 4.77295L0.75 5.52295Z"
                  fill="black"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute z-[-1] bottom-0 right-0 group-hover:scale-[1.5] bg-[#F0F0FB] transition-all duration-500 w-0 h-0 group-hover:w-full group-hover:h-full"></div>
    </Link>
  );
};

export default SimCard;
