const express = require("express");

const router = express.Router();

const authController = require("../controllers/authController");
const validate = require("../middleware/validate");
const { createUserSchema } = require("../validations/userValidation");
const authenticate = require("../middleware/authMiddleware");

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserSignup'
 *     responses:
 *       201:
 *         description: User registered successfully.
 *       409:
 *         description: Email already exists.
 */

router.post(
    "/signup",
    validate(createUserSchema),
    authController.signup
);

const { loginSchema } =
    require("../validations/userValidation");

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Login user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLogin'
 *     responses:
 *       200:
 *         description: Login successful.
 *       401:
 *         description: Invalid credentials.
 */

router.post(
    "/login",
    validate(loginSchema),
    authController.login
);

/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Get current authenticated user
 *     description: Returns details of the currently logged-in user.
 *     tags:
 *       - Authentication
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current user returned successfully.
 *       401:
 *         description: Unauthorized.
 */

router.get(
    "/me",
    authenticate,
    authController.getCurrentUser
);

module.exports = router;