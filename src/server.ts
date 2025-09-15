import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./config/database";
import helloRoutes from "./routes/hello.routes";
import dashboardRoutes from "./routes/dashboard.routes";
import logger from "./middlewares/logger";
import authRoutes from "./routes/auth.routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);

// Middleware
app.use(express.json());
app.use(logger);

// Routes
app.use("/api/hello", helloRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.get("/api/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});
app.use("/api/auth", authRoutes);
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("📦 Database connected successfully");

    await sequelize.sync({ alter: true });
    console.log("🗄️  Database synced");

    app.listen(PORT, () => {
      console.log(`⚡ Server running on http://localhost:${PORT}`);
      console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
