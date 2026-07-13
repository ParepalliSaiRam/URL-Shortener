const prisma = require("../config/prisma");

async function createUser(userData) {
    const user = await prisma.user.create({
        data: userData,
    });

    return user;
}

module.exports = {
    createUser,
};