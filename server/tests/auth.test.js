const request = require("supertest");
const app = require("../src/app");
const prisma = require("../src/config/prisma");

describe("Authentication", () => {

    test("POST /auth/signup should create a new user", async () => {

        const response = await request(app)
            .post("/auth/signup")
            .send({
                name: "Test User",
                email: "test@example.com",
                password: "password123",
            });

        expect(response.status).toBe(201);

        expect(response.body.success).toBe(true);

        expect(response.body.message).toBe("User registered successfully.");
    });

    test("POST /auth/signup should fail for duplicate email", async () => {

    await request(app)
        .post("/auth/signup")
        .send({
            name: "Test User",
            email: "duplicate@example.com",
            password: "password123",
        });

    const response = await request(app)
        .post("/auth/signup")
        .send({
            name: "Another User",
            email: "duplicate@example.com",
            password: "password123",
        });

    expect(response.status).toBe(409);

    expect(response.body.success).toBe(false);

});

test("POST /auth/login should return JWT token", async () => {

    await request(app)
        .post("/auth/signup")
        .send({
            name: "Login User",
            email: "login@example.com",
            password: "password123",
        });

    const response = await request(app)
        .post("/auth/login")
        .send({
            email: "login@example.com",
            password: "password123",
        });

    expect(response.status).toBe(200);

    expect(response.body.success).toBe(true);

    expect(response.body.data.token).toBeDefined();

});

test("POST /auth/login should reject invalid password", async () => {

    const response = await request(app)
        .post("/auth/login")
        .send({
            email: "login@example.com",
            password: "wrongpassword",
        });

    expect(response.status).toBe(401);

    expect(response.body.success).toBe(false);

});

afterAll(async () => {

    await prisma.shortURL.deleteMany();

    await prisma.user.deleteMany();

    await prisma.$disconnect();

});

});

afterAll(async () => {
    await prisma.shortURL.deleteMany();
    await prisma.user.deleteMany();

    await prisma.$disconnect();
});

