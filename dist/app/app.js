"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const user_route_1 = require("./models/user/user.route");
const app = (0, express_1.default)();
const router = express_1.default.Router();
// parser
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/api/v1/users", user_route_1.userRoutes);
app.get("/", (req, res) => {
    res.send("Hello Assignment");
});
// error handling middleware
const errorHandler = (error, req, res, next) => {
    const statusCode = (error === null || error === void 0 ? void 0 : error.statusCode) || 500;
    const message = error === null || error === void 0 ? void 0 : error.message;
    res.status(statusCode).json({
        success: false,
        message: message || "Something went wrong",
        error: {
            code: statusCode,
            description: message || "Internal Server Error",
        },
    });
};
app.use(errorHandler);
exports.default = app;
