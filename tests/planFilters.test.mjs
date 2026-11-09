import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { filterPlans, emptyPlanFilters } from "../src/lib/planFilters.ts";
import { filterByUniversalSearch } from "../src/lib/searchUtils.ts";
// Read-only public API fixture, captured 2026-11-06; never imported by the application.
const plans = JSON.parse(
  readFileSync(new URL("./fixtures/public-plans.json", import.meta.url)),
);
test("price sorting preserves API amounts and does not mutate the source", () => {
  const original = JSON.stringify(plans);
  const sorted = filterPlans(plans, {
    ...emptyPlanFilters,
    sort: "price-desc",
  });
  assert.deepEqual(
    sorted.map((p) => p.price_sell),
    plans.map((p) => p.price_sell).sort((a, b) => b - a),
  );
  assert.equal(JSON.stringify(plans), original);
  assert.equal(
    sorted.reduce((n, p) => n + p.price_sell, 0),
    plans.reduce((n, p) => n + p.price_sell, 0),
  );
});
test("combined data, validity, network and coverage constraints use actual plan fields", () => {
  const target = plans.find((plan) => plan.is_5g && plan.regions.length);
  const filters = {
    ...emptyPlanFilters,
    data: String(target.quantity_internet),
    term: String(target.validity_period),
    network: "5g",
    country: String(target.regions[0].id),
  };
  const selected = filterPlans(plans, filters);
  assert.ok(selected.some((plan) => plan.id === target.id));
  assert.ok(
    selected.every(
      (plan) =>
        plan.quantity_internet === target.quantity_internet &&
        plan.validity_period === target.validity_period &&
        plan.is_5g &&
        plan.regions.some((region) => region.id === target.regions[0].id),
    ),
  );
  assert.deepEqual(filterPlans(plans, { ...filters, country: "-99999" }), []);
});
test("unlimited sentinel values sort ahead of finite data plans", () => {
  const base = plans[0];
  const sorted = filterPlans(
    [
      { ...base, id: 1, quantity_internet: 50 },
      { ...base, id: 2, quantity_internet: -1 },
      { ...base, id: 3, quantity_internet: 999 },
    ],
    { ...emptyPlanFilters, sort: "data-desc" },
  );
  assert.deepEqual(
    sorted
      .slice(0, 2)
      .map((p) => p.id)
      .sort(),
    [2, 3],
  );
  assert.equal(sorted[2].quantity_internet, 50);
});
test("multilingual search retains city aliases and transliteration", () => {
  const countries = [
    { name: "Турция" },
    { name: "Таиланд" },
    { name: "Китай" },
  ];
  for (const query of ["turkey", "istanbul", "ТУРЦИЯ", "turciya"])
    assert.deepEqual(
      filterByUniversalSearch(countries, query, (item) => item.name).map(
        (item) => item.name,
      ),
      ["Турция"],
    );
});
