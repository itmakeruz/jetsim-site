import { useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../components/Loader";
import SingleRegionHead from "./components/SingleRegionHead";
import TariffSection from "./components/TariffSection";
import TariffBottomBar from "./components/TariffBottomBar";
import { tariffsQuery, tariffsByRegionIdsQuery } from "../../hooks/queries";
import { useTranslation } from "react-i18next";
import { useTariffStore } from "@/store/tariffStore";
import TariffFilters from "@/components/jetstream/TariffFilters";
import { emptyPlanFilters, filterPlans } from "@/lib/planFilters";
import { useEffect, useState } from "react";
import Empty from "@/pages/Empty/Empty";

function Tariffs() {
  const [filters, setFilters] = useState(emptyPlanFilters);
  const { i18n, t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const typeParam = searchParams.get("type");
  const { selectedTariff, setSelectedTariff } = useTariffStore();
  useEffect(() => setFilters(emptyPlanFilters), [id]);

  const isRegionIds = id?.startsWith("ids=");
  const regionIds = isRegionIds ? id?.replace("ids=", "") : null;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["tariffs", id, typeParam, i18n.language],
    queryFn: () => {
      if (isRegionIds && regionIds) {
        return tariffsByRegionIdsQuery(regionIds);
      }
      return tariffsQuery(id!, typeParam || null);
    },
    enabled: !!id,
  });

  useEffect(() => {
    return () => {
      setSelectedTariff(null);
    };
  }, [setSelectedTariff]);
  if (isLoading) {
    return (
      <div className="container py-8">
        <Loader />
      </div>
    );
  }

  const region = data?.data?.regions;
  const allPlans = Object.values(data?.data?.tariffs ?? {}).flat();
  const tariffs = data?.data?.tariffs;
  if (isError) {
    return <Empty text={t("error.tariff_not_found")} />;
  }
  return (
    <div className={`container js-page ${selectedTariff ? "pb-[150px]!" : ""}`}>
      <SingleRegionHead regions={region ?? []} tariffs={tariffs} />
      {allPlans.length > 0 && (
        <TariffFilters plans={allPlans} value={filters} onChange={setFilters} />
      )}
      <div className="flex flex-col gap-7">
        <TariffSection
          title={t("categories.local")}
          tariffs={filterPlans(tariffs?.local || [], filters)}
        />
        <TariffSection
          title={t("categories.regional")}
          tariffs={filterPlans(tariffs?.regional || [], filters)}
        />
        <TariffSection
          title={t("categories.global")}
          tariffs={filterPlans(tariffs?.global || [], filters)}
        />
      </div>
      {allPlans.length > 0 && !filterPlans(allPlans, filters).length && (
        <div className="js-empty">
          <p>{t("everywhere.noMatchingPlans")}</p>
          <button
            className="js-btn"
            onClick={() => setFilters(emptyPlanFilters)}
          >
            {t("everywhere.resetFilters")}
          </button>
        </div>
      )}
      {!tariffs?.local?.length &&
        !tariffs?.regional?.length &&
        !tariffs?.global?.length && (
          <div className="js-empty">{t("jetstream.plansEmpty")}</div>
        )}
      {selectedTariff && <TariffBottomBar />}
    </div>
  );
}

export default Tariffs;
