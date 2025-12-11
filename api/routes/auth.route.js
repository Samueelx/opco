import express from "express";
import { login, logout, signup } from "../controllers/auth.controller.js";
import { confirmUserData } from "../middleware/confirmUserData.js";

const authRouter = express.Router();

authRouter.post("/signup", signup);
authRouter.post("/login", confirmUserData, login);
authRouter.post("/logout", logout);

export default authRouter;
