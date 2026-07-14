const urlService = require("../services/urlService");
const sendResponse = require("../utils/sendResponse");
const HTTP_STATUS = require("../constants/httpStatus");

async function createShortUrl(req, res, next) {
    try {

        const url = await urlService.createShortUrl(
            req.body.originalUrl,
            req.user.id
        );

        sendResponse(
            res,
            HTTP_STATUS.CREATED,
            "Short URL created successfully.",
            {
                originalUrl: url.originalUrl,
                shortCode: url.shortCode,
                shortUrl: `http://localhost:3000/${url.shortCode}`,
            }
        );

    } catch (error) {
        next(error);
    }
}

async function getUserUrls(req, res, next) {

    try {

        const urls = await urlService.getUserUrls(req.user.id);

        sendResponse(
            res,
            HTTP_STATUS.OK,
            "URLs fetched successfully.",
            urls
        );

    } catch (error) {

        next(error);

    }

}

async function redirectToOriginalUrl(req, res, next) {

    try {

        const originalUrl = await urlService.getOriginalUrl(
            req.params.shortCode
        );

        return res.redirect(originalUrl);

    } catch (error) {

        next(error);

    }

}

module.exports = {
    createShortUrl,
    getUserUrls,
    redirectToOriginalUrl,
};