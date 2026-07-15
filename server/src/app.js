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
const helmet = require("helmet");
const rateLimiter = require("./middleware/rateLimiter");

app.set("trust proxy", 1);

app.use(rateLimiter);

app.use(helmet());

// Middleware
app.use(express.json());

const cors = require("cors");

app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true,
    })
);

app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);

// Routes
app.get("/", (req, res) => {

    res.redirect("/api-docs");

});
app.use("/health", healthRoute);
app.use("/auth", authRoute);
app.use("/urls", urlRoute);

/**
 * @swagger
 * /{shortCode}:
 *   get:
 *     summary: Redirect to original URL
 *     description: Redirects the user to the original URL and increments the click count.
 *     tags:
 *       - Redirect
 *     parameters:
 *       - in: path
 *         name: shortCode
 *         required: true
 *         schema:
 *           type: string
 *           example: AbCd1234
 *     responses:
 *       302:
 *         description: Redirect to original URL
 *       404:
 *         description: Short URL not found
 */

app.get("/:shortCode", urlController.redirectToOriginalUrl);

// Error Handler
app.use(errorHandler);

module.exports = app;