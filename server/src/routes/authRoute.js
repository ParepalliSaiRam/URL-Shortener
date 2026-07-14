const express = require("express");

const router = express.Router();

const authController = require("../controllers/authController");
const validate = require("../middleware/validate");
const { createUserSchema } = require("../validations/userValidation");

router.post(
    "/signup",
    validate(createUserSchema),
    authController.signup
);

module.exports = router;