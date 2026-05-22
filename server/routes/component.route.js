import express from "express";
import isAuth from "../middlewares/isAuth.js";
import { generateComponent } from "../controllers/aiComponent.controler.js";
import {
  getAllComponents,
  publishComponent,
  saveComponent,
} from "../controllers/component.controller.js";

const componentRouter = express.Router();

componentRouter.post("/generate", isAuth, generateComponent);

componentRouter.post("/save", isAuth, saveComponent);

componentRouter.post("/publish", isAuth, publishComponent);

componentRouter.get("/components", getAllComponents);

export default componentRouter;
