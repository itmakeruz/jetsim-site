import React from "react";
import { ASSETS } from "../../../assets";

const SOCIAL_LINKS = [
  {
    icon: ASSETS.inst,
    url: "https://www.instagram.com/jetsim.ru?igsh=dWRnbXk1MjUzNWk5",
    alt: "Instagram",
  },
  {
    icon: ASSETS.vk,
    url: "https://vk.com/id1090229648",
    alt: "VKontakte",
  },
  {
    icon: ASSETS.telegram,
    url: "https://t.me/jetsimru",
    alt: "Telegram",
  },
  {
    icon: ASSETS.tt,
    url: "https://www.tiktok.com/@jetsim.ru?_r=1&_t=ZM-92QrM7FY9jk",
    alt: "TikTok",
  },
];

const SocialMediaIcons: React.FC = () => {
  const iconClasses =
    "w-12 h-12 lg:w-12 lg:h-12 md:w-10 md:h-10 max-md:w-9 max-md:h-9 max-[475px]:w-[30px] max-[475px]:h-[30px] object-contain";

  return (
    <div className="flex items-center py-2 gap-[15px] overflow-auto lg:gap-[15px] md:gap-2.5 max-md:gap-2 max-[475px]:gap-1.5 mt-[15px] lg:mt-[15px] md:mt-2.5 max-md:mt-2 max-[475px]:mt-2 ">
      {SOCIAL_LINKS.map((social, index) => (
        <a
          key={index}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-opacity hover:opacity-80"
        >
          <img src={social.icon} className={iconClasses} alt={social.alt} />
        </a>
      ))}
    </div>
  );
};

export default SocialMediaIcons;
