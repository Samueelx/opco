import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.get("/", verifyToken, getUsers);
userRouter.get("/:id", verifyToken, getUser);
userRouter.patch("/:id", verifyToken, updateUser);
userRouter.delete("/:id", verifyToken, deleteUser);

export default userRouter;
