const { nanoid } = require("nanoid");
const prisma = require("../config/prisma");

async function createShortUrl(originalUrl, userId) {

    const shortCode = nanoid(6);

    const shortUrl = await prisma.shortURL.create({
        data: {
            originalUrl,
            shortCode,
            userId,
        },
    });

    return shortUrl;
}

async function getUserUrls(userId) {

    const urls = await prisma.shortURL.findMany({
        where: {
            userId,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return urls;
}

const NotFoundError = require("../errors/NotFoundError");

async function getOriginalUrl(shortCode) {

    const url = await prisma.shortURL.findUnique({
        where: {
            shortCode,
        },
    });

    if (!url) {
        throw new NotFoundError("Short URL not found.");
    }

    await prisma.shortURL.update({
        where: {
            id: url.id,
        },
        data: {
            clicks: {
                increment: 1,
            },
        },
    });

    return url.originalUrl;
}

module.exports = {
    createShortUrl,
    getUserUrls,
    getOriginalUrl,
};