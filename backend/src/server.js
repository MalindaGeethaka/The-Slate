import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.route.js";
import connectDB from "./db/db.js"


const app = express();
connectDB();

// Middleware
app.use(cors({
  origin: "*",
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type","Authorization"]
}));

app.use(express.json());

// Routes
app.use(authRoutes);

// Root test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start server
const PORT = 5005;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
