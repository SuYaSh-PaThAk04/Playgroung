import test from "node:test";
import assert from "node:assert/strict";
import { authRequired } from "../middleware/auth.middleware.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = "test-secret";

test("authRequired returns 401 when no token provided", async () => {
  process.env.JWT_SECRET = JWT_SECRET;

  const req = { headers: {} };
  let statusCode = null;
  let body = null;
  const res = {
    status(code) {
      statusCode = code;
      return this;
    },
    json(payload) {
      body = payload;
    },
  };

  let nextCalled = false;

  authRequired(req, res, () => {
    nextCalled = true;
  });

  assert.equal(nextCalled, false);
  assert.equal(statusCode, 401);
  assert.equal(body.error, "Authorization token missing");
});

test("authRequired calls next when token is valid", async () => {
  process.env.JWT_SECRET = JWT_SECRET;
  const token = jwt.sign({ role: "admin" }, JWT_SECRET);

  const req = { headers: { authorization: `Bearer ${token}` } };
  const res = {
    status() {
      throw new Error("Should not be called");
    },
    json() {
      throw new Error("Should not be called");
    },
  };

  let nextCalled = false;
  authRequired(req, res, () => {
    nextCalled = true;
  });

  assert.equal(nextCalled, true);
  assert.deepEqual(req.user.role, "admin");
});


