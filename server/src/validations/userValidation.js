const { z } = require("zod");

const createUserSchema = z.object({
    name: z
        .string()
        .trim()
        .min(3, "Name must be at least 3 characters long")
        .max(50, "Name cannot exceed 50 characters"),

    email: z
        .string()
        .email("Please enter a valid email address")
        .toLowerCase(),

    password: z
        .string()
        .min(6, "Password must be at least 6 characters long")
        .max(100, "Password cannot exceed 100 characters"),
});

const loginSchema = z.object({
    email: z
        .string()
        .email("Please enter a valid email address")
        .toLowerCase(),

    password: z
        .string()
        .min(1, "Password is required"),
});

module.exports = {
    createUserSchema,
    loginSchema,
};