import mongoose from "mongoose";

const menuSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    category: {
      type: String,
      enum: ["All", "Mains", "Beverages", "Desserts", "Coffee", "Snacks"],
      required: true,
    },
    rating: { type: Number, default: 0 },
    stock: { type: Number, default: 100 },
  },
  { timestamps: true }
);

export default mongoose.model("Menu", menuSchema);
