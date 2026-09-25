import { ASSETS } from "@/assets";
import { APP_ROUTES } from "@/router/path";
import { useTranslation } from "react-i18next";
import { Menu } from "lucide-react";
import { Link, NavLink } from "react-router-dom";

interface HeaderLeftProps {
  onMenuClick: () => void;
}

function HeaderLeft({ onMenuClick }: HeaderLeftProps) {
  const { t } = useTranslation();

  const links = [
    { to: APP_ROUTES.HOME, label: t("nav.all") },
    { to: APP_ROUTES.HOW_WORKS, label: t("nav.how") },
    { to: APP_ROUTES.FAQ, label: t("nav.faq") },
    { to: APP_ROUTES.ABOUT, label: t("nav.about") },
  ];

  return (
    <div className="flex items-center gap-[30px] xl:gap-[44px]">
      <button
        type="button"
        aria-label="Открыть меню"
        className="block cursor-pointer border-none bg-none p-[5px] md:hidden"
        onClick={onMenuClick}
      >
        <Menu className="h-6 w-6 text-[#0d141c]" />
      </button>

      <Link to={APP_ROUTES.HOME} className="hidden shrink-0 md:block">
        <img
          src={ASSETS.logo}
          alt="JetSim"
          className="w-[150px] shrink-0 object-contain sm:w-[110px] md:w-[150px]"
        />
      </Link>

      <nav className="hidden lg:flex xl:gap-1.5 gap-0.5">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === APP_ROUTES.HOME}
            className={({ isActive }) =>
              `rounded-full px-3 py-2 text-sm font-medium transition-colors xl:text-[15px] ${
                isActive
                  ? "bg-main-blue/[0.08] text-main-blue"
                  : "text-[#0d141c] hover:bg-black/[0.04]"
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}

export default HeaderLeft;
