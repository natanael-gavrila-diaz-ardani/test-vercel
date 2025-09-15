import express from "express";
import helloRoutes from "./routes/hello.routes";
import dashboardRoutes from "./routes/dashboard.routes";
import logger from "./middlewares/logger";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(logger);

// Routes
app.use("/api/hello", helloRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.listen(PORT, () => {
  console.log(`⚡ Server running on http://localhost:${PORT}`);
});
