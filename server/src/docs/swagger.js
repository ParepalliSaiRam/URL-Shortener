const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "URL Shortener API",
      version: "1.0.0",
      description: "REST API for the URL Shortener application.",
    },

    servers: [
      {
        url: process.env.BASE_URL || "http://localhost:3000",
        description: "Current Server",
      },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },

      schemas: {
        UserSignup: {
          type: "object",
          required: ["name", "email", "password"],
          properties: {
            name: {
              type: "string",
              example: "Sai Ram",
            },
            email: {
              type: "string",
              example: "sairam@gmail.com",
            },
            password: {
              type: "string",
              example: "password123",
            },
          },
        },

        UserLogin: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: {
              type: "string",
              example: "sairam@gmail.com",
            },
            password: {
              type: "string",
              example: "password123",
            },
          },
        },

        CreateUrl: {
          type: "object",
          required: ["originalUrl"],
          properties: {
            originalUrl: {
              type: "string",
              example: "https://google.com",
            },
          },
        },
      },
    },

    tags: [
      {
        name: "Health",
        description: "Health check endpoints",
      },
      {
        name: "Authentication",
        description: "User authentication",
      },
      {
        name: "URLs",
        description: "URL management",
      },
      {
        name: "Dashboard",
        description: "Dashboard statistics",
      },
      {
        name: "Analytics",
        description: "Analytics endpoints",
      },
      {
        name: "Redirect",
        description: "Short URL redirection",
      },
    ],
  },

  apis: ["./src/routes/*.js", "./src/app.js"],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  swaggerSpec,
};