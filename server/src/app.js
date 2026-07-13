const express = require("express");

const healthRoute = require("./routes/healthRoute");

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/health", healthRoute);

module.exports = app;