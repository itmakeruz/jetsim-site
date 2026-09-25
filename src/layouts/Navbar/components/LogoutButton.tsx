import { ASSETS } from "@/assets";
import { useTranslation } from "react-i18next";

interface LogoutButtonProps {
  onClick?: () => void;
}

const LogoutButton = ({ onClick }: LogoutButtonProps) => {
  const { t } = useTranslation();

  return (
    <button
      type="button"
      onClick={onClick}
      // В покое — нейтральный, красным становится только на наведении:
      // постоянный #E84118 выбивался из синей палитры и кричал сильнее логина
      className="flex items-center gap-2 rounded-full px-2.5 py-2 text-sm font-medium text-[#4f7096]
        transition-colors hover:bg-[#E84118]/[0.08] hover:text-[#E84118]"
    >
      <img src={ASSETS.logout} alt="" aria-hidden="true" className="h-[22px] w-[22px] shrink-0" />
      <span>{t("nav.exit")}</span>
    </button>
  );
};

export default LogoutButton;
