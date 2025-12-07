import { ASSETS } from "@/assets";
import { APP_ROUTES } from "@/router/path";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function HeaderLeft() {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div className="flex items-center xl:gap-[50px] gap-[30px]">
      <Link to={APP_ROUTES.HOME}>
        <img
          src={ASSETS.logo}
          alt="logo"
          className="w-[150px] md:w-[150px] sm:w-[110px] object-contain"
        />
      </Link>
      <div className="hidden lg:flex xl:gap-[30px] gap-[20px]">
        <Link className="xl:text-base text-sm font-medium" to={APP_ROUTES.HOME}>
          {t("nav.all")}
        </Link>
        <Link
          className="xl:text-base text-sm font-medium"
          to={APP_ROUTES.HOW_WORKS}
        >
          {t("nav.how")}
        </Link>
        <Link className="xl:text-base text-sm font-medium" to={APP_ROUTES.FAQ}>
          {t("nav.faq")}
        </Link>
        <Link
          className="xl:text-base text-sm font-medium"
          to={APP_ROUTES.ABOUT}
        >
          {t("nav.about")}
        </Link>
      </div>
      <button
        className="block lg:hidden text-2xl bg-none border-none cursor-pointer p-[5px]"
        onClick={() => {
          setIsMenuOpen(!isMenuOpen);
        }}
      >
        ☰
      </button>
    </div>
  );
}

export default HeaderLeft;
