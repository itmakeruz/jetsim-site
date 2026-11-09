import { hasEsimAcknowledgement } from "@/lib/esimAcknowledgement";
import { useState } from "react";
import {
  Info,
  Minus,
  Plus,
  ArrowRight,
  Globe2,
  ChevronRight,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import type { Tariff } from "@/types/api";
import { getImageUrl } from "@/config/imageUtils";
import { useTariffStore } from "@/store/tariffStore";
import RegionsModal from "./RegionsModal";
import DescriptionModal from "./DescriptionModal";
import ESIMSupportModal from "./ESIMSupportModal";

export default function TariffCard({ tariff }: { tariff: Tariff }) {
  const [coverage, setCoverage] = useState(false);
  const [description, setDescription] = useState(false);
  const [compatibility, setCompatibility] = useState(false);
  const { t, i18n } = useTranslation();
  const {
    selectedTariffs,
    setSelectedTariff,
    increaseQuantity,
    decreaseQuantity,
  } = useTariffStore();
  const quantity =
    selectedTariffs.find((item) => item.id === tariff.id)?.quantity ?? 0;
  const add = () => {
    increaseQuantity(tariff);
    setSelectedTariff(tariff);
  };
  const allowance =
    tariff.quantity_internet < 0 || tariff.quantity_internet >= 999
      ? t("jetstream.unlimited")
      : tariff.quantity_internet;
  return (
    <>
      <article
        className="js-plan"
        data-selected={quantity > 0}
        id={`plan-${tariff.id}`}
      >
        <header className="js-plan-head">
          {tariff.region_group?.image && (
            <img
              src={getImageUrl(tariff.region_group.image)}
              alt=""
              width="38"
              height="38"
              loading="lazy"
            />
          )}
          <h3>{tariff.name}</h3>
          {tariff.description && (
            <button
              type="button"
              className="js-icon-btn"
              aria-label={`${t("jetstream.details")}: ${tariff.name}`}
              onClick={() => setDescription(true)}
            >
              <Info size={15} />
            </button>
          )}
        </header>
        <div className="ew-plan-spec">
          <div className="js-plan-data">
            <strong
              className={typeof allowance === "string" ? "ew-unlimited" : ""}
            >
              {allowance}
            </strong>
            {typeof allowance === "number" && <span>{t("jetstream.gb")}</span>}
            <small>{t("everywhere.mobileData")}</small>
          </div>
          <div className="ew-plan-term">
            <strong>{tariff.validity_period}</strong>
            <span>{t("jetstream.days")}</span>
          </div>
        </div>
        <div className="js-plan-meta">
          {tariff.is_4g && <span>4G</span>}
          {tariff.is_5g && <span>5G</span>}
          {tariff.quantity_sms > 0 && <span>{tariff.quantity_sms} SMS</span>}
          {tariff.quantity_minute > 0 && (
            <span>
              {tariff.quantity_minute} {t("everywhere.minutes")}
            </span>
          )}
        </div>
        <button
          type="button"
          className="js-plan-coverage"
          onClick={() => setCoverage(true)}
          disabled={!tariff.regions?.length}
        >
          <Globe2 size={15} />
          {t("jetstream.coverage")}
          {tariff.regions?.length ? ` · ${tariff.regions.length}` : ""}
          <ChevronRight size={14} />
        </button>
        <div className="ew-plan-purchase">
          <div className="js-plan-price">
            <strong>
              {tariff.price_sell.toLocaleString(
                i18n.language.startsWith("en") ? "en-US" : "ru-RU",
              )}{" "}
              ₽
            </strong>
            <span>{t("jetstream.priceOnce")}</span>
          </div>
          {quantity ? (
            <div className="js-quantity">
              <button
                type="button"
                onClick={() => decreaseQuantity(tariff)}
                aria-label={t("jetstream.less")}
              >
                <Minus size={16} />
              </button>
              <span>
                {t("jetstream.inCart")}: {quantity}
              </span>
              <button
                type="button"
                onClick={() => increaseQuantity(tariff)}
                aria-label={t("jetstream.more")}
              >
                <Plus size={16} />
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="js-btn ew-add-plan"
              onClick={() =>
                hasEsimAcknowledgement() ? add() : setCompatibility(true)
              }
            >
              {t("everywhere.add")}
              <ArrowRight size={16} />
            </button>
          )}
        </div>
      </article>
      <RegionsModal
        isOpen={coverage}
        onClose={() => setCoverage(false)}
        regions={tariff.regions ?? []}
        title={`${t("jetstream.coverage")}: ${tariff.name}`}
      />
      <DescriptionModal
        isOpen={description}
        onClose={() => setDescription(false)}
        title={tariff.name}
        description={tariff.description ?? ""}
      />
      <ESIMSupportModal
        isOpen={compatibility}
        onClose={() => setCompatibility(false)}
        onConfirm={add}
      />
    </>
  );
}
