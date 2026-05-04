import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { CircleCheck } from "lucide-react";
import { APP_ROUTES } from "@/router/path";
import BackButtonWithTitle from "@/components/BackButtonWithTitle/BackButtonWithTitle";

const ThankYou = () => {
  const { t } = useTranslation();

  return (
    <div className="container">
      <div className="py-4 flex flex-col">
        <BackButtonWithTitle
          className="mb-[20px]"
          title={t("thankYou.pageHeading")}
          backPath={APP_ROUTES.HOME}
        />
        <div className="mx-auto max-w-lg w-full text-center flex flex-col items-center gap-6 py-8 md:py-10">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#E8F5E9] text-[#2E7D32]">
            <CircleCheck className="h-9 w-9" aria-hidden strokeWidth={2} />
          </div>
          <div className="space-y-3">
            <h1 className="text-2xl md:text-3xl font-bold text-[#112D6C]">
              {t("thankYou.title")}
            </h1>
            <p className="text-[15px] md:text-[16px] text-[#4F7096] leading-relaxed">
              {t("thankYou.subtitle")}
            </p>
            <p className="text-sm text-[#637381]">{t("thankYou.emailHint")}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:justify-center pt-2">
            <Link
              to={APP_ROUTES.HOME}
              className="inline-flex justify-center rounded-lg bg-[#112D6C] px-6 py-3 text-[15px] font-medium text-white transition-colors hover:bg-[#0f2659]"
            >
              {t("thankYou.ctaHome")}
            </Link>
            <Link
              to={APP_ROUTES.MYESIM}
              className="inline-flex justify-center rounded-lg border-2 border-[#112D6C] px-6 py-3 text-[15px] font-medium text-[#112D6C] transition-colors hover:bg-[#112D6C]/5"
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
