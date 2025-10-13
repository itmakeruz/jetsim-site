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
            <img src={ASSETS.whitelogo} alt="" className="footer-logo"/>

            <div className="footer-texts">
              <p className="footer-text">{t("footer.br1")}</p>
              <p className="footer-text">{t("footer.br2")}</p>
              <p className="footer-text">{t("footer.br3")}</p>
              <p className="footer-text">{t("footer.br4")}</p>
              <p className="footer-text">{t("footer.br5")}</p>
              <p className="footer-text">{t("footer.br6")}</p>
              <p className="footer-text">{t("footer.br7")}</p>
              <p className="footer-text">{t("footer.br8")}</p>
              <p className="footer-text">{t("footer.br9")}</p>
              <p className="footer-text">{t("footer.br10")}</p>
            </div>
          </div>

          <div>
            <h2 className="footer-heading">{t("footer.clients")}</h2>

            <ul className="footer-list">
                <a href="#tarifs">
                    {t("footer.tarifs")}
                </a>

                <a href="">
                    {t("footer.app")}
                </a>
                
                <a href={APP_ROUTES.FAQ}>
                    F.A.Q
                </a>

                <a href={APP_ROUTES.CONFIDENTIAL}>
                    {t("footer.confidential")}
                </a>

                <a href={APP_ROUTES.OFERTA}>
                    {t("footer.oferta")}
                </a>

                <a href={APP_ROUTES.USLOVIYA}>
                    {t("footer.usloviya")}
                </a>

                <a href={APP_ROUTES.RULE}>
                    {t("footer.rules")}
                </a>

                <a href={APP_ROUTES.ABOUT}>
                    {t("footer.about")}
                </a>
            </ul>
          </div>

          <div>
            <h2 className="footer-heading">{t("footer.contacts")}</h2>

            <ul className="footer-list">
                <div>
                    <p>
                        {t("footer.phone")}
                    </p>
                    <a href="tel:+7 921 124 22 13">
                    +7 921 124 22 13
                    </a>
                </div>


                <div>
                    <p>
                        {t("footer.email")}
                    </p>
                    <a href="mailto:jetsim@mail.com">
                    jetsim@mail.com
                    </a>
                </div>

                <div>
                    <p>
                        {t("footer.faks")}
                    </p>
                    <p>
                    y71284712948
                    </p>
                </div>
            </ul>

            <div className="footer-app">
                <h2>
                    {t("footer.app")}
                </h2>

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

            <div>
                <p className="footer-b-text">
                koVdis Design
                </p>

                <img className="footer-t-img" src={ASSETS.telegram} alt="" />
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;