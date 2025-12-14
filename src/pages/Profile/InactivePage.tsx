import { useTranslation } from "react-i18next";
import ActiveSimCard from "./components/ActiveSimCard";
import Empty from "../Empty/Empty";
import { useSimcardStore } from "@/store/simcardStore";
import { useState } from "react";
import type { ActiveSim } from "@/types/api";
import { getImageUrl } from "@/config/imageUtils";
import { ASSETS } from "@/assets";

const InactivePage = () => {
  const { t } = useTranslation();
  const { inactiveSims } = useSimcardStore();
  const [activeSim, setActiveSim] = useState<ActiveSim | null>(null);

  if (inactiveSims.length === 0) {
    return <Empty text={t("my.no_orders") || "Нет активных SIM-карт"} />;
  }

  return (
    <div className="flex flex-col gap-5 pb-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 2xl:gap-5 gap-4">
        {inactiveSims.map((sim) => (
          <ActiveSimCard
            key={sim.id}
            sim={sim}
            isInactive={activeSim?.id === sim.id}
            onActivate={() => setActiveSim(sim)}
          />
        ))}
      </div>
      {activeSim && (
        <div className="grid grid-cols-[1fr_auto_1fr] gap-4 h-[245px] mt-5">
          <div className="flex flex-col gap-[10px]">
            <div className="flex items-center gap-[10px] py-[25px] pr-4 bg-linear border-b border-[#0000004D]">
              <img
                className="w-[45px] h-[45px] object-contain"
                src={ASSETS.apple}
                alt=""
              />
              <div className="flex flex-col gap-[2px] font-medium">
                <h6 className="flex items-center gap-[5px]">
                  <svg
                    width="9"
                    height="9"
                    viewBox="0 0 9 9"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      y="4.24264"
                      width="6"
                      height="6"
                      rx="0.781443"
                      transform="rotate(-45 0 4.24264)"
                      fill="black"
                    />
                  </svg>
                  Настройки → Сотовая связь → Добавить тариф
                </h6>
                <h6 className="flex items-center gap-[5px]">
                  <svg
                    width="9"
                    height="9"
                    viewBox="0 0 9 9"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      y="4.24264"
                      width="6"
                      height="6"
                      rx="0.781443"
                      transform="rotate(-45 0 4.24264)"
                      fill="black"
                    />
                  </svg>{" "}
                  Отсканируйте QR-код выше
                </h6>
                <h6 className="flex items-center gap-[5px]">
                  <svg
                    width="9"
                    height="9"
                    viewBox="0 0 9 9"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      y="4.24264"
                      width="6"
                      height="6"
                      rx="0.781443"
                      transform="rotate(-45 0 4.24264)"
                      fill="black"
                    />
                  </svg>
                  Или используйте ссылку ниже
                </h6>
              </div>
            </div>
            <div className="flex items-center gap-[10px] py-[25px] pr-4 bg-linear border-b border-[#0000004D]">
              <img
                className="w-[45px] h-[45px] object-contain"
                src={ASSETS.android}
                alt=""
              />
              <div className="flex flex-col gap-[2px] font-medium">
                <h6 className="flex items-center gap-[5px]">
                  <svg
                    width="9"
                    height="9"
                    viewBox="0 0 9 9"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      y="4.24264"
                      width="6"
                      height="6"
                      rx="0.781443"
                      transform="rotate(-45 0 4.24264)"
                      fill="black"
                    />
                  </svg>{" "}
                  Настройки → Сотовая связь → Добавить тариф
                </h6>
                <h6 className="flex items-center gap-[5px]">
                  <svg
                    width="9"
                    height="9"
                    viewBox="0 0 9 9"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      y="4.24264"
                      width="6"
                      height="6"
                      rx="0.781443"
                      transform="rotate(-45 0 4.24264)"
                      fill="black"
                    />
                  </svg>{" "}
                  Отсканируйте QR-код выше
                </h6>
                <h6 className="flex items-center gap-[5px]">
                  <svg
                    width="9"
                    height="9"
                    viewBox="0 0 9 9"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      y="4.24264"
                      width="6"
                      height="6"
                      rx="0.781443"
                      transform="rotate(-45 0 4.24264)"
                      fill="black"
                    />
                  </svg>{" "}
                  Или используйте ссылку ниже
                </h6>
              </div>
            </div>
          </div>
          <div className="border border-[#0000004D] rounded-[12px] overflow-hidden aspect-square">
            <img
              className="w-full h-full object-contain"
              src={getImageUrl(activeSim.qr_code)}
              alt=""
            />
          </div>
          <div className="flex flex-col gap-[10px]">
            <div className="flex flex-col gap-2 bg-linear border-b border-[#0000004D] h-full pr-[30px]">
              <h2 className="text-base font-medium text-[#2f2d2d]">
                Данные SIM:
              </h2>
              <div className="flex flex-col gap-1 text-[14px] text-[#2f2d2d] font-normal">
                <div className="flex items-center justify-between">
                  <span>ICCID:</span>
                  <span>89812003919118650899</span>
                </div>
                <hr className="bg-[#E4E4E4]" />
                <div className="flex items-center justify-between">
                  <span>UID:</span>
                  <span>19118650899</span>
                </div>
                <hr className="bg-[#E4E4E4]" />
                <div className="flex items-center justify-between">
                  <span>PUK:</span>
                  <span>89812003919118650899</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 bg-linear border-b border-[#0000004D] h-full pr-[30px]">
              <h2 className="text-base font-medium text-[#2f2d2d]">
                Служба поддержки:
              </h2>
              <div className="flex flex-col gap-1 text-[14px] text-[#2f2d2d] font-normal">
                <div className="flex items-center justify-between">
                  <span>Номер телефона:</span>
                  <span>+71 50 123 454 45</span>
                </div>
                <hr className="bg-[#E4E4E4]" />
                <div className="flex items-center justify-between">
                  <span>Телеграм-бот:</span>
                  <span>@JetSim</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InactivePage;
