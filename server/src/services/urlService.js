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

module.exports = {
    createShortUrl,
    getUserUrls,
    getOriginalUrl,
    deleteShortUrl,
    getDashboard,
};