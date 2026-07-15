const request = require("supertest");
const app = require("../src/app");
const prisma = require("../src/config/prisma");

let token;

beforeAll(async () => {

    await prisma.shortURL.deleteMany();
    await prisma.user.deleteMany();

    await request(app)
        .post("/auth/signup")
        .send({
            name: "Dashboard User",
            email: "dashboard@test.com",
            password: "password123",
        });

    const login = await request(app)
        .post("/auth/login")
        .send({
            email: "dashboard@test.com",
            password: "password123",
        });

    token = login.body.data.token;

    await request(app)
        .post("/urls")
        .set("Authorization", `Bearer ${token}`)
        .send({
            originalUrl: "https://google.com",
        });

    await request(app)
        .post("/urls")
        .set("Authorization", `Bearer ${token}`)
        .send({
            originalUrl: "https://github.com",
        });

});

test("GET /urls/analytics should return analytics", async () => {

    const response = await request(app)
        .get("/urls/analytics")
        .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);

    expect(response.body.success).toBe(true);

    expect(Array.isArray(response.body.data)).toBe(true);

    expect(response.body.data.length).toBeGreaterThan(0);

    expect(response.body.data[0]).toHaveProperty("originalUrl");

    expect(response.body.data[0]).toHaveProperty("clicks");

});

afterAll(async () => {

    await prisma.shortURL.deleteMany();
    await prisma.user.deleteMany();
    await prisma.$disconnect();

});