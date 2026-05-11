import mongoose from "mongoose";

const componentSchema = new mongoose.Schema(
  {
    name: String,
    code: String,
    props: [String],
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    visibility: {
      type: String,
      enum: ["private", "public"],
      default: "private",
    },
    npmPackage: String,
  },
  { timestamps: true },
);

const Component = mongoose.model("Component", componentSchema);

export default Component;
