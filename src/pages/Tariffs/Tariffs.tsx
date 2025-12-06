import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../components/Loader";
import SingleRegionHead from "./components/SingleRegionHead";
import TariffSection from "./components/TariffSection";
import { tariffsQuery } from "../../hooks/queries";
import { useTranslation } from "react-i18next";
import { tariffDetails } from "@/constants";
import type { TariffDetail } from "@/types/api";
import { ArrowRight } from "lucide-react";

function Tariffs() {
  const { i18n } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useQuery({
    queryKey: ["tariffs", id, i18n.language],
    queryFn: () => tariffsQuery(id!),
    enabled: !!id,
  });

  if (isLoading || !data?.success) {
    return (
      <div className="container py-8">
        <Loader />
      </div>
    );
  }

  const region = data?.data?.regions;
  const tariffs = data?.data?.tariffs;

  return (
    <div className="container py-8">
      <SingleRegionHead regions={region as any} />
      <div className="flex flex-col gap-[40px]">
        <TariffSection
          title="Локальные тарифы"
          tariffs={tariffs?.local || []}
        />
        <TariffSection
          title="Региональные тарифы"
          tariffs={tariffs?.regional || []}
        />
        <TariffSection
          title="Глобальные тарифы"
          tariffs={tariffs?.global || []}
        />
      </div>
      <div
        className={`fixed z-1 py-3 left-0 right-0 bottom-0 bg-white shadow-[0px_-6px_20px_#4F709633] border-t-[0.5px] border-[#E8EDF2]`}
      >
        <div className="container grid grid-cols-[auto_auto_1fr] gap-5">
          <div className="grid grid-cols-2 gap-[10px]">
            {tariffDetails.map((detail: TariffDetail) => (
              <div
                className="bg-[#112D6C] min-w-[160px] text-white rounded-[8px] px-2 h-[44px] flex gap-2 items-center"
                key={detail.id}
              >
                <img
                  className="w-[28px] h-[28px] object-contain shrink-0"
                  src={detail.icon}
                  alt={detail.name}
                />
                <div className="flex flex-col gap-[2px]">
                  <span className="leading-none text-base">{detail.name}</span>
                  <span className="leading-none text-xs">Есть</span>
                </div>
              </div>
            ))}
          </div>
          <div className="border-2 border-[#112D6C] rounded-[8px] flex items-center gap-5 px-5 py-2">
            <div className="flex flex-col gap-3">
              <span className="text-black font-semibold text-[14px] leading-none">
                Количество дней
              </span>
              <div className="bg-[#E8EBEE] text-[18px] font-semibold rounded-[8px] h-[40px] flex items-center justify-center w-[130px]">
                15
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-black font-semibold text-[14px] leading-none">
                Количество eSIM
              </span>
              <div className="flex gap-2 h-[40px] py-2 px-2 items-center font-semibold justify-center bg-[#E8EBEE] rounded-[8px] ">
                <button className="w-[24px] h-[24px] text-[22px] flex items-center justify-center hover:bg-[#B4BDC8] rounded">
                  -
                </button>
                <div className="w-[1px] bg-[#B4BDC8] self-stretch"></div>
                <span className="w-[40px] text-center leading-none text-[18px] ">
                  1
                </span>
                <div className="w-[1px] bg-[#B4BDC8] self-stretch"></div>
                <button className="w-[24px] h-[24px] text-[22px] flex items-center justify-center hover:bg-[#B4BDC8] rounded">
                  +
                </button>
              </div>
            </div>
          </div>
          <button className="flex items-center justify-center rounded gap-2 px-10 bg-[#112D6C] text-white font-bold text-[28px]">
            Оформить заказ <ArrowRight className="w-7 h-7" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Tariffs;
