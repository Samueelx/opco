import express from "express";
import {
  createGeoLocationBorder,
  getGeoLocationBorder,
} from "../controllers/geoLocationBorder.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, createGeoLocationBorder);
router.get("/", verifyToken, getGeoLocationBorder);

export default router;
