import { useState } from "react";

import { ASSETS } from "../../assets";

export default function FloatingSocialMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const socials = [
    {
      icon: ASSETS.telegram,
      href: "https://t.me/Jetsim_support_bot",
      bgColor: "#29ABEE4D", // Telegram ko'k rang
    },
    {
      icon: ASSETS.whatsapp,
      href: "https://wa.me/79339000003",
      bgColor: "#5FD6684D", // WhatsApp yashil rang
    },
    {
      icon: ASSETS.vk,
      href: "https://vk.com/id1090229648",
      bgColor: "#4645E84D", // VK ko'k rang
    },
    {
      icon: ASSETS.inst,
      href: "https://www.instagram.com/jetsim.ru",
      bgColor: "#E446744D", // Instagram gradient
    },
  ];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
      )}

      {/* Wrapper */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="relative w-[100px] h-[100px]">
          {/* Social Icons */}
          {socials.map((item, index) => {
            const radius = 80;

            // 180° → 300° oralig'ida yoyiladi
            const startAngle = 250;
            const endAngle = 380;
            const angleStep =
              socials.length === 1
                ? 0
                : (endAngle - startAngle) / (socials.length - 1);

            const angle = startAngle + index * angleStep;
            const delay = index * 100; // Har bir icon uchun 100ms delay

            return (
              <a
                key={index}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-1/2 left-1/2
                 w-13 h-13 rounded-full
                 flex items-center justify-center
                 shadow-lg z-50
                 transition-all duration-300 ease-out
                 hover:scale-110"
                style={{
                  background: item.bgColor,
                  transform: isOpen
                    ? `
            translate(-50%, -50%)
            rotate(${angle}deg)
            translateY(-${radius}px)
            scale(1)
          `
                    : `
            translate(-50%, -50%)
            rotate(${angle}deg)
            translateY(0px)
            scale(0)
          `,
                  opacity: isOpen ? 1 : 0,
                  transitionDelay: isOpen ? `${delay}ms` : "0ms",
                  pointerEvents: isOpen ? "auto" : "none",
                }}
              >
                <img
                  src={item.icon}
                  className="w-7 h-7"
                  style={{
                    transform: `rotate(-${angle}deg)`,
                  }}
                  alt={`Social icon ${index + 1}`}
                />
              </a>
            );
          })}

          {/* Main Button */}
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="absolute top-1/2 left-1/2
                       -translate-x-1/2 -translate-y-1/2
                       md:w-[60px] md:h-[60px] w-[40px] h-[40px] rounded-full
                       bg-[#163B7A] text-white
                       flex items-center justify-center
                       md:shadow-[0_0_0_10px_rgba(79,112,150,0.4)] shadow-[0_0_0_5px_rgba(79,112,150,0.4)]
                       transition-transform duration-300
                       hover:scale-105"
          >
            {isOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <img
                className="w-[30px] h-[30px] sm:w-[35px] sm:h-[35px]"
                src={ASSETS.support}
                alt=""
              />
            )}
          </button>
        </div>
      </div>
    </>
  );
}
