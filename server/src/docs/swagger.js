const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
    definition: {
        openapi: "3.0.0",

        info: {
            title: "URL Shortener API",
            version: "1.0.0",
            description: "Backend API documentation for the URL Shortener project.",
        },

        servers: [
            {
                url: "http://localhost:3000",
            },
        ],
    },

    apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = {
    swaggerUi,
    swaggerSpec,
};