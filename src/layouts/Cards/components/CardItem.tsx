import React from "react";

export type CardAccent = "blue" | "green" | "purple";

interface CardItemProps {
  image: string;
  heading: string;
  text: string;
  accent: CardAccent;
}

const ACCENT_STYLES: Record<CardAccent, { tile: string; glow: string }> = {
  blue: {
    tile: "bg-[#e7f1fd] group-hover:bg-[#d6e8fc]",
    glow: "group-hover:shadow-[0_12px_32px_-12px_rgba(25,120,229,0.35)]",
  },
  green: {
    tile: "bg-[#e6f9ea] group-hover:bg-[#d3f4da]",
    glow: "group-hover:shadow-[0_12px_32px_-12px_rgba(46,182,80,0.32)]",
  },
  purple: {
    tile: "bg-[#f3e9ff] group-hover:bg-[#e9dbff]",
    glow: "group-hover:shadow-[0_12px_32px_-12px_rgba(167,108,255,0.32)]",
  },
};

const CardItem: React.FC<CardItemProps> = ({ image, heading, text, accent }) => {
  const styles = ACCENT_STYLES[accent];

  return (
    <article
      className={`group h-full flex flex-col rounded-2xl border border-black/10 bg-white
        p-6 md:p-7 transition-all duration-300 ease-out
        hover:-translate-y-1 hover:border-main-blue/35 ${styles.glow}`}
    >
      <div
        className={`w-14 h-14 md:w-16 md:h-16 rounded-xl flex items-center justify-center
          shrink-0 transition-colors duration-300 ${styles.tile}`}
      >
        <img
          src={image}
          alt=""
          aria-hidden="true"
          className="w-8 h-8 md:w-9 md:h-9 object-contain"
        />
      </div>

      <h3 className="mt-5 text-[19px] md:text-[21px] leading-[1.25] font-semibold text-[#0d141c] text-balance">
        {heading}
      </h3>

      <p className="mt-2.5 text-[15px] md:text-base leading-[1.6] text-[#4f7096]">
        {text}
      </p>
    </article>
  );
};

export default CardItem;
