import { useTranslation } from "react-i18next";
import React, { useState } from "react";
import type { Myesim } from "@/types/api";
import TariffHeader from "./TariffHeader";
import ActiveSimInfo from "./ActiveSimInfo";
import CartItemFooter from "./CartItemFooter";
import RegionsModal from "../../Tariffs/components/RegionsModal";

import { paymentAPI } from "@/services/api.service";
import { simFulfillment } from "@/lib/simFulfillment";
import { isAxiosError } from "axios";
import { ArrowUpRight, LoaderCircle } from "lucide-react";

interface ActiveSimCardProps {
  sim: Myesim;
  onActivate?: () => void;
  isInactive?: boolean;
}

const ActiveSimCard: React.FC<ActiveSimCardProps> = ({
  sim,
  onActivate,
  isInactive,
}) => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpeningPayment, setIsOpeningPayment] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const awaitingPayment = simFulfillment(sim) === "awaiting_payment";
  const openPayment = async () => {
    if (isOpeningPayment) return;
    setIsOpeningPayment(true);
    setPaymentError(null);
    try {
      const response = await paymentAPI.resumePayment(sim.order_id);
      const url = response.data?.data?.payment_url;
      if (typeof url !== "string" || !url.startsWith("https://")) {
        throw new Error("Missing payment URL");
      }
      window.location.assign(url);
    } catch (error) {
      const message = isAxiosError(error)
        ? error.response?.data?.message
        : null;
      setPaymentError(
        typeof message === "string"
          ? message
          : t("fulfillment.paymentLinkError"),
      );
    } finally {
      setIsOpeningPayment(false);
    }
  };
  const isFailed = sim.status === "FAILED";

  const handleOpenModal = () => {
    if (sim.regions && sim.regions.length > 0 && !isFailed) {
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleActivate = () => {
    if (!isFailed && onActivate) {
      onActivate();
    }
  };

  return (
    <>
      <div
        className={`js-product-card border flex flex-col gap-4 relative transition-all ${
          isInactive ? "border-[#101722]" : "border-transparent"
        } ${isFailed ? "ew-sim-failed" : ""}`}
      >
        <div
          className={`${
            isFailed ? "pointer-events-none" : ""
          } flex flex-col gap-4`}
        >
          <TariffHeader
            id={sim.order_id}
            image={sim.region_group.image}
            title={sim.tariff_name}
          />
          <ActiveSimInfo sim={sim} />
          {awaitingPayment && (
            <div className="ew-sim-payment">
              <button
                type="button"
                className="js-btn ew-purchase-button w-full"
                onClick={openPayment}
                disabled={isOpeningPayment}
                aria-busy={isOpeningPayment}
              >
                {isOpeningPayment ? (
                  <LoaderCircle
                    size={18}
                    className="animate-spin"
                    aria-hidden="true"
                  />
                ) : (
                  <ArrowUpRight size={18} aria-hidden="true" />
                )}
                {t(
                  isOpeningPayment
                    ? "fulfillment.openingPayment"
                    : "fulfillment.payOrder",
                )}
              </button>
              {paymentError && (
                <p role="alert" className="ew-payment-resume-error">
                  {paymentError}
                </p>
              )}
            </div>
          )}
          <CartItemFooter
            onOpenModal={handleOpenModal}
            hasRegions={!!sim.regions && sim.regions.length > 0}
            onActivate={sim.can_activate ? handleActivate : undefined}
            disabled={isFailed}
          />
        </div>
      </div>

      <RegionsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        regions={sim.regions || []}
        title={`${t("jetstream.coverage")}: ${sim.tariff_name}`}
      />
    </>
  );
};

export default ActiveSimCard;
