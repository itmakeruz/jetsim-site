function HeaderBtn({
  onClick,
  text,
  count,
}: {
  onClick: () => void;
  text: string;
  count?: number;
}) {
  return (
    <button
      onClick={onClick}
      className="relative flex items-center justify-center min-w-[100px] xl:px-[35px] px-[30px] h-[46px] gap-2 header-link-btn"
    >
      <svg
        fill="#D9D9D9"
        height="100%"
        width="100%"
        viewBox="0 0 160 46"
        className="absolute inset-0 z-[-1]"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path d="M161 6.0105C161 7.1695 160.665 8.30378 160.035 9.27671L140.696 39.1513C137.932 43.4217 133.191 46 128.104 46H3.9004C1.74627 46 0 44.2537 0 42.0996C0 41.3474 0.217478 40.6113 0.626233 39.9799L22.0753 6.8483C24.8397 2.57812 29.58 0 34.6669 0H154.99C158.309 0 161 2.69099 161 6.0105Z" />
      </svg>
      <span className="text-sm xl:text-base font-bold flex items-center gap-1">
        {text}
        {count ? (
          <span className="text-white font-bold xl:text-base text-[15px] bg-[#E31D1C] min-w-[35px] px-2 h-[22px] flex items-center justify-center rounded-2xl">
            {count}
          </span>
        ) : null}
      </span>
    </button>
  );
}

export default HeaderBtn;
