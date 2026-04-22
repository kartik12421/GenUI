import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGODG_URL);
    console.log("db connected");
  } catch (error) {
    console.log("db error: ", error);
  }
};
