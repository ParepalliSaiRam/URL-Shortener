function errorHandler(err, req, res, next) {

    const HTTP_STATUS = require("../constants/httpStatus");

    if (process.env.NODE_ENV !== "test") {
        console.error(err);
    }

    res.status(err.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: err.message || "Internal Server Error",
    });

}

module.exports = errorHandler;