/**
 * @swagger
 * tags:
 *   name: Records
 *   description: Financial Records APIs
 */

/**
 * @swagger
 * /api/records:
 *   post:
 *     summary: Create a financial record
 *     tags: [Records]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Record created
 */

/**
 * @swagger
 * /api/records:
 *   get:
 *     summary: Get records with filters
 *     tags: [Records]
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of records
 */

import express from "express";
import { create , getAll , update , remove ,} from "../controllers/record.controller.js";
import { validate } from "../middleware/validate.middleware.js";
import { recordSchema } from "../validations/record.validation.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/authorize.middleware.js";
import { PERMISSIONS } from "../constants/permissions.js";

const router = express.Router();

// CREATE
router.post(
  "/",
  authenticate,
  authorize(PERMISSIONS.CREATE_RECORD),
  validate(recordSchema),
  create
);

// GET
router.get(
  "/",
  authenticate,
  authorize(PERMISSIONS.VIEW_RECORDS),
  getAll
);

// UPDATE
router.put(
  "/:id",
  authenticate,
  authorize(PERMISSIONS.UPDATE_RECORD),
  update
);

// DELETE
router.delete(
  "/:id",
  authenticate,
  authorize(PERMISSIONS.DELETE_RECORD),
  remove
);

export default router;