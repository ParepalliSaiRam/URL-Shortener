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

router.get(
    "/dashboard",
    authenticate,
    urlController.getDashboard
);

router.get(
    "/analytics",
    authenticate,
    urlController.getAnalytics
);

router.delete(
    "/:id",
    authenticate,
    urlController.deleteShortUrl
);

module.exports = router;