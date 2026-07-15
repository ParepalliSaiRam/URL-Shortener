const express = require("express");

const router = express.Router();

const authenticate = require("../middleware/authMiddleware");
const validate = require("../middleware/validate");

const urlController = require("../controllers/urlController");

const {
    createShortUrlSchema,
} = require("../validations/urlValidation");

/**
 * @swagger
 * /urls:
 *   post:
 *     summary: Create a shortened URL
 *     description: Creates a new short URL for the authenticated user.
 *     tags:
 *       - URLs
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/CreateUrl'
 *     responses:
 *       201:
 *         description: Short URL created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */

router.post(
    "/",
    authenticate,
    validate(createShortUrlSchema),
    urlController.createShortUrl
);

/**
 * @swagger
 * /urls:
 *   get:
 *     summary: Get user's URLs
 *     description: Returns paginated URLs belonging to the authenticated user.
 *     tags:
 *       - URLs
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *           example: google
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum:
 *             - newest
 *             - oldest
 *             - clicks
 *     responses:
 *       200:
 *         description: URLs fetched successfully
 *       401:
 *         description: Unauthorized
 */

router.get(
    "/",
    authenticate,
    urlController.getUserUrls
);

/**
 * @swagger
 * /urls/dashboard:
 *   get:
 *     summary: Get dashboard statistics
 *     description: Returns dashboard statistics for the authenticated user.
 *     tags:
 *       - Dashboard
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard data retrieved successfully
 *       401:
 *         description: Unauthorized
 */

router.get(
    "/dashboard",
    authenticate,
    urlController.getDashboard
);

/**
 * @swagger
 * /urls/analytics:
 *   get:
 *     summary: Get analytics
 *     description: Returns analytics for the user's URLs.
 *     tags:
 *       - Analytics
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Analytics retrieved successfully
 *       401:
 *         description: Unauthorized
 */

router.get(
    "/analytics",
    authenticate,
    urlController.getAnalytics
);

/**
 * @swagger
 * /urls/{id}:
 *   delete:
 *     summary: Delete a URL
 *     description: Deletes a URL owned by the authenticated user.
 *     tags:
 *       - URLs
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: URL deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: URL not found
 */

router.delete(
    "/:id",
    authenticate,
    urlController.deleteShortUrl
);

module.exports = router;