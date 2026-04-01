import express from "express";
import {
  summary,
  recent,
  category,
  trends,
  topCategories,
} from "../controllers/dashboard.controller.js";

import { authenticate } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/authorize.middleware.js";
import { PERMISSIONS } from "../constants/permissions.js";

const router = express.Router();

router.get(
  "/summary",
  authenticate,
  authorize(PERMISSIONS.VIEW_DASHBOARD),
  summary
);

router.get(
  "/recent",
  authenticate,
  authorize(PERMISSIONS.VIEW_DASHBOARD),
  recent
);

router.get(
  "/category",
  authenticate,
  authorize(PERMISSIONS.VIEW_DASHBOARD),
  category
);

router.get(
  "/trends",
  authenticate,
  authorize(PERMISSIONS.VIEW_INSIGHTS),
  trends
);

router.get(
  "/top-categories",
  authenticate,
  authorize(PERMISSIONS.VIEW_INSIGHTS),
  topCategories
);

export default router;