import test from "node:test";
import assert from "node:assert/strict";

import { searchBySkill } from "../controllers/profile.controller.js";

test("searchBySkill applies default pagination values", async () => {
  const originalFind = (await import("../models/Profile.model.js")).default.find;
  const originalCount = (await import("../models/Profile.model.js")).default.countDocuments;

  // Very lightweight mock: we only care that controller shapes the response
  let skipped = null;
  let limited = null;

  (await import("../models/Profile.model.js")).default.find = () => ({
    skip(n) {
      skipped = n;
      return this;
    },
    limit(n) {
      limited = n;
      return Promise.resolve([]);
    },
  });

  (await import("../models/Profile.model.js")).default.countDocuments = () =>
    Promise.resolve(0);

  const req = { query: { skill: "node" } };
  let jsonBody = null;
  const res = {
    json(payload) {
      jsonBody = payload;
    },
  };

  await searchBySkill(req, res);

  assert.equal(skipped, 0);
  assert.equal(limited, 10);
  assert.equal(jsonBody.meta.page, 1);
  assert.equal(jsonBody.meta.limit, 10);

  // Restore originals
  (await import("../models/Profile.model.js")).default.find = originalFind;
  (await import("../models/Profile.model.js")).default.countDocuments = originalCount;
});


