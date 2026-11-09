import type { Tariff } from "@/types/api";
export interface PlanFilters {
  data: string;
  term: string;
  network: string;
  country: string;
  sort: string;
}
export const emptyPlanFilters: PlanFilters = {
  data: "",
  term: "",
  network: "",
  country: "",
  sort: "price-asc",
};
export function filterPlans(plans: Tariff[], filters: PlanFilters) {
  return plans
    .filter(
      (plan) =>
        (!filters.data || String(plan.quantity_internet) === filters.data) &&
        (!filters.term || String(plan.validity_period) === filters.term) &&
        (!filters.network ||
          (filters.network === "5g" ? plan.is_5g : plan.is_4g)) &&
        (!filters.country ||
          plan.regions?.some(
            (region) => String(region.id) === filters.country,
          )),
    )
    .sort((a, b) =>
      filters.sort === "price-desc"
        ? b.price_sell - a.price_sell
        : filters.sort === "data-desc"
          ? compareData(a, b)
          : a.price_sell - b.price_sell,
    );
}

function compareData(a: Tariff, b: Tariff) {
  const rank = (plan: Tariff) =>
    plan.quantity_internet < 0 || plan.quantity_internet >= 999
      ? Infinity
      : plan.quantity_internet;
  const left = rank(a),
    right = rank(b);
  return left === right ? a.price_sell - b.price_sell : right > left ? 1 : -1;
}
