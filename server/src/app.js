const express = require("express");

const healthRoute = require("./routes/healthRoute");

const app = express();

const userRoute = require("./routes/userRoute");

// Middleware
app.use(express.json());

// Routes
app.use("/health", healthRoute);
app.use("/users", userRoute);

module.exports = app;