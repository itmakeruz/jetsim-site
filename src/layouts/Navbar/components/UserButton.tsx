import { ASSETS } from "@/assets";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { APP_ROUTES } from "@/router/path";

const UserButton = () => {
  const { t } = useTranslation();

  return (
    <Link
      to={APP_ROUTES.PROFILE}
      className="flex flex-col gap-1 items-center text-black md:text-sm text-[12px] font-medium"
    >
      <div>
        <img
          src={ASSETS.user}
          alt="user"
          className="md:w-[26px] md:h-[26px] w-[28px] h-[28px]"
        />
      </div>
      <span className="relative leading-none hidden md:block">
        {t("nav.cabinet")}
      </span>
    </Link>
  );
};

export default UserButton;
