import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    dob: { type: Date, required: true },
    gender: { type: String, enum: ["male", "female"], required: true },
    role: { type: String, enum: ["client", "admin"], default: "client" },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
