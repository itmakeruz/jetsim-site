import { test } from "node:test";
import assert from "node:assert/strict";
import {
  ESIM_ACKNOWLEDGEMENT_KEY,
  hasEsimAcknowledgement,
  rememberEsimAcknowledgement,
} from "../src/lib/esimAcknowledgement.ts";
test("only explicit confirmation persists across subsequent reads", () => {
  const entries = new Map();
  const storage = {
    getItem: (key) => entries.get(key) ?? null,
    setItem: (key, value) => entries.set(key, value),
  };
  assert.equal(hasEsimAcknowledgement(storage), false);
  entries.set(ESIM_ACKNOWLEDGEMENT_KEY, "false");
  assert.equal(hasEsimAcknowledgement(storage), false);
  rememberEsimAcknowledgement(storage);
  assert.equal(hasEsimAcknowledgement(storage), true);
  entries.clear();
  assert.equal(hasEsimAcknowledgement(storage), false);
});
test("blocked storage neither crashes nor pretends confirmation was saved", () => {
  const storage = {
    getItem: () => {
      throw new Error("blocked");
    },
    setItem: () => {
      throw new Error("blocked");
    },
  };
  assert.doesNotThrow(() => rememberEsimAcknowledgement(storage));
  assert.equal(hasEsimAcknowledgement(storage), false);
});
