import { useTranslation } from "react-i18next";
import { ASSETS } from "../../assets";
import Card from "../Cards/Cards";
import Footer from "../Footer/Footer";
import "./Bottom.css";

const Bottom = () => {
  const { t } = useTranslation()
  return (
    <div style={{ marginTop: "25px" }}>
      <div className="phone">
        <div className="container phone-container">
          <div>
            <h1 className="phone-heading">
              {t("phone.heading")}
              <span style={{color: "#1978E5"}}>
                {t("phone.heading2")}
              </span>
              {t("phone.heading3")}
            </h1>

            <ul className="phone-list">
              <li className="phone-item">
                {t("phone.nav1")}
                <span style={{color: "#1978E5"}}>{t("phone.nav1-2")}</span>
                {t("phone.nav1-3")}
              </li>

              <li className="phone-item">
                {t("phone.nav2")}
              </li>

              <li className="phone-item">
                {t("phone.nav3")}
                <span style={{color: "#28AF40"}}>{t("phone.nav3-2")}</span>
                {t("phone.nav3-3")}
              </li>
            </ul>
          </div>

          <img className="phone-img" src={ASSETS.phone} alt="" />
        </div>
      </div>
      <Card />
      <Footer />
    </div>
  );
};

export default Bottom;
