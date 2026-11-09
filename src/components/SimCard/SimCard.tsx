import type { RegionGroup } from "@/types/api";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { getImageUrl } from "@/config/imageUtils";
import DestinationPhoto from "@/components/jetstream/DestinationPhoto";
export default function SimCard({
  regionGroup,
  activeCategory,
  index = 0,
}: {
  regionGroup: RegionGroup;
  activeCategory?: string | null;
  index?: number;
}) {
  const { t, i18n } = useTranslation();
  const price = Number.isFinite(regionGroup.min_price)
    ? regionGroup.min_price.toLocaleString(
        i18n.language.startsWith("en") ? "en-US" : "ru-RU",
      )
    : null;
  return (
    <Link
      to={`/tariffs/${regionGroup.id}${activeCategory ? `?type=${activeCategory}` : ""}`}
      className="ew-destination ew-destination--photo"
    >
      <DestinationPhoto
        name={regionGroup.name}
        cover={regionGroup.cover_image}
        className="ew-destination-scene"
      />
      <div className="ew-destination-top">
        <span>/{String(index + 1).padStart(2, "0")}</span>
        <img
          src={getImageUrl(regionGroup.image)}
          width="33"
          height="33"
          alt=""
          loading="lazy"
        />
      </div>
      <div className="ew-destination-bottom">
        <div>
          <h3>{regionGroup.name}</h3>
          <p>
            {price !== null ? (
              <>
                {t("jetstream.from")} <strong>{price} ₽</strong>
              </>
            ) : (
              t("jetstream.chooseSim")
            )}
          </p>
        </div>
        <span className="ew-destination-action" aria-hidden="true">
          <ArrowUpRight size={23} />
        </span>
      </div>
    </Link>
  );
}
