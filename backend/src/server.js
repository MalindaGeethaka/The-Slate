import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.route.js";
import protectRoutes from "./routes/protect.routes.js";
import menuRoutes from "./routes/menu.route.js";
import userRoutes from "./routes/user.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import orderRoutes from "./routes/order.route.js";
import connectDB from "./db/db.js"
import path from "path";


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
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use("/api/menu", menuRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoutes);
app.use(protectRoutes);


// Root test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start server
const PORT = 5005;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
