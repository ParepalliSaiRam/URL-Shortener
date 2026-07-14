const { z } = require("zod");

const createUserSchema = z.object({
    name: z
        .string()
        .trim()
        .min(3, "Name must be at least 3 characters long")
        .max(50, "Name cannot exceed 50 characters"),

    email: z
        .email("Please enter a valid email address")
        .toLowerCase(),

    password: z
        .string()
        .min(6, "Password must be at least 6 characters long")
        .max(100, "Password cannot exceed 100 characters"),
});

module.exports = {
    createUserSchema,
};