import { ASSETS } from "../../assets";
import { useTranslation } from "react-i18next";
import "./Card.css";

const Card = () => {
  const { t } = useTranslation();

  return (
    <div className="card">
      <h1 className="card-heading">{t("card.heading")}</h1>

      <div className="card-w">
        <div>
          <div className="card-card card-green">
            <div className="card-wrapper">
              <h2 className="card-c-heading">{t("card.card1-h")}</h2>

              <p className="card-text">{t("card.card1-t")}</p>
            </div>

            <img className="card-img" src={ASSETS.card1} alt="" />
          </div>

          <div className="card-card card-purple">
            <img className="card-img" src={ASSETS.card2} alt="" />
            <div className="card-wrapper">
              <h2 className="card-c-heading">{t("card.card2-h")}</h2>

              <p className="card-text">{t("card.card2-t")}</p>
            </div>
          </div>

          <div className="card-card card-green">
            <div className="card-wrapper">
              <h2 className="card-c-heading">{t("card.card3-h")}</h2>

              <p className="card-text">{t("card.card3-t")}</p>
            </div>

            <img className="card-img" src={ASSETS.card3} alt="" />
          </div>
        </div>

        <img className="card-logo" src={ASSETS.loginlogo} alt="" />

        <div>
          <div className="card-card-r card-green">
            <div className="card-wrapper">
              <h2 className="card-c-heading">{t("card.card4-h")}</h2>

              <p className="card-text">{t("card.card4-t")}</p>
            </div>

            <img className="card-img" src={ASSETS.card4} alt="" />
          </div>

          <div className="card-card-r card-purple">
            <img className="card-img" src={ASSETS.card5} alt="" />
            <div className="card-wrapper">
              <h2 className="card-c-heading">{t("card.card5-h")}</h2>

              <p className="card-text">{t("card.card5-t")}</p>
            </div>
          </div>

          <div className="card-card-r card-green">
            <div className="card-wrapper">
              <h2 className="card-c-heading">{t("card.card6-h")}</h2>

              <p className="card-text">{t("card.card6-t")}</p>
            </div>

            <img className="card-img" src={ASSETS.card6} alt="" />
          </div>
        </div>
      </div>

     <div className="container">
     <div className="card-sm">
            <p>
                {t("card.us")}
            </p>

            <div>
                <img src={ASSETS.facebook} className="card-sm-img" alt="" />
                <img src={ASSETS.x} className="card-sm-img" alt="" />
                <img src={ASSETS.inst} className="card-sm-img" alt="" />
                <img src={ASSETS.linkendin} className="card-sm-img" alt="" />
                <img src={ASSETS.yt} className="card-sm-img" alt="" />
                <img src={ASSETS.snpachat} className="card-sm-img" alt="" />
                <img src={ASSETS.theards} className="card-sm-img" alt="" />
                <img src={ASSETS.whatsapp} className="card-sm-img" alt="" />
                <img src={ASSETS.game} className="card-sm-img" alt="" />
                <img src={ASSETS.tt} className="card-sm-img" alt="" />
                <img src={ASSETS.t} className="card-sm-img" alt="" />
                <img src={ASSETS.telegram} className="card-sm-img" alt="" />
                <img src={ASSETS.vk} className="card-sm-img" alt="" />
            </div>
      </div>
     </div>
    </div>
  );
};

export default Card;