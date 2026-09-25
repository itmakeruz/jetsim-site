import { ASSETS } from "@/assets";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { APP_ROUTES } from "@/router/path";

const UserButton = () => {
  const { t } = useTranslation();

  return (
    <Link
      to={APP_ROUTES.PROFILE}
      className="flex items-center gap-2 rounded-full px-2.5 py-2 text-[13px] font-medium text-[#0d141c]
        transition-colors hover:bg-black/[0.04] md:text-sm"
    >
      <img src={ASSETS.user} alt="" aria-hidden="true" className="h-[24px] w-[24px] shrink-0" />
      <span className="hidden md:block">{t("nav.cabinet")}</span>
    </Link>
  );
};

export default UserButton;
