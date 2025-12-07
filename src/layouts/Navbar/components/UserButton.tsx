import { ASSETS } from "@/assets";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { APP_ROUTES } from "@/router/path";

const UserButton = () => {
  const { t } = useTranslation();

  return (
    <Link
      to={APP_ROUTES.PROFILE}
      className="flex flex-col gap-1 items-center text-[#4F7096] text-sm font-medium"
    >
      <div className="relative">
        <img src={ASSETS.user} alt="user" width="26" height="26" />
      </div>
      <span className="relative leading-none">{t("nav.cabinet")}</span>
    </Link>
  );
};

export default UserButton;
