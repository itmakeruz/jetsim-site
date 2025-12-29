import { ASSETS } from "../../assets";
import { useTranslation } from "react-i18next";
import { APP_ROUTES } from "../../router/path";
import "./Footer.css";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="container footer-top">
          <div>
            <img src={ASSETS.whitelogo} alt="" className="footer-logo" />

            <div className="footer-texts">
              <p className="footer-text">{t("footer.br1")}</p>
              <p className="footer-text">{t("footer.br2")}</p>
              <p className="footer-text">{t("footer.br3")}</p>
              <p className="footer-text">{t("footer.br4")}</p>
              <p className="footer-text">{t("footer.br5")}</p>
              <p className="footer-text">{t("footer.br6")}</p>
            </div>
          </div>

          <div>
            <h2 className="footer-heading">{t("footer.clients")}</h2>

            <ul className="footer-list">
              <a href="#tarifs">{t("footer.tarifs")}</a>

              <a href="">{t("footer.app")}</a>

              <a href={APP_ROUTES.FAQ}>F.A.Q</a>

              <a href={APP_ROUTES.PRIVACY_POLICY}>{t("footer.confidential")}</a>

              <a href={APP_ROUTES.PUBLIC_OFFER}>{t("footer.oferta")}</a>

              <a href={APP_ROUTES.REFUND_POLICY}>{t("footer.usloviya")}</a>

              <a href={APP_ROUTES.RULE}>{t("footer.rules")}</a>

              <a href={APP_ROUTES.ABOUT}>{t("footer.about")}</a>
            </ul>
          </div>

          <div>
            <h2 className="footer-heading">{t("footer.contacts")}</h2>

            <ul className="footer-list">
              <div>
                <p>{t("footer.phone")}</p>
                <a href="tel:+79339000003">+7 (933) 900-00-03</a>
              </div>

              <div>
                <p>{t("footer.email")}</p>
                <a href="mailto:info@jetsim.ru">info@jetsim.ru</a>
              </div>
            </ul>

            <div className="footer-app">
              <h2>{t("footer.app")}</h2>

              <div>
                <img src={ASSETS.google} alt="" />
                <img src={ASSETS.appstore} alt="" />
              </div>
            </div>
          </div>
        </div>

        <hr style={{ color: "#4B6FC2", height: "2px" }} />

        <div className="container footer-bottom">
          <p className="footer-b-text">{t("footer.rights")}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
