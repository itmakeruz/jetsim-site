import type { Tariff } from "@/types/api";

/**
 * Безлимитный тариф: в данных нет отдельного флага, поэтому признаём его по объёму
 * (пусто/0/отрицательный или «999+», как в usage.normalizer на бэке) или по названию.
 */
export const isUnlimitedTariff = (t: Pick<Tariff, "quantity_internet" | "name">): boolean => {
  const gb = t.quantity_internet;
  if (gb === null || gb === undefined || gb <= 0 || gb >= 999) return true;
  return /безлимит|unlimit|unlim\b|neogranich|cheksiz/i.test(t.name ?? "");
};

/** Делит тарифы на «с пакетом трафика» (по возрастанию ГБ, затем цены) и «безлимитные» (по дням, затем цене). */
export const splitTariffs = (tariffs: Tariff[]) => {
  const limited = tariffs.filter((t) => !isUnlimitedTariff(t));
  const unlimited = tariffs.filter(isUnlimitedTariff);
  limited.sort((a, b) => a.quantity_internet - b.quantity_internet || a.price_sell - b.price_sell);
  unlimited.sort((a, b) => a.validity_period - b.validity_period || a.price_sell - b.price_sell);
  return { limited, unlimited };
};
