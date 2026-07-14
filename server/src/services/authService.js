const bcrypt = require("bcrypt");
const prisma = require("../config/prisma");
const { generateToken } = require("../utils/jwt");

async function signup(userData) {
    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
        where: {
            email: userData.email,
        },
    });

    if (existingUser) {
        const ConflictError = require("../errors/ConflictError");
        throw new ConflictError("Email already registered.");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    // Create user
    const user = await prisma.user.create({
        data: {
            ...userData,
            password: hashedPassword,
        },
    });

    return user;
}

const UnauthorizedError = require("../errors/UnauthorizedError");

async function login(credentials) {

    console.log("Login credentials:", credentials);

    const user = await prisma.user.findUnique({
        where: {
            email: credentials.email,
        },
    });

    console.log("User from DB:", user);

    if (!user) {
        throw new UnauthorizedError("Invalid email or password.");
    }

    const isPasswordCorrect = await bcrypt.compare(
        credentials.password,
        user.password
    );

    console.log("Password matched:", isPasswordCorrect);

    if (!isPasswordCorrect) {
        throw new UnauthorizedError("Invalid email or password.");
    }

    const token = generateToken(user);

    return {
        user,
        token,
    };
}

module.exports = {
    signup,
    login,
};