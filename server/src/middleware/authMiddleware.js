const jwt = require("jsonwebtoken");
const UnauthorizedError = require("../errors/UnauthorizedError");

function authenticate(req, res, next) {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return next(
            new UnauthorizedError("Authorization token is required.")
        );
    }

    const parts = authHeader.split(" ");

    if (parts.length !== 2 || parts[0] !== "Bearer") {
        return next(
            new UnauthorizedError("Invalid authorization format.")
        );
    }

    const token = parts[1];

    try {

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = decoded;

        next();

    } catch (error) {

        next(
            new UnauthorizedError("Invalid or expired token.")
        );

    }
}

module.exports = authenticate;