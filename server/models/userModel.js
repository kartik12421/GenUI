import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    aiCredits: {
      type: Number,
      default: 150,
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

export default User;
