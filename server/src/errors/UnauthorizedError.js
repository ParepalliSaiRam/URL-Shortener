const AppError = require("./AppError");
const HTTP_STATUS = require("../constants/httpStatus");

class UnauthorizedError extends AppError {
    constructor(message) {
        super(message, HTTP_STATUS.UNAUTHORIZED);
    }
}

module.exports = UnauthorizedError;