import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { CircleCheck } from "lucide-react";
import { APP_ROUTES } from "@/router/path";
import BackButtonWithTitle from "@/components/BackButtonWithTitle/BackButtonWithTitle";

const ThankYou = () => {
  const { t } = useTranslation();

  return (
    <div className="container js-page">
      <div className="py-4 flex flex-col">
        <BackButtonWithTitle
          className="mb-[20px]"
          title={t("thankYou.pageHeading")}
          backPath={APP_ROUTES.HOME}
        />
        <div className="js-panel js-success mx-auto max-w-2xl w-full text-center flex flex-col items-center gap-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#E8F5E9] text-[#2E7D32]">
            <CircleCheck className="h-9 w-9" aria-hidden strokeWidth={2} />
          </div>
          <div className="space-y-3">
            <h2 className="text-3xl font-semibold tracking-tight">
              {t("thankYou.title")}
            </h2>
            <p className="text-[15px] md:text-[16px] text-[#667085] leading-relaxed">
              {t("thankYou.subtitle")}
            </p>
            <p className="text-sm text-[#637381]">{t("thankYou.emailHint")}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:justify-center pt-2">
            <Link
              to={APP_ROUTES.HOME}
              className="inline-flex justify-center rounded-lg bg-[#101722] px-6 py-3 text-[15px] font-medium text-white transition-colors hover:bg-[#0f2659]"
            >
              {t("thankYou.ctaHome")}
            </Link>
            <Link
              to={APP_ROUTES.MYESIM}
              className="inline-flex justify-center rounded-lg border-2 border-[#101722] px-6 py-3 text-[15px] font-medium text-[#101722] transition-colors hover:bg-[#101722]/5"
            >
              {t("thankYou.ctaOrders")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
