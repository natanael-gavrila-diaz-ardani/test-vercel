import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./config/database";

import logger from "./middlewares/logger";

import helloRoutes from "./routes/hello.routes";
import dashboardRoutes from "./routes/dashboard.routes";
import authRoutes from "./routes/auth.routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
    cors({
      origin: process.env.FRONTEND_URL,
      credentials: true,
    })
);
app.use(express.json());
app.use(logger);

app.use("/api/hello", helloRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/admin", authRoutes);
app.use("/api/auth", authRoutes);

app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
  });
});

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("📦 Database connected successfully\n");

    await sequelize.sync({ alter: true });
    console.log("🗄️  Database synced\n");

    app.listen(PORT, () => {
      console.log(`⚡ Server running on http://localhost:${PORT}\n`);
      console.log(`🔗 Health check: http://localhost:${PORT}/api/health\n`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
