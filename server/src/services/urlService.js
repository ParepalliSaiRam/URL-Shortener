const crypto = require("crypto");
const prisma = require("../config/prisma");

async function createShortUrl(originalUrl, userId) {

    const shortCode = crypto.randomBytes(4).toString("base64url");

    const shortUrl = await prisma.shortURL.create({
        data: {
            originalUrl,
            shortCode,
            userId,
        },
    });

    return shortUrl;
}

async function getUserUrls({
    userId,
    page,
    limit,
    search,
    sort,
}) {

    const skip = (page - 1) * limit;

    const where = {
        userId,
    };

    if (search) {
        where.OR = [
            {
                originalUrl: {
                    contains: search,
                    mode: "insensitive",
                },
            },
            {
                shortCode: {
                    contains: search,
                    mode: "insensitive",
                },
            },
        ];
    }

    let orderBy = {
        createdAt: "desc",
    };

    switch (sort) {
        case "oldest":
            orderBy = {
                createdAt: "asc",
            };
            break;

        case "clicks":
            orderBy = {
                clicks: "desc",
            };
            break;

        default:
            orderBy = {
                createdAt: "desc",
            };
    }

    const total = await prisma.shortURL.count({
        where,
    });

    const urls = await prisma.shortURL.findMany({
        where,
        orderBy,
        skip,
        take: limit,
    });

    return {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        urls,
    };

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

const ForbiddenError = require("../errors/ForbiddenError");

async function deleteShortUrl(id, userId) {

    const url = await prisma.shortURL.findUnique({
        where: {
            id: Number(id),
        },
    });

    if (!url) {
        throw new NotFoundError("Short URL not found.");
    }

    if (url.userId !== userId) {
        throw new ForbiddenError(
            "You are not allowed to delete this URL."
        );
    }

    await prisma.shortURL.delete({
        where: {
            id: Number(id),
        },
    });
}

async function getDashboard(userId) {

    const totalUrls = await prisma.shortURL.count({
        where: {
            userId,
        },
    });

    const clicks = await prisma.shortURL.aggregate({
        where: {
            userId,
        },
        _sum: {
            clicks: true,
        },
    });

    const mostClickedUrl = await prisma.shortURL.findFirst({
        where: {
            userId,
        },
        orderBy: {
            clicks: "desc",
        },
    });

    const recentUrls = await prisma.shortURL.findMany({
        where: {
            userId,
        },
        orderBy: {
            createdAt: "desc",
        },
        take: 5,
    });

    return {
        totalUrls,
        totalClicks: clicks._sum.clicks || 0,
        mostClickedUrl,
        recentUrls,
    };
}

async function getAnalytics(userId) {

    const topUrls = await prisma.shortURL.findMany({
        where: {
            userId,
        },
        orderBy: {
            clicks: "desc",
        },
        take: 10,
        select: {
            id: true,
            originalUrl: true,
            shortCode: true,
            clicks: true,
            createdAt: true,
        },
    });

    return topUrls;

}

module.exports = {
    createShortUrl,
    getUserUrls,
    getOriginalUrl,
    deleteShortUrl,
    getDashboard,
    getAnalytics,
};