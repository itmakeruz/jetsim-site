import { ANIMATIONS } from "@/assets/animations";
import Lottie from "lottie-react";
import { useTranslation } from "react-i18next";

export default function Empty({ text }: { text: string }) {
  const { t } = useTranslation();
  return (
    <div className="flex items-center justify-center grow">
      <div className="text-center w-full container">
        <div className="max-w-[900px] mx-auto">
          <div className="mb-6 flex flex-col items-center justify-center">
            <Lottie
              animationData={ANIMATIONS.empty}
              loop={true}
              style={{ width: 500, height: 300 }}
            />
          </div>
          <h1 className="md:text-[24px] text-[16px] font-bold leading-[1.4] text-gray-800 mb-4">
            {text}
          </h1>

          <div className="space-x-4">
            <button
              onClick={() => (window.location.href = "/")}
              className="bg-[#112D6C] w-full text-white px-6 py-3 rounded-sm"
            >
              {t("error.back_to_list")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
