import { useState } from "react";
import type { Tariff } from "@/types/api";
import { useTranslation } from "react-i18next";
import {
  SlidersHorizontal,
  RotateCcw,
  ChevronDown,
  MessageCircle,
} from "lucide-react";
import { emptyPlanFilters } from "@/lib/planFilters";
import type { PlanFilters } from "@/lib/planFilters";
import PremiumSelect from "./PremiumSelect";
export default function TariffFilters({
  plans,
  value,
  onChange,
}: {
  plans: Tariff[];
  value: PlanFilters;
  onChange: (value: PlanFilters) => void;
}) {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);
  const data = [...new Set(plans.map((plan) => plan.quantity_internet))].sort(
    (a, b) => a - b,
  );
  const terms = [...new Set(plans.map((plan) => plan.validity_period))].sort(
    (a, b) => a - b,
  );
  const countries = [
    ...new Map(
      plans
        .flatMap((plan) => plan.regions ?? [])
        .map((region) => [region.id, region]),
    ).values(),
  ].sort((a, b) => a.name.localeCompare(b.name));
  const change = (key: keyof PlanFilters, val: string) =>
    onChange({ ...value, [key]: val });
  const active = Object.entries(value).some(
    ([key, val]) => key !== "sort" && val,
  );
  const fields = [
    {
      key: "data" as const,
      label: t("everywhere.data"),
      options: [
        { value: "", label: t("everywhere.anyData") },
        ...data.map((amount) => ({
          value: String(amount),
          label:
            amount < 0 || amount >= 999
              ? t("jetstream.unlimited")
              : `${amount} ${t("jetstream.gb")}`,
        })),
      ],
    },
    {
      key: "term" as const,
      label: t("everywhere.validity"),
      options: [
        { value: "", label: t("everywhere.anyTerm") },
        ...terms.map((days) => ({
          value: String(days),
          label: `${days} ${t("jetstream.days")}`,
        })),
      ],
    },
    ...(plans.some((plan) => plan.is_5g)
      ? [
          {
            key: "network" as const,
            label: t("everywhere.network"),
            options: [
              { value: "", label: t("everywhere.anyNetwork") },
              { value: "4g", label: "4G" },
              { value: "5g", label: "5G" },
            ],
          },
        ]
      : []),
    ...(countries.length > 1
      ? [
          {
            key: "country" as const,
            label: t("everywhere.coverageFilter"),
            options: [
              { value: "", label: t("everywhere.allCountries") },
              ...countries.map((country) => ({
                value: String(country.id),
                label: country.name,
              })),
            ],
          },
        ]
      : []),
    {
      key: "sort" as const,
      label: t("everywhere.sort"),
      options: [
        { value: "price-asc", label: t("everywhere.priceAsc") },
        { value: "price-desc", label: t("everywhere.priceDesc") },
        { value: "data-desc", label: t("everywhere.dataDesc") },
      ],
    },
  ];
  return (
    <div className={`ew-filters ${expanded ? "is-expanded" : ""}`}>
      <button
        type="button"
        className="ew-filter-toggle"
        aria-expanded={expanded}
        aria-controls="plan-filter-controls"
        onClick={() => setExpanded((v) => !v)}
      >
        <SlidersHorizontal size={17} />
        {t("everywhere.filterSort")}
        {active && <i />}
        <ChevronDown size={15} />
      </button>
      <a
        className="ew-filter-inline-support"
        href="https://t.me/Operator1jet"
        target="_blank"
        rel="noreferrer"
        aria-label={t("jetstream.contactSupport")}
      >
        <MessageCircle size={19} />
      </a>
      <span className="ew-filters-label">
        <SlidersHorizontal size={17} />
        {t("everywhere.filters")}
      </span>
      <div className="ew-filter-controls" id="plan-filter-controls">
        {fields.map((field) => (
          <div className="ew-filter-field" key={field.key}>
            <span>{field.label}</span>
            <PremiumSelect
              label={field.label}
              value={value[field.key]}
              options={field.options}
              onValueChange={(next) => change(field.key, next)}
            />
          </div>
        ))}
      </div>
      {active && (
        <button
          className="ew-filter-reset"
          type="button"
          onClick={() => onChange(emptyPlanFilters)}
          aria-label={t("everywhere.resetFilters")}
        >
          <RotateCcw size={15} />
          {t("everywhere.reset")}
        </button>
      )}
    </div>
  );
}
