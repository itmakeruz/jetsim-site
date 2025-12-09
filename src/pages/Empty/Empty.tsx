import { ANIMATIONS } from "@/assets/animations";
import Lottie from "lottie-react";

export default function Empty() {
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
          <h1 className="text-[24px] font-bold text-gray-800 mb-4">
            Этот тариф не найден. Возможно, вы посмотрите список.
          </h1>

          <div className="space-x-4">
            <button
              onClick={() => (window.location.href = "/")}
              className="bg-[#112D6C] w-full text-white px-6 py-3 rounded-sm"
            >
              Вернуться к списку
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
