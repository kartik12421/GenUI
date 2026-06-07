import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODG_URL);
    console.log("db connected");
  } catch (error) {
    throw new Error(`Database connection failed: ${error.message}`);
  }
};
