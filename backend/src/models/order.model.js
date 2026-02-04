import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        name: String,
        price: Number,
        qty: Number,
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Menu",
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      default: "Pending", // Pending | Completed
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
