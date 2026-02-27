import express from "express";
import {
  createGeoLocationCountry,
  getGeoLocationCountry,
} from "../controllers/geoLocationCountry.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, createGeoLocationCountry);
router.get("/", verifyToken, getGeoLocationCountry);

export default router;
