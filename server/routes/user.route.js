import express from "express";
import isAuth from "../middlewares/isAuth.js";
import { getAllUsers, getCurrentUser } from "../controllers/user.controler.js";

const userRouter = express.Router();

userRouter.get("/currentUser", isAuth, getCurrentUser);

userRouter.get("/users", isAuth, getAllUsers);

export default userRouter;
