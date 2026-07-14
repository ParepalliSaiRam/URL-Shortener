const express = require("express");

const healthRoute = require("./routes/healthRoute");

const app = express();

const authRoute = require("./routes/authRoute");
const errorHandler = require("./middleware/errorHandler");
const urlRoute = require("./routes/urlRoute");
const urlController = require("./controllers/urlController");
const {
    swaggerUi,
    swaggerSpec,
} = require("./docs/swagger");

// Middleware
app.use(express.json());

const cors = require("cors");

app.use(cors());

app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);

// Routes
app.use("/health", healthRoute);
app.use("/auth", authRoute);
app.use("/urls", urlRoute);
app.get("/:shortCode", urlController.redirectToOriginalUrl);

// Error Handler
app.use(errorHandler);

module.exports = app;