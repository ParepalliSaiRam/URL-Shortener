const express = require("express");

const router = express.Router();

const authController = require("../controllers/authController");
const validate = require("../middleware/validate");
const { createUserSchema } = require("../validations/userValidation");
const authenticate = require("../middleware/authMiddleware");

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