import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { ShoppingBag, UserRound, LogOut, ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { ASSETS } from "@/assets";
import { useAuthStore } from "@/store/authStore";
import { useTariffStore } from "@/store/tariffStore";
import LanguageSwitcher from "@/components/LanguageSwitcher/LanguageSwitcher";
import LogoutModal from "./components/LogoutModal";

export default function Navbar() {
  const { t } = useTranslation();
  const home = useLocation().pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  const { isAuthenticated, logout } = useAuthStore();
  const { selectedTariffs, setSelectedTariffs } = useTariffStore();
  const [confirmLogout, setConfirmLogout] = useState(false);
  const navigate = useNavigate();
  const count = selectedTariffs.reduce(
    (sum, item) => sum + (item.quantity || 0),
    0,
  );
  const links = [
    { to: "/", label: t("jetstream.destinations") },
    { to: "/how", label: t("jetstream.how") },
    { to: "/faq", label: "FAQ" },
    { to: "/about", label: t("nav.about") },
  ];
  const handleLogout = () => {
    logout();
    setSelectedTariffs([]);
    setConfirmLogout(false);
    navigate("/");
  };
  return (
    <>
      <a className="js-skip" href="#main-content">
        {t("jetstream.skip")}
      </a>
      <header
        className={`js-nav ${home ? "ew-home-nav" : ""} ${scrolled ? "is-scrolled" : ""}`}
      >
        <div className="container js-nav-inner">
          <Link to="/" className="js-logo" aria-label="JetSim">
            <img
              src={home ? ASSETS.whitelogo : ASSETS.logo}
              width="118"
              height="36"
              alt="JetSim"
            />
            <span className="js-logo-caption">
              EVERYWHERE
              <br />
              IS YOURS
            </span>
          </Link>
          <nav className="js-nav-links" aria-label={t("jetstream.navigation")}>
            {links.map((link) => (
              <NavLink key={link.to} to={link.to} end={link.to === "/"}>
                {link.label}
              </NavLink>
            ))}
          </nav>
          <div className="js-nav-actions">
            <LanguageSwitcher />
            <Link
              className="js-icon-btn js-cart"
              to="/cart"
              aria-label={`${t("jetstream.cart")}${count ? ` (${count})` : ""}`}
            >
              <ShoppingBag size={17} />
              {count > 0 && <span className="js-cart-count">{count}</span>}
            </Link>
            {isAuthenticated ? (
              <Link
                className="js-icon-btn"
                to="/myesim"
                aria-label={t("jetstream.account")}
              >
                <UserRound size={17} />
              </Link>
            ) : (
              <Link className="js-btn js-nav-login" to="/login">
                {t("jetstream.login")}
                <ArrowUpRight size={14} />
              </Link>
            )}
            {isAuthenticated && (
              <button
                className="js-icon-btn hidden lg:inline-flex"
                type="button"
                onClick={() => setConfirmLogout(true)}
                aria-label={t("jetstream.logout")}
              >
                <LogOut size={16} />
              </button>
            )}
          </div>
        </div>
      </header>
      <LogoutModal
        isOpen={confirmLogout}
        onClose={() => setConfirmLogout(false)}
        onConfirm={handleLogout}
      />
    </>
  );
}
