const bcrypt = require("bcrypt");
const prisma = require("../config/prisma");

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

module.exports = {
    signup,
};