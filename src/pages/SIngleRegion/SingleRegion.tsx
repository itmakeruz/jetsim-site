import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../components/Loader";
import SingleRegionHead from "./components/SingleRegionHead";
import TariffSection from "./components/TariffSection";
import { singleRegionQuery } from "../../hooks/queries";

function SingleRegion() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useQuery({
    queryKey: ["region", id],
    queryFn: () => singleRegionQuery(id!),
    enabled: !!id,
  });

  if (isLoading || !data?.success) {
    return (
      <div className="container py-8">
        <Loader />
      </div>
    );
  }

  const region = data?.data;

  return (
    <div className="container py-8">
      <SingleRegionHead region={region as any} />
      <div className="flex flex-col gap-[40px]">
        <TariffSection
          title="Локальные тарифы"
          tariffs={region?.local || []}
          getImageUrl={() => region?.image || ""}
        />
        <TariffSection
          title="Региональные тарифы"
          tariffs={region?.regional || []}
          getImageUrl={(tariff) => tariff?.region_group?.image || ""}
        />
        <TariffSection
          title="Глобальные тарифы"
          tariffs={region?.global || []}
          getImageUrl={(tariff) => tariff?.region_group?.image || ""}
        />
      </div>
    </div>
  );
}

export default SingleRegion;
