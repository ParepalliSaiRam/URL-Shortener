const express = require("express");

const router = express.Router();

const authenticate = require("../middleware/authMiddleware");
const validate = require("../middleware/validate");

const urlController = require("../controllers/urlController");

const {
    createShortUrlSchema,
} = require("../validations/urlValidation");

router.post(
    "/",
    authenticate,
    validate(createShortUrlSchema),
    urlController.createShortUrl
);

router.get(
    "/",
    authenticate,
    urlController.getUserUrls
);

module.exports = router;