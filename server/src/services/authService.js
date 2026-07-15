const bcrypt = require("bcrypt");
const prisma = require("../config/prisma");
const { generateToken } = require("../utils/jwt");
const ConflictError = require("../errors/ConflictError");
const UnauthorizedError = require("../errors/UnauthorizedError");

async function signup(userData) {
    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
        where: {
            email: userData.email,
        },
    });

    if (existingUser) {
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

    return {
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
        },
    };
}

async function login(credentials) {

    const user = await prisma.user.findUnique({
        where: {
            email: credentials.email,
        },
        select: {
            id: true,
            name: true,
            email: true,
            password: true,
        },
    });

    if (!user) {
        throw new UnauthorizedError("Invalid email or password.");
    }

    const isPasswordCorrect = await bcrypt.compare(
        credentials.password,
        user.password
    );

    if (!isPasswordCorrect) {
        throw new UnauthorizedError("Invalid email or password.");
    }

    const token = generateToken(user);

    return {
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
        },
        token,
    };
}

module.exports = {
    signup,
    login,
};