import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./configs/connectDB.js";
dotenv.config();

const app = express();

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
  connectDB();
});
