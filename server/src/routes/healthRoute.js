const express = require("express");

const router = express.Router();

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Check server health
 *     description: Returns a simple response indicating that the backend server is running.
 *     tags:
 *       - Health
 *     responses:
 *       200:
 *         description: Server is healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Server is healthy
 */
router.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Server is healthy",
    });
});

module.exports = router;