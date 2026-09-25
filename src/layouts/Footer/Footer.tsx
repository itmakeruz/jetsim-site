import { ASSETS } from "../../assets";
import { useTranslation } from "react-i18next";
import { APP_ROUTES } from "../../router/path";

// Вернуть в true после релиза мобильного приложения
const SHOW_APP_BANNER = false;

const PHONE = "+7 (933) 900-00-03";
const EMAIL = "info@jetsim.ru";
const TELEGRAM = "Operator1jet";

const Footer = () => {
  const { t } = useTranslation();

  const linkClasses =
    "text-[15px] leading-6 text-white/75 transition-colors duration-200 hover:text-white";

  const clientLinks = [
    { href: "#tarifs", label: t("footer.tarifs") },
    ...(SHOW_APP_BANNER ? [{ href: "", label: t("footer.app") }] : []),
    { href: APP_ROUTES.FAQ, label: "F.A.Q" },
    { href: APP_ROUTES.PRIVACY_POLICY, label: t("footer.confidential") },
    { href: APP_ROUTES.PUBLIC_OFFER, label: t("footer.oferta") },
    { href: APP_ROUTES.REFUND_POLICY, label: t("footer.usloviya") },
    { href: APP_ROUTES.ABOUT, label: t("footer.about") },
  ];

  return (
    <footer className="bg-[#112d6c] text-white">
      <div className="container pt-12 pb-8 md:pt-16 md:pb-10">
        <div className="grid gap-10 md:gap-8 lg:gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <img src={ASSETS.whitelogo} alt="JetSim" className="h-8 w-auto object-contain" />

            <div className="mt-7 flex flex-col gap-2.5 text-[15px] leading-6 text-white/70 max-w-[46ch]">
              <p className="text-white/90 font-medium">{t("footer.br1")}</p>
              <p>{t("footer.br2")}</p>
              <p>{t("footer.br3")}</p>
              <p>{t("footer.br4")}</p>
            </div>
          </div>

          <div>
            <h2 className="text-[17px] font-semibold tracking-[0.01em] text-white">
              {t("footer.clients")}
            </h2>

            <ul className="mt-5 flex flex-col gap-3">
              {clientLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className={linkClasses}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-[17px] font-semibold tracking-[0.01em] text-white">
              {t("footer.contacts")}
            </h2>

            <ul className="mt-5 flex flex-col gap-4">
              <li className="flex flex-col gap-0.5">
                <span className="text-[13px] uppercase tracking-[0.1em] text-white/45">
                  {t("footer.phone")}
                </span>
                <a
                  href={`tel:${PHONE.replace(/[^+\d]/g, "")}`}
                  className="text-[17px] font-medium leading-6 text-white transition-opacity hover:opacity-80"
                >
                  {PHONE}
                </a>
              </li>

              <li className="flex flex-col gap-0.5">
                <span className="text-[13px] uppercase tracking-[0.1em] text-white/45">
                  {t("footer.email")}
                </span>
                <a
                  href={`mailto:${EMAIL}`}
                  className="text-[17px] font-medium leading-6 text-white transition-opacity hover:opacity-80"
                >
                  {EMAIL}
                </a>
              </li>

              <li className="flex flex-col gap-0.5">
                <span className="text-[13px] uppercase tracking-[0.1em] text-white/45">
                  Telegram
                </span>
                <a
                  href={`https://t.me/${TELEGRAM}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[17px] font-medium leading-6 text-white transition-opacity hover:opacity-80"
                >
                  @{TELEGRAM}
                </a>
              </li>
            </ul>

            {SHOW_APP_BANNER && (
              <div className="mt-8">
                <h2 className="text-[17px] font-semibold text-white">{t("footer.app")}</h2>
                <div className="mt-4 flex items-center gap-3">
                  <img src={ASSETS.google} alt="Google Play" className="h-10 w-auto" />
                  <img src={ASSETS.appstore} alt="App Store" className="h-10 w-auto" />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-12 md:mt-14 border-t border-white/15 pt-6">
          <p className="text-[14px] leading-6 text-white/55">
            JetSim {new Date().getFullYear()} © {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
