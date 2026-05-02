import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./configs/connectDB.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route.js";
import cors from "cors";

dotenv.config();

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/login", authRouter);
app.use("/api/user", userRouter);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
  connectDB();
});
