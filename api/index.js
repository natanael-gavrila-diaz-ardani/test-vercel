"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });

const app_1 = __importDefault(require("../src/app"));
const database_1 = __importDefault(require("../src/config/database"));
const serverless = require("serverless-http");

// Connect ke DB sekali di startup
(async () => {
    try {
        await database_1.default.authenticate();
        console.log("📦 Database connected");
        await database_1.default.sync();
        console.log("🗄️ Database synced");
    } catch (err) {
        console.error("❌ DB connection failed", err);
    }
})();

// Bungkus express app jadi handler vercel
const handler = serverless(app_1.default);
exports.default = handler;
