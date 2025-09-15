"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handler;
const app_1 = __importDefault(require("../src/app"));
const database_1 = __importDefault(require("../src/config/database"));
async function handler(req, res) {
    try {
        await database_1.default.authenticate();
        console.log("Database connected");
    }
    catch (err) {
        console.error("DB connection failed", err);
    }
    return (0, app_1.default)(req, res);
}
//# sourceMappingURL=index.js.map