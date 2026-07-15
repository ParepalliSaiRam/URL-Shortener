require("dotenv").config();

const app = require("./app");
const prisma = require("./config/prisma");

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
});

process.on("SIGINT", async () => {
    await prisma.$disconnect();
    server.close(() => {
        console.log("Server stopped.");
        process.exit(0);
    });
});