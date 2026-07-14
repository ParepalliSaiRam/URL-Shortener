const authService = require("../services/authService");
const sendResponse = require("../utils/sendResponse");
const HTTP_STATUS = require("../constants/httpStatus");

async function signup(req, res, next) {
    try {
        const user = await authService.signup(req.body);

        sendResponse(
            res,
            HTTP_STATUS.CREATED,
            "User registered successfully.",
            {
                id: user.id,
                name: user.name,
                email: user.email,
                createdAt: user.createdAt,
            }
        );

    } catch (error) {
        next(error);
    }
}

async function login(req, res, next) {
    try {
        const { user, token } = await authService.login(req.body);

        sendResponse(
            res,
            HTTP_STATUS.OK,
            "Login successful.",
            {
                user: {
                id: user.id,
                name: user.name,
                email: user.email,
                },
                token,
            }
        );

    } catch (error) {
        next(error);
    }
}

function getCurrentUser(req, res) {

    sendResponse(
        res,
        HTTP_STATUS.OK,
        "Authenticated user.",
        req.user
    );

}

module.exports = {
    signup,
    login,
    getCurrentUser,
};