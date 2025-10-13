import React from "react";
import { useTranslation } from "react-i18next";
import "./SimCard.css";
import { Plus } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { ASSETS } from "../../assets";

interface Plan {
  type: string;
  traffic: string;
  cost: string;
  network: string[];
  status: string;
}

interface My {
  type: string;
  remaining: string;
  traffic: string;
  network: string[];
  status: string;
}

interface History {
  traffic: string;
  network: string[];
  srok: string;
  status: string;
  time: string;
}

interface SimCardProps {
  flag: string;
  country: string;
  plans?: Plan[];
  type?: string;
  myPlans?: My[];
  historyPlans?: History[];
}

const SimCard: React.FC<SimCardProps> = ({
  flag,
  country,
  plans,
  myPlans,
  historyPlans,
  type = "default",
}) => {
  const { t } = useTranslation();
  const { addToCart } = useCart();
  console.log(myPlans);

  const handlePlusClick = (plan: Plan) => {
    addToCart(country, plan, flag);
  };

  if (type == "my") {
    return (
      <div className="my-card">
        {myPlans?.map((plan, index) => (
          <div key={index} className="plan-item">
            <div className="my-together">
              <div>
                <h1 className="my-name">{country}</h1>
                <div className="plan-info">
                  <p>{t("sims.tarif")}</p> <h3>{t(`sims.${plan.type}`)}</h3>
                </div>
              </div>
              <div className="my-flag">{`${plan?.flag}`}</div>
            </div>

            <div className="my-info">
              <p>{t("sims.trafic")} </p>{" "}
              <div className="my-info-div">
                <div className="my-traffic">{plan.traffic}</div>
              </div>
            </div>
            <div className="my-info">
              <p>{t("sims.remains")} </p>{" "}
              <div className="my-info-div">
                <div className="my-traffic">
                  {plan.remaining} {t("sims.days")}
                </div>
              </div>
            </div>
            <div className="my-info">
              <p>{t("sims.set")}</p>
              <div className="my-network-wrapper">
                {plan.network.map((net, idx) => (
                  <div key={idx} className="my-network-item">
                    <h3>{net}</h3>
                  </div>
                ))}
              </div>
            </div>
            <div className="plan-wrapp">
              <div className="plan-img-wrap">
                <img className="country-1" src={ASSETS.country1} alt="" />
                <img className="country-2" src={ASSETS.country2} alt="" />
                <img className="country-3" src={ASSETS.country3} alt="" />
                <img className="country-4" src={ASSETS.country4} alt="" />
              </div>
              <a href="#">{t(`sims.${plan.status}`)}</a>
            </div>

            <div className="my-qr">
              <div className="my-qr1">
                <p className="my-qr-text">{t("sims.qr")}</p>
                <img src={ASSETS.qr} alt="" />
              </div>

              <div className="my-share">
                <img src={ASSETS.share} alt="" />
              </div>
            </div>

            <p className="my-warning">{t("sims.warning")}</p>
          </div>
        ))}
      </div>
    );
  }

  if (type == "history") {
    return (
      <div className="my-card">
        {historyPlans?.map((plan, index) => (
          <div key={index} className="plan-item">
            <div className="history-together">
              <div className="flag">{flag}</div>
              <div className="country-name">{country}</div>
            </div>
            <div className="plan-info">
              <p>{t("sims.trafic")} </p> <h3>{plan.traffic}</h3>
            </div>
            <div className="plan-info">
              <p>{t("sims.srok")} </p>{" "}
              <h3>
                {plan.srok} {t("sims.days")}
              </h3>
            </div>
            <div className="plan-info">
              <p>{t("sims.set")}</p>
              {plan.network.map((net, idx) => (
                <h3 key={idx}> {net}</h3>
              ))}
            </div>
            <div className="plan-info">
              <p>{t("sims.time")} </p> <h3>{plan.time}</h3>
            </div>

            <div className="plan-info">
              <p>{t("sims.check")} </p>
              <div className="history-wrapper">
                <div className="history-btn">{t("sims.download")}</div>

                <div className="history-btn">{t("sims.view")}</div>
              </div>
            </div>
            <div className="plan-wrapp">
              <div className="plan-img-wrap">
                <img className="country-1" src={ASSETS.country1} alt="" />
                <img className="country-2" src={ASSETS.country2} alt="" />
                <img className="country-3" src={ASSETS.country3} alt="" />
                <img className="country-4" src={ASSETS.country4} alt="" />
              </div>
              <a href="#">{t(`sims.${plan.status}`)}</a>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="country-card">
      <div className="country-wrapper">
        <div className="flag">{flag}</div>
        <div className="country-name">{country}</div>
      </div>
      <div className="plans">
        {plans?.map((plan, index) => (
          <div key={index} className="plan-item">
            <div className="plan-item-w">
              <div className="plan-item-h">
                <h3>{t(`sims.${plan.type}`)}</h3>
              </div>
              <div className="plan-plus" onClick={() => handlePlusClick(plan)}>
                <div className="plan-p">
                  <Plus color="#FFFFFF" size={10} />
                </div>
              </div>
            </div>
            <div className="plan-info">
              <p>{t("sims.trafic")} </p> <h3>{plan.traffic}</h3>
            </div>
            <div className="plan-info">
              <p>{t("sims.price")}</p> <h3>{plan.cost}</h3>
            </div>
            <div className="plan-info">
              <p>{t("sims.set")}</p> <h3>{plan.network}</h3>
            </div>
            <div className="plan-wrapp">
              <div className="plan-img-wrap">
                <img className="country-1" src={ASSETS.country1} alt="" />
                <img className="country-2" src={ASSETS.country2} alt="" />
                <img className="country-3" src={ASSETS.country3} alt="" />
                <img className="country-4" src={ASSETS.country4} alt="" />
              </div>
              <a href="#">{t(`sims.${plan.status}`)}</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimCard;
