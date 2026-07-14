const express = require("express");

const healthRoute = require("./routes/healthRoute");

const app = express();

const authRoute = require("./routes/authRoute");
const errorHandler = require("./middleware/errorHandler");

// Middleware
app.use(express.json());

// Routes
app.use("/health", healthRoute);
app.use("/auth", authRoute);

// Error Handler
app.use(errorHandler);

module.exports = app;