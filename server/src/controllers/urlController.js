const urlService = require("../services/urlService");
const sendResponse = require("../utils/sendResponse");
const HTTP_STATUS = require("../constants/httpStatus");
const asyncHandler = require("../utils/asyncHandler");

const createShortUrl = asyncHandler(async (req, res) => {

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
            shortUrl: `${process.env.BASE_URL}/${url.shortCode}`
        }
    );

});

const getUserUrls = asyncHandler(async (req, res) => {

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const search = req.query.search || "";
    const sort = req.query.sort || "newest";

    const result = await urlService.getUserUrls({
        userId: req.user.id,
        page,
        limit,
        search,
        sort,
    });

    sendResponse(
        res,
        HTTP_STATUS.OK,
        "URLs fetched successfully.",
        result
    );

});

const redirectToOriginalUrl = asyncHandler(async (req, res) => {

    const originalUrl = await urlService.getOriginalUrl(
        req.params.shortCode
    );

    return res.redirect(originalUrl);

});

const deleteShortUrl = asyncHandler(async (req, res) => {

    await urlService.deleteShortUrl(
        req.params.id,
        req.user.id
    );

    sendResponse(
        res,
        HTTP_STATUS.OK,
        "Short URL deleted successfully."
    );

});

const getDashboard = asyncHandler(async (req, res) => {

    const dashboard = await urlService.getDashboard(
        req.user.id
    );

    sendResponse(
        res,
        HTTP_STATUS.OK,
        "Dashboard fetched successfully.",
        dashboard
    );

});

module.exports = {
    createShortUrl,
    getUserUrls,
    redirectToOriginalUrl,
    deleteShortUrl,
    getDashboard,
};