import React from "react";
import { ASSETS } from "../../../assets";

/**
 * Исходные SVG несогласованы: у instagram и vk фон — скруглённый квадрат,
 * у telegram — круг, у tiktok фона нет вовсе. Обрезать их по общей форме нельзя
 * (у первых двух срезаются поля вокруг глифа), поэтому единство даёт одинаковый
 * контейнер: белый круг, а сам знак внутри — одного размера у всех.
 */
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
    icon: ASSETS.max,
    url: "https://max.ru/u/f9LHodD0cOLjNJVFzTXrS0_f9s7hEANWEYwVHYH55gY8cheoaTnvfpP7IP8",
    alt: "MAX",
  },
  {
    icon: ASSETS.tt,
    url: "https://www.tiktok.com/@jetsim.ru?_r=1&_t=ZM-92QrM7FY9jk",
    alt: "TikTok",
  },
];

const SocialMediaIcons: React.FC = () => {
  return (
    <ul className="mt-5 flex items-center justify-center gap-3">
      {SOCIAL_LINKS.map((social) => (
        <li key={social.alt}>
          <a
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.alt}
            title={social.alt}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-black/10 bg-white
              shadow-[0_1px_2px_rgba(16,24,40,0.05)] transition-all duration-200
              hover:-translate-y-0.5 hover:border-main-blue/40 hover:shadow-[0_8px_18px_-8px_rgba(25,120,229,0.45)]
              focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-main-blue"
          >
            <img
              src={social.icon}
              alt=""
              aria-hidden="true"
              className="h-[26px] w-[26px] object-contain"
            />
          </a>
        </li>
      ))}
    </ul>
  );
};

export default SocialMediaIcons;
