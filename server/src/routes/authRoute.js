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
 *     summary: Register a new user
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 */

router.post(
    "/signup",
    validate(createUserSchema),
    authController.signup
);

const { loginSchema } =
    require("../validations/userValidation");

router.post(
    "/login",
    validate(loginSchema),
    authController.login
);

router.get(
    "/me",
    authenticate,
    authController.getCurrentUser
);

module.exports = router;