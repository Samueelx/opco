import express from "express";

import { verifyToken } from "../middleware/verifyToken.js";
import {
  createBandCodesFromCSV,
  deleteTariff,
  getBandCode,
  getBandCodes,
} from "../controllers/bandCodes.controller.js";

const bandCodesRouter = express.Router();

bandCodesRouter.get("/:id", getBandCode);
bandCodesRouter.get("/", getBandCodes);
bandCodesRouter.post("/", verifyToken, createBandCodesFromCSV);
bandCodesRouter.delete('/:id', verifyToken, deleteTariff )

export default bandCodesRouter;
