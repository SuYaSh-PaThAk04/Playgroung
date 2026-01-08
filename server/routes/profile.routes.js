import express from "express";
import {
  upsertProfile,
  getProfile,
  searchBySkill,
  updateProfile,
} from "../controllers/profile.controller.js";
import { authRequired } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/profile", authRequired, upsertProfile);
router.get("/profile", getProfile);
router.put("/profile", authRequired, updateProfile); // update first/only profile
router.put("/profile/:id", authRequired, updateProfile); // update by id
router.get("/search", searchBySkill);

export default router;
