export type SimFulfillment =
  | "awaiting_payment"
  | "issuing"
  | "issued"
  | "payment_failed"
  | "failed"
  | "canceled"
  | "refunded"
  | "unknown";
interface SimInput {
  status?: string | null;
  payment_status?: string | null;
}
/** Payment confirmation and eSIM issuance are separate facts. CREATED alone never means issuing. */
export function simFulfillment(sim: SimInput): SimFulfillment {
  if (sim.payment_status === "REFUNDED") return "refunded";
  if (sim.status === "CANCELED" || sim.payment_status === "CANCELED")
    return "canceled";
  if (sim.payment_status === "FAILED" || sim.payment_status === "ERROR")
    return "payment_failed";
  if (sim.status === "FAILED") return "failed";
  if (sim.status === "COMPLETED") return "issued";
  if (sim.payment_status === "PENDING") return "awaiting_payment";
  if (
    ["SUCCESS", "WAITING_ORDER_CONFIRMATION"].includes(
      sim.payment_status || "",
    ) &&
    ["CREATED", "PENDING", "REDEEM_COUPON", "NOTIFY_COUPON"].includes(
      sim.status || "",
    )
  )
    return "issuing";
  if (sim.status === "CREATED") return "awaiting_payment";
  if (["PENDING", "REDEEM_COUPON", "NOTIFY_COUPON"].includes(sim.status || ""))
    return "issuing";
  return "unknown";
}
export function isSimIssuing(sim: SimInput) {
  return simFulfillment(sim) === "issuing";
}
