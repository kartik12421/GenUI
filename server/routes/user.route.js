import express from "express";
import isAuth from "../middlewares/isAuth.js";
import { getCurrentUser } from "../controllers/user.controler.js";

const userRouter = express.Router();

userRouter.get("/currentUser", isAuth, getCurrentUser);

export default userRouter;
