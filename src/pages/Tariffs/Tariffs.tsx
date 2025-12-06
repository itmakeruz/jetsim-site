import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../components/Loader";
import SingleRegionHead from "./components/SingleRegionHead";
import TariffSection from "./components/TariffSection";
import { tariffsQuery } from "../../hooks/queries";
import { useTranslation } from "react-i18next";

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
    </div>
  );
}

export default Tariffs;
