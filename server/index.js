import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./configs/connectDB.js";
import cookieParser from "cookie-parser";

dotenv.config();

app.use(express.json());
app.use(cookieParser());

const app = express();

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
  connectDB();
});
