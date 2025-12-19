import { ASSETS } from "@/assets";
import { useNavigate } from "react-router-dom";

interface BackButtonWithTitleProps {
  title: string;
  onBackClick?: () => void;
  backPath?: string;
  className?: string;
}

function BackButtonWithTitle({
  title,
  onBackClick,
  backPath = "/",
  className = "",
}: BackButtonWithTitleProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      navigate(backPath);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`flex items-center md:gap-[15px] gap-[10px] ${className}`}
    >
      <div className="md:w-[50px] md:h-[50px] w-[40px] h-[40px] flex items-center justify-center rounded-full bg-[#E8EDF2]">
        <img
          src={ASSETS.backArrow}
          alt="back"
          className="translate-x-[-1px] md:w-[13px] w-2 md:h-[22px] h-[18px]"
        />
      </div>
      <h1 className="md:text-[30px] text-[24px] font-bold text-[#0D141C]">
        {title}
      </h1>
    </button>
  );
}

export default BackButtonWithTitle;
