import { useTranslation } from "react-i18next";
import type { Tariff } from "@/types/api";
import TariffCard from "./TariffCard";

export default function TariffSection({
  title,
  tariffs,
}: {
  title: string;
  tariffs: Tariff[];
}) {
  const { t, i18n } = useTranslation();
  if (!tariffs.length) return null;
  return (
    <section className="js-plan-section">
      <header className="js-plan-section-head">
        <h2>{title}</h2>
        <span>
          {tariffs.length} {t("jetstream.planCount")}
        </span>
      </header>
      <div className="js-plan-grid">
        {tariffs.map((tariff) => (
          <TariffCard key={tariff.id} tariff={tariff} />
        ))}
      </div>
      {tariffs.length > 1 && (
        <details className="js-comparison">
          <summary>{t("jetstream.compare")}</summary>
          <div
            className="js-comparison-scroll"
            tabIndex={0}
            role="region"
            aria-label={t("jetstream.compare")}
          >
            <table>
              <caption className="sr-only">{title}</caption>
              <thead>
                <tr>
                  <th>{t("jetstream.details")}</th>
                  <th>{t("jetstream.compareData")}</th>
                  <th>{t("jetstream.compareTerm")}</th>
                  <th>{t("jetstream.comparePrice")}</th>
                </tr>
              </thead>
              <tbody>
                {tariffs.map((tariff) => (
                  <tr key={tariff.id}>
                    <td>
                      <button
                        type="button"
                        onClick={() =>
                          document
                            .getElementById(`plan-${tariff.id}`)
                            ?.scrollIntoView({ block: "center" })
                        }
                      >
                        {tariff.name}
                      </button>
                    </td>
                    <td>
                      {tariff.quantity_internet < 0 ||
                      tariff.quantity_internet >= 999
                        ? t("jetstream.unlimited")
                        : `${tariff.quantity_internet} ${t("jetstream.gb")}`}
                    </td>
                    <td>
                      {tariff.validity_period} {t("jetstream.days")}
                    </td>
                    <td>
                      {tariff.price_sell.toLocaleString(
                        i18n.language.startsWith("en") ? "en-US" : "ru-RU",
                      )}{" "}
                      ₽
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </details>
      )}
    </section>
  );
}
