const HTTP_STATUS = require("../constants/httpStatus");
function validate(schema) {
    return (req, res, next) => {
        const result = schema.safeParse(req.body);
        const HTTP_STATUS = require("../constants/httpStatus");

        if (!result.success) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({
                success: false,
                errors: result.error.issues.map(issue => ({
                    field: issue.path.join("."),
                    message: issue.message,
                })),
            });
        }

        req.body = result.data;

        next();
    };
}

module.exports = validate;