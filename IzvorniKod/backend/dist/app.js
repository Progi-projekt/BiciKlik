"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/app.ts
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const mockRoutes_1 = __importDefault(require("./routes/mockRoutes"));
// Load environment variables from .env file
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middleware to parse JSON
app.use(express_1.default.json());
// Serve static files (e.g., for a React frontend build)
app.use(express_1.default.static(path_1.default.join(__dirname, '../../frontend/build')));
// API route example
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK' });
});
//mock routes
app.use('/mock', mockRoutes_1.default);
// Serve React frontend (if integrated)
app.get('*', (req, res) => {
    res.sendFile(path_1.default.resolve(__dirname, '../../frontend/build', 'index.html'));
});
app.use((err, req, res, next) => {
    console.error(err.stack); // Log the error stack to console (optional)
    res.status(500).send('Something broke!'); // Respond with a generic error message
});
exports.default = app;
