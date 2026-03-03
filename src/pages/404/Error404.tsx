import { useTranslation } from "react-i18next";
import { ANIMATIONS } from "@/assets/animations";
import Lottie from "lottie-react";

export default function Error404() {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <div className="mb-6 flex flex-col items-center justify-center">
          <Lottie
            animationData={ANIMATIONS.notFound}
            loop={true}
            style={{ width: 300, height: 300 }}
          />
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          {t("error.notFound.title")}
        </h1>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          {t("error.notFound.description")}
        </p>
        <div className="space-x-4">
          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 bg-[#1978E5] text-white rounded-sm hover:bg-[#1978E5]/80 transition-colors"
          >
            {t("error.notFound.back")}
          </button>
          <button
            onClick={() => (window.location.href = "/")}
            className="px-6 py-3 bg-gray-600 text-white rounded-sm hover:bg-gray-700/80 transition-colors"
          >
            {t("error.notFound.home")}
          </button>
        </div>
      </div>
    </div>
  );
}
