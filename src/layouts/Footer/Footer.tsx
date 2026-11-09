import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useAuthStore } from "@/store/authStore";
import { ASSETS } from "@/assets";

export default function Footer() {
  const { t } = useTranslation();
  const authenticated = useAuthStore((state) => state.isAuthenticated);
  const navigation = [
    { to: "/#tarifs", text: t("jetstream.destinations") },
    { to: "/how", text: t("jetstream.how") },
    { to: "/about", text: t("nav.about") },
    { to: "/faq", text: "FAQ" },
    {
      to: authenticated ? "/myesim" : "/login?next=%2Fmyesim",
      text: t("jetstream.account"),
    },
  ];
  const documents = [
    { to: "/privacy-policy", text: t("footer.confidential") },
    { to: "/public-offer", text: t("footer.oferta") },
    { to: "/refund-policy", text: t("footer.usloviya") },
  ];
  const socials = [
    {
      icon: ASSETS.inst,
      name: "Instagram",
      url: "https://www.instagram.com/jetsim.ru?igsh=dWRnbXk1MjUzNWk5",
    },
    { icon: ASSETS.vk, name: "VKontakte", url: "https://vk.com/id1090229648" },
    { icon: ASSETS.telegram, name: "Telegram", url: "https://t.me/jetsimru" },
    {
      icon: ASSETS.max,
      name: "MAX",
      url: "https://max.ru/u/f9LHodD0cOLjNJVFzTXrS0_f9s7hEANWEYwVHYH55gY8cheoaTnvfpP7IP8",
    },
    {
      icon: ASSETS.tt,
      name: "TikTok",
      url: "https://www.tiktok.com/@jetsim.ru?_r=1&_t=ZM-92QrM7FY9jk",
    },
  ];
  return (
    <footer className="js-footer">
      <div className="container">
        <div className="js-footer-grid">
          <div>
            <Link to="/" aria-label="JetSim">
              <img
                className="js-footer-logo"
                src={ASSETS.whitelogo}
                alt="JetSim"
                width="130"
                height="40"
                loading="lazy"
              />
            </Link>
            <p className="js-footer-tagline">{t("jetstream.footerTagline")}</p>
            <div className="js-socials">
              {socials.map((social) => (
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={social.name}
                  aria-label={social.name}
                >
                  <img
                    src={social.icon}
                    alt=""
                    width="18"
                    height="18"
                    loading="lazy"
                  />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h2>{t("jetstream.navigation")}</h2>
            <nav className="js-footer-links">
              {navigation.map((link) => (
                <Link key={link.to} to={link.to}>
                  {link.text}
                </Link>
              ))}
            </nav>
          </div>
          <div>
            <h2>{t("jetstream.contact")}</h2>
            <div className="js-footer-links">
              <a className="js-footer-contact" href="tel:+79339000003">
                +7 (933) 900-00-03
              </a>
              <a href="mailto:info@jetsim.ru">info@jetsim.ru</a>
              <a
                href="https://t.me/Operator1jet"
                target="_blank"
                rel="noreferrer"
                className="inline-flex gap-2 items-center"
              >
                Telegram / @Operator1jet
                <ArrowUpRight size={15} />
              </a>
            </div>
          </div>
        </div>
        <div className="js-footer-legal">
          <div>
            {["br1", "br2", "br3", "br4"].map((key) => (
              <p key={key}>{t(`footer.${key}`)}</p>
            ))}
          </div>
          <div>
            <nav
              className="js-footer-legal-links"
              aria-label={t("jetstream.legal")}
            >
              {documents.map((link) => (
                <Link key={link.to} to={link.to}>
                  {link.text}
                </Link>
              ))}
            </nav>
            <p className="mt-4">
              © {new Date().getFullYear()} JetSim. {t("footer.rights")}
            </p>
          </div>
        </div>
      </div>
      <div className="js-footer-wordmark" aria-hidden="true">
        JetSim
      </div>
    </footer>
  );
}
