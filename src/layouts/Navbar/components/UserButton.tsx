import { ASSETS } from "@/assets";
import { useTranslation } from "react-i18next";

interface UserButtonProps {
  onClick?: () => void;
}

const UserButton = ({ onClick }: UserButtonProps) => {
  const { t } = useTranslation();

  return (
    <button
      onClick={onClick}
      className="flex flex-col gap-1 items-center text-[#4F7096] text-sm font-medium"
    >
      <div className="relative">
        <img src={ASSETS.user} alt="user" width="26" height="26" />
      </div>
      <span className="relative leading-none">{t("nav.cabinet")}</span>
    </button>
  );
};

export default UserButton;
