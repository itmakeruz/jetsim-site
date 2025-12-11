import { ASSETS } from "@/assets";
import { useTranslation } from "react-i18next";

interface LogoutButtonProps {
  onClick?: () => void;
}

const LogoutButton = ({ onClick }: LogoutButtonProps) => {
  const { t } = useTranslation();

  return (
    <button
      onClick={onClick}
      className="flex flex-col gap-1 items-center text-[#E84118] text-sm font-medium"
    >
      <div className="relative">
        <img
          src={ASSETS.logout}
          alt="logout"
          className="md:w-[26px] md:h-[26px] w-[28px] h-[28px]"
        />
      </div>
      <span className="relative leading-none">{t("nav.exit")}</span>
    </button>
  );
};

export default LogoutButton;
