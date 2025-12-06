const SimCardSkeleton = () => {
  return (
    <div className="shadow-[0px_4px_8.4px_0px_#AAAFB361] bg-white border border-[#E8EDF2] rounded-[12px] px-[18px] py-[27px] overflow-hidden relative animate-pulse">
      <div className="flex items-center gap-[18px]">
        {/* Image skeleton */}
        <div className="w-[66px] h-[66px] bg-gray-200 rounded-md" />

        <div className="flex flex-col gap-2">
          {/* Title skeleton */}
          <div className="w-[140px] h-[18px] bg-gray-200 rounded"></div>

          {/* Price skeleton */}
          <div className="w-[100px] h-[16px] bg-gray-200 rounded"></div>
        </div>

        {/* Decoration skeleton (wave & arrow) */}
        <div className="absolute right-0 bottom-0 opacity-40">
          <div className="w-[138px] h-[35px] bg-gray-200 rounded-tl-xl"></div>
          <div className="w-[22px] h-[12px] bg-gray-300 absolute right-3 bottom-3 rounded"></div>
        </div>

        {/* Hover background skeleton (invisible for skeleton) */}
        <div className="absolute z-[-1] bottom-0 right-0 bg-[#fff] w-full h-full"></div>
      </div>
    </div>
  );
};

export default SimCardSkeleton;
