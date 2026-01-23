import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./db/db.js";

dotenv.config();
console.log("Mongo URI:", process.env.MONGO_URI); // TEMP DEBUG

connectDB();

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
