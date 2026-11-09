import UsagePanel from "@/components/UsagePanel";
import { useTranslation } from "react-i18next";
import type { Myesim } from "@/types/api";
import { simFulfillment } from "@/lib/simFulfillment";
export default function ActiveSimInfo({ sim }: { sim: Myesim }) {
  const { t, i18n } = useTranslation();
  const state = simFulfillment(sim);
  return (
    <div className="ew-sim-info">
      <span className={`ew-issue-status ew-issue-status--${state}`}>
        {t(`fulfillment.${state}`)}
      </span>
      {sim.status === "COMPLETED" ? (
        <UsagePanel
          simId={sim.id}
          status={sim.status}
          snapshot={sim.usage_snapshot}
        />
      ) : (
        <p className="ew-sim-state-message">
          {t(`fulfillment.${state}Description`)}
        </p>
      )}
      <dl className="ew-sim-metadata">
        <div>
          <dt>{t("sims.set")}</dt>
          <dd>
            {[sim.is_4g && "4G", sim.is_5g && "5G"]
              .filter(Boolean)
              .join(" / ") || t("balance.noData")}
          </dd>
        </div>
        <div>
          <dt>{t("sims.created_at")}</dt>
          <dd>
            {sim.created_at
              ? new Date(sim.created_at).toLocaleDateString(
                  i18n.language.startsWith("en") ? "en-GB" : "ru-RU",
                )
              : t("balance.noData")}
          </dd>
        </div>
        {sim.iccid && (
          <div>
            <dt>ICCID</dt>
            <dd>{sim.iccid}</dd>
          </div>
        )}
      </dl>
    </div>
  );
}
