import { apiFailure } from "@/lib/apiFailure";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { formatNumber } from "@/lib/utils";
import { useAuthStore } from "@/store/authStore";
import { paymentAPI, promoCodeAPI } from "@/services/api.service";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { APP_ROUTES } from "@/router/path";

interface PaymentFormProps {
  totalPrice: number;
}

type AppliedPromo = {
  code: string;
  discount_amount: number;
  total_amount: number;
  final_amount: number;
};

const PaymentForm = ({ totalPrice }: PaymentFormProps) => {
  const { t } = useTranslation();
  const { isAuthenticated } = useAuthStore();
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [promoError, setPromoError] = useState("");
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);
  const [appliedPromo, setAppliedPromo] = useState<AppliedPromo | null>(null);
  const revalidateTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  const finalPrice = appliedPromo?.final_amount ?? totalPrice;

  const validatePromo = useCallback(
    async (code: string, options: { silent?: boolean } = {}) => {
      const trimmedCode = code.trim();

      if (!isAuthenticated) {
        toast.error(t("everywhere.loginFirst"));
        return;
      }

      if (!trimmedCode) {
        setPromoError(t("everywhere.enterPromo"));
        return;
      }

      setIsApplyingPromo(true);
      setPromoError("");

      try {
        const response = await promoCodeAPI.validate({ code: trimmedCode });

        if (response.data.success) {
          setAppliedPromo(response.data.data);
          setPromoCode(response.data.data.code);
          if (!options.silent) {
            toast.success(
              response.data.message || t("everywhere.promoApplied"),
            );
          }
        } else {
          const message = response.data.message || t("everywhere.promoInvalid");
          setAppliedPromo(null);
          setPromoError(message);
          if (options.silent) {
            toast.error(message);
          }
        }
      } catch (cause: unknown) {
        const error = apiFailure(cause);
        const message =
          error.response?.data?.message || t("everywhere.promoInvalid");
        setAppliedPromo(null);
        setPromoError(message);
        if (options.silent) {
          toast.error(message);
        }
      } finally {
        setIsApplyingPromo(false);
      }
    },
    [isAuthenticated, t],
  );

  useEffect(() => {
    if (!appliedPromo?.code) return;
    if (appliedPromo.total_amount === totalPrice) return;

    if (revalidateTimeoutRef.current) {
      clearTimeout(revalidateTimeoutRef.current);
    }

    revalidateTimeoutRef.current = setTimeout(() => {
      validatePromo(appliedPromo.code, { silent: true });
    }, 700);

    return () => {
      if (revalidateTimeoutRef.current) {
        clearTimeout(revalidateTimeoutRef.current);
      }
    };
  }, [
    totalPrice,
    appliedPromo?.code,
    appliedPromo?.total_amount,
    validatePromo,
  ]);

  const handlePromoChange = (value: string) => {
    const normalizedValue = value.toUpperCase().replace(/[^A-Z0-9]/g, "");
    setPromoCode(normalizedValue);
    setPromoError("");

    if (appliedPromo && normalizedValue !== appliedPromo.code) {
      setAppliedPromo(null);
    }
  };

  const handleApplyPromo = async () => {
    await validatePromo(promoCode);
  };

  const handleClearPromo = () => {
    setPromoCode("");
    setPromoError("");
    setAppliedPromo(null);
  };

  const handlePayment = async () => {
    if (!agreedToTerms) {
      toast.error(t("everywhere.agreeTerms"));
      return;
    }

    if (!isAuthenticated) {
      toast.error(t("everywhere.loginFirst"));
      return;
    }

    setIsProcessingPayment(true);
    try {
      const origin = window.location.origin;
      const response = await paymentAPI.preparePayment({
        success_url: `${origin}${APP_ROUTES.THANK_YOU}`,
        failure_url: `${origin}${APP_ROUTES.PAYMENT}`,
        ...(appliedPromo ? { promo_code: appliedPromo.code } : {}),
      });
      if (response.data.success) {
        const paymentUrl = response.data.data?.payment_url;
        if (paymentUrl) {
          // Open payment URL in new tab
          window.open(paymentUrl, "_self");
        } else {
          toast.error(t("everywhere.paymentUrlMissing"));
        }
      } else {
        toast.error(response.data.message || t("everywhere.paymentFailed"));
      }
    } catch (cause: unknown) {
      const error = apiFailure(cause);
      toast.error(
        error.response?.data?.message || t("everywhere.paymentFailed"),
      );
    } finally {
      setIsProcessingPayment(false);
    }
  };

  return (
    <div className="ew-payment-content flex flex-col gap-6">
      <div className="js-payment-method">
        <span className="js-bank-mark">T</span>
        <div>
          <strong>{t("jetstream.paymentMethod")}</strong>
          <p className="js-small">{t("jetstream.paymentOnce")}</p>
        </div>
      </div>
      <details className="ew-promo">
        <summary>
          {t("jetstream.promo")}
          <span aria-hidden="true">+</span>
        </summary>
        <label htmlFor="promo-code" className="sr-only">
          {t("jetstream.promo")}
        </label>
        <div className="flex gap-2 mt-2">
          <input
            id="promo-code"
            className="js-input min-w-0"
            type="text"
            value={promoCode}
            onChange={(e) => handlePromoChange(e.target.value)}
            placeholder={t("jetstream.promoPlaceholder")}
            minLength={4}
            maxLength={32}
          />
          {appliedPromo ? (
            <button
              type="button"
              className="js-btn js-btn--outline"
              onClick={handleClearPromo}
            >
              {t("jetstream.remove")}
            </button>
          ) : (
            <button
              type="button"
              className="js-btn"
              onClick={handleApplyPromo}
              disabled={!promoCode.trim() || isApplyingPromo}
            >
              {t(isApplyingPromo ? "jetstream.checking" : "jetstream.apply")}
            </button>
          )}
        </div>
        {promoError && (
          <p role="alert" className="text-red-700 text-sm mt-2">
            {promoError}
          </p>
        )}
      </details>
      {appliedPromo && (
        <div className="js-summary-line">
          <span>{t("jetstream.discount")}</span>
          <strong>−{formatNumber(appliedPromo.discount_amount)} ₽</strong>
        </div>
      )}
      <div className="js-summary-total">
        <span>{t("jetstream.total")}</span>
        <strong>{formatNumber(finalPrice)} ₽</strong>
      </div>
      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={agreedToTerms}
          onChange={(e) => setAgreedToTerms(e.target.checked)}
          className="mt-1 w-5 h-5 shrink-0 accent-blue-600"
        />
        <span className="js-small">
          {t("jetstream.paymentAgreement")}{" "}
          <Link
            className="underline"
            to={APP_ROUTES.PUBLIC_OFFER}
            target="_blank"
          >
            {t("jetstream.offer")}
          </Link>{" "}
          ·{" "}
          <Link
            className="underline"
            to={APP_ROUTES.REFUND_POLICY}
            target="_blank"
          >
            {t("jetstream.refund")}
          </Link>
        </span>
      </label>
      <button
        onClick={handlePayment}
        disabled={
          !agreedToTerms ||
          isProcessingPayment ||
          !isAuthenticated ||
          isApplyingPromo
        }
        className="js-btn ew-purchase-button w-full"
      >
        {t(
          isApplyingPromo
            ? "jetstream.checking"
            : isProcessingPayment
              ? "jetstream.processing"
              : "jetstream.pay",
        )}{" "}
        {!isProcessingPayment &&
          !isApplyingPromo &&
          `${formatNumber(finalPrice)} ₽`}
      </button>
      {!isAuthenticated && (
        <p className="js-small">{t("jetstream.paymentLogin")}</p>
      )}
    </div>
  );
};
export default PaymentForm;
