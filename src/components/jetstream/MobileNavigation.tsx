import { Link, useLocation } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  House,
  Compass,
  Smartphone,
  UserRound,
  ShoppingBag,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "@/components/LanguageSwitcher/LanguageSwitcher";
import { ASSETS } from "@/assets";
import { useAuthStore } from "@/store/authStore";
import { useTariffStore } from "@/store/tariffStore";

export default function MobileNavigation() {
  const { pathname, search } = useLocation();
  const { t } = useTranslation();
  const reduced = useReducedMotion();
  const authenticated = useAuthStore((state) => state.isAuthenticated);
  const count = useTariffStore((state) =>
    state.selectedTariffs.reduce((sum, item) => sum + (item.quantity || 0), 0),
  );
  const next = new URLSearchParams(search).get("next");
  const isAuth = pathname === "/login" || pathname === "/verify";
  const tabs = [
    {
      key: "home",
      icon: House,
      to: "/",
      active: pathname === "/",
    },
    {
      key: "countries",
      icon: Compass,
      to: "/countries",
      active: pathname.startsWith("/tariffs") || pathname === "/countries",
    },
    {
      key: "sims",
      icon: Smartphone,
      to: authenticated ? "/myesim" : "/login?next=%2Fmyesim",
      active: pathname === "/myesim" || (isAuth && next === "/myesim"),
    },
    {
      key: "profile",
      icon: UserRound,
      to: authenticated ? "/profile" : "/login",
      active: pathname === "/profile" || (isAuth && next !== "/myesim"),
    },
  ];
  return (
    <>
      <header className="ew-mobile-header">
        <div className="ew-mobile-header-inner">
          <LanguageSwitcher />
          <Link
            to="/"
            className="ew-mobile-logo"
            aria-label={`JetSim — ${t("everywhere.navhome")}`}
          >
            <img src={ASSETS.whitelogo} width="112" height="35" alt="JetSim" />
          </Link>
          <Link
            to="/cart"
            className="ew-mobile-cart"
            aria-label={`${t("jetstream.cart")}${count ? ` (${count})` : ""}`}
          >
            <ShoppingBag size={20} />
            {count > 0 && <span>{count > 99 ? "99+" : count}</span>}
          </Link>
        </div>
      </header>
      <nav
        className="ew-mobile-nav"
        aria-label={t("everywhere.mobileNavigation")}
      >
        {tabs.map(({ key, icon: Icon, to, active }) => (
          <motion.div
            className="ew-mobile-tab-wrap"
            key={key}
            whileTap={reduced ? undefined : { scale: 0.94 }}
          >
            <Link
              to={to}
              aria-label={t(`everywhere.nav${key}`)}
              aria-current={active ? "page" : undefined}
              className={`ew-mobile-tab ${active ? "is-active" : ""}`}
            >
              {active && (
                <motion.span
                  className="ew-mobile-tab-active"
                  layoutId="jetsim-mobile-active"
                  transition={
                    reduced
                      ? { duration: 0 }
                      : { type: "spring", stiffness: 420, damping: 34 }
                  }
                />
              )}
              <Icon size={20} strokeWidth={active ? 1.9 : 1.65} />
              <span>{t(`everywhere.nav${key}`)}</span>
            </Link>
          </motion.div>
        ))}
      </nav>
    </>
  );
}
