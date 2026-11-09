/** A user acknowledgement in this browser; this is not automatic device detection. */
export const ESIM_ACKNOWLEDGEMENT_KEY = "jetsim:esim-support-confirmed:v1";
type PreferenceStorage = Pick<Storage, "getItem" | "setItem">;
export function hasEsimAcknowledgement(storage?: PreferenceStorage): boolean {
  try {
    return (
      (storage ?? window.localStorage).getItem(ESIM_ACKNOWLEDGEMENT_KEY) ===
      "confirmed"
    );
  } catch {
    return false;
  }
}
export function rememberEsimAcknowledgement(storage?: PreferenceStorage): void {
  try {
    (storage ?? window.localStorage).setItem(
      ESIM_ACKNOWLEDGEMENT_KEY,
      "confirmed",
    );
  } catch {
    // Purchases still work when browser storage is unavailable.
  }
}
