import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../components/Loader";
import SingleRegionHead from "./components/SingleRegionHead";
import TariffSection from "./components/TariffSection";
import TariffBottomBar from "./components/TariffBottomBar";
import { tariffsQuery, tariffsByRegionIdsQuery } from "../../hooks/queries";
import { useTranslation } from "react-i18next";
import { useTariffStore } from "@/store/tariffStore";
import { useEffect } from "react";
import Empty from "@/pages/Empty/Empty";

function Tariffs() {
  const { i18n } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const { selectedTariff, setSelectedTariff } = useTariffStore();

  const isRegionIds = id?.startsWith("ids=");
  const regionIds = isRegionIds ? id?.replace("ids=", "") : null;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["tariffs", id, i18n.language],
    queryFn: () => {
      if (isRegionIds && regionIds) {
        return tariffsByRegionIdsQuery(regionIds);
      }
      return tariffsQuery(id!);
    },
    enabled: !!id,
  });

  useEffect(() => {
    if (selectedTariff) {
      setSelectedTariff(null);
    }
  }, []);
  if (isLoading) {
    return (
      <div className="container py-8">
        <Loader />
      </div>
    );
  }

  const region = data?.data?.regions;
  const tariffs = data?.data?.tariffs;
  if (isError) {
    return <Empty />;
  }
  return (
    <div className={`container py-8 ${selectedTariff ? "pb-[150px]" : ""}`}>
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
      {selectedTariff && <TariffBottomBar />}
    </div>
  );
}

export default Tariffs;
