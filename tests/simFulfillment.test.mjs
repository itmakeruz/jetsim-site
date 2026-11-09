import { test } from "node:test";
import assert from "node:assert/strict";
import { simFulfillment, isSimIssuing } from "../src/lib/simFulfillment.ts";
test("unpaid CREATED eSIM is awaiting payment and never starts issuance polling", () => {
  for (const payment_status of [undefined, null, "PENDING"]) {
    const sim = { status: "CREATED", payment_status };
    assert.equal(simFulfillment(sim), "awaiting_payment");
    assert.equal(isSimIssuing(sim), false);
  }
});
test("confirmed payment while supplier work is queued is shown as issuing", () => {
  const sim = { status: "CREATED", payment_status: "SUCCESS" };
  assert.equal(simFulfillment(sim), "issuing");
  assert.equal(isSimIssuing(sim), true);
});
test("supplier progress cannot override an explicitly unconfirmed payment", () => {
  assert.equal(
    simFulfillment({ status: "PENDING", payment_status: "PENDING" }),
    "awaiting_payment",
  );
});
test("terminal outcomes never display a pending issuance spinner", () => {
  for (const [sim, expected] of [
    [{ status: "FAILED" }, "failed"],
    [{ status: "CANCELED" }, "canceled"],
    [{ status: "CREATED", payment_status: "FAILED" }, "payment_failed"],
    [{ status: "COMPLETED", payment_status: "REFUNDED" }, "refunded"],
    [{ status: "COMPLETED", payment_status: "SUCCESS" }, "issued"],
  ]) {
    assert.equal(simFulfillment(sim), expected);
    assert.equal(isSimIssuing(sim), false);
  }
});
test("unknown states are not presented as successful payment or issuance", () => {
  assert.equal(simFulfillment({ status: "UNRECOGNIZED" }), "unknown");
  assert.equal(isSimIssuing({}), false);
});

test("paid transaction waiting for order confirmation never offers another payment", () => {
  assert.equal(
    simFulfillment({
      status: "CREATED",
      payment_status: "WAITING_ORDER_CONFIRMATION",
    }),
    "issuing",
  );
});
