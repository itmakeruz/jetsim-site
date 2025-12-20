import React from "react";
import { ASSETS } from "../../../assets";

const SOCIAL_ICONS = [
  ASSETS.facebook,
  ASSETS.x,
  ASSETS.inst,
  ASSETS.linkendin,
  ASSETS.yt,
  ASSETS.snpachat,
  ASSETS.theards,
  ASSETS.whatsapp,
  ASSETS.game,
  ASSETS.tt,
  ASSETS.t,
  ASSETS.telegram,
  ASSETS.vk,
];

const SocialMediaIcons: React.FC = () => {
  const iconClasses =
    "w-12 h-12 lg:w-12 lg:h-12 md:w-10 md:h-10 max-md:w-9 max-md:h-9 max-[475px]:w-[30px] max-[475px]:h-[30px] object-contain";

  return (
    <div className="flex items-center py-2 gap-[15px] overflow-auto lg:gap-[15px] md:gap-2.5 max-md:gap-2 max-[475px]:gap-1.5 mt-[15px] lg:mt-[15px] md:mt-2.5 max-md:mt-2 max-[475px]:mt-2 ">
      {SOCIAL_ICONS.map((icon, index) => (
        <img key={index} src={icon} className={iconClasses} alt="" />
      ))}
    </div>
  );
};

export default SocialMediaIcons;
