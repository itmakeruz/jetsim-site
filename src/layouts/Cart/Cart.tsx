import "./Cart.css";
import { useCart } from "../../context/CartContext";
import { useTranslation } from "react-i18next";
import { Plus } from "lucide-react";
import { useState } from "react";
import { APP_ROUTES } from "../../router/path";
import { ASSETS } from "../../assets";

export const CartRender = () => {
  const { t } = useTranslation();
  const { cartItems } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBuyClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="cart-page">
      {cartItems.length === 0 ? (
        <p>{t("profile.cart.empty")}</p>
      ) : (
        <div className="cart-items">
          {cartItems.map((item, index) => (
            <div key={index} className="cart-item">
              <div className="cart-item-header">
                <div className="cart-wrapper">
                  <span className="flag">{item.flag}</span>
                  <h3 className="name">{t(`sims.${item.country}`)}</h3>
                </div>
                <input className="inputt" type="checkbox" />
              </div>
              <div className="cart-item-details">
                <p>
                  {t("sims.trafic")} {item.plan.traffic}
                </p>
                <p>
                  {t("sims.srok")} {item.plan.cost}
                </p>
                <p>
                  {t("sims.set")} {item.plan.network}
                </p>
              </div>
              <div className="plan-wrapp">
                <div className="plan-img-wrap">
                  <img className="country-1" src={ASSETS.country1} alt="" />
                  <img className="country-2" src={ASSETS.country2} alt="" />
                  <img className="country-3" src={ASSETS.country3} alt="" />
                  <img className="country-4" src={ASSETS.country4} alt="" />
                </div>
                <a className="plan-img-btn" href="#">{t(`sims.${item.plan.status}`)}</a>
              </div>
              <div className="plan-item-w">
                <div className="plan-item-h">
                  <h3>{t(`sims.${item.plan.type}`)}</h3>
                </div>
                <div className="plan-plus">
                  <div className="plan-p">
                    <Plus color="#FFFFFF" size={10} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <button className="buy-button" onClick={handleBuyClick}>
        {t("profile.cart.buy")}
      </button>

      {/* MODAL */}

      {isModalOpen && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>{t("profile.payment.title")}</h2>
            <button className="close-button" onClick={handleCloseModal}>
              ×
            </button>

            <div className="modal-body">
              <div className="payment">
                <h2>{t("profile.payment.type")}</h2>
                <div className="payment-options">
                  <div className="payment-o-wrapper">
                    <label className="payment-label">
                      <input
                        className="radio-input"
                        type="radio"
                        name="payment"
                        value="debit"
                        defaultChecked
                      />{" "}
                      DebitCard
                    </label>

                    <div className="payment-infos">
                      <input
                        className="payment-inputs"
                        type="text"
                        placeholder="card number"
                        name=""
                        id=""
                      />

                      <div className="payment-info-wrapper">
                        <input
                          className="payment-inputs w-yarim"
                          type="text"
                          placeholder="cvv"
                          name=""
                          id=""
                        />
                        <input
                          className="payment-inputs w-yarim"
                          type="text"
                          placeholder="mm/yyyy"
                          name=""
                          id=""
                        />
                      </div>

                      <input
                        className="payment-inputs"
                        type="text"
                        placeholder="CardHolder name"
                        name=""
                        id=""
                      />
                    </div>
                  </div>
                  <div className="payment-o-wrapper">
                    <label className="payment-label">
                      <input
                        className="radio-input"
                        type="radio"
                        name="payment"
                        value="paypal"
                      />{" "}
                      PayPal
                    </label>
                  </div>
                </div>
              </div>

              <div className="modal-cart-items">
                <h2>{t("profile.payment.order")}</h2>
                {cartItems.map((item, index) => (
                  <div key={index} className="cart-item">
                    <div className="cart-wrapper">
                      <span className="flag">{item.flag}</span>
                      <h3 className="name">{t(`sims.${item.country}`)}</h3>
                    </div>
                    <div className="cart-item-details">
                      <p>
                        {t("sims.trafic")} {item.plan.traffic}
                      </p>
                      <p>
                        {t("sims.srok")} {item.plan.cost}
                      </p>
                      <p>
                        {t("sims.set")} {item.plan.network}
                      </p>
                    </div>
                    <a className="cart-detail" href="#">
                      {t(`sims.${item.plan.status}`)}
                    </a>
                    <div className="plan-item-w">
                      <div className="plan-item-h">
                        <h3>{t(`sims.${item.plan.type}`)}</h3>
                      </div>
                      <div className="plan-plus">
                        <div className="plan-p">
                          <Plus color="#FFFFFF" size={10} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="promokod">
                  <p className="promokod-text">
                    {t("profile.payment.promokod")}
                  </p>

                  <div className="promokod-wrap">
                    <input
                      className="promokod-input"
                      type="text"
                      name="kupon"
                      placeholder={t("profile.payment.code")}
                      id=""
                    />
                    <button className="promokod-btn" type="submit">
                      {t("profile.payment.apply")}
                    </button>
                  </div>

                  <h1 className="total">
                    {t("profile.payment.overall")} $4.99
                  </h1>
                </div>
              </div>
            </div>

            <div className="accept">
              <input type="checkbox" name="agree" id="" />
              <p className="accept-text">{t("profile.payment.okey")}</p>
            </div>

            <button className="modal-accept" type="submit">
              {t("modal.accept")}
            </button>

            <ul className="modal-list">
              <a href={APP_ROUTES.CONFIDENTIAL}>{t("modal.nav1")}</a>
              <a href={APP_ROUTES.OFERTA}>{t("modal.nav2")}</a>
              <a href={APP_ROUTES.USLOVIYA}>{t("modal.nav3")}</a>
              <a href={APP_ROUTES.RULE}>{t("modal.nav4")}</a>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
