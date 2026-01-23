import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const clientOptions = {
      serverApi: {
        version: "1",
        strict: true,
        deprecationErrors: true,
      },
    };

    await mongoose.connect(process.env.MONGO_URI, clientOptions);
    console.log("You are successfully connected to the Server DB");
  } catch (error) {
    console.error("connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;
