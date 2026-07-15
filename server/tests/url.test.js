let token;
let urlId;
let shortCode;

const request = require("supertest");
const app = require("../src/app");
const prisma = require("../src/config/prisma");

beforeAll(async () => {

    await prisma.shortURL.deleteMany();
    await prisma.user.deleteMany();

    await request(app)
        .post("/auth/signup")
        .send({
            name: "Test User",
            email: "urltest@example.com",
            password: "password123",
        });

    const login = await request(app)
        .post("/auth/login")
        .send({
            email: "urltest@example.com",
            password: "password123",
        });

    token = login.body.data.token;

});

test("POST /urls should create a short URL", async () => {

    const response = await request(app)
        .post("/urls")
        .set("Authorization", `Bearer ${token}`)
        .send({
            originalUrl: "https://google.com",
        });

    expect(response.status).toBe(201);

    expect(response.body.success).toBe(true);

    expect(response.body.data.shortCode).toBeDefined();

    urlId = response.body.data.id;

    shortCode = response.body.data.shortCode;

});

test("POST /urls should create a short URL", async () => {

    const response = await request(app)
        .post("/urls")
        .set("Authorization", `Bearer ${token}`)
        .send({
            originalUrl: "https://google.com",
        });

    expect(response.status).toBe(201);

    expect(response.body.success).toBe(true);

    expect(response.body.data.shortCode).toBeDefined();

    urlId = response.body.data.id;

    shortCode = response.body.data.shortCode;

});

test("GET /urls should return user's URLs", async () => {

    const response = await request(app)
        .get("/urls")
        .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);

    expect(response.body.success).toBe(true);

    expect(response.body.data.urls.length).toBeGreaterThan(0);

});

test("GET /:shortCode should redirect", async () => {

    const response = await request(app)
        .get(`/${shortCode}`);

    expect(response.status).toBe(302);
    expect(response.headers.location).toBe("https://google.com");

});

test("DELETE /urls/:id should delete URL", async () => {

    const response = await request(app)
        .delete(`/urls/${urlId}`)
        .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);

    expect(response.body.success).toBe(true);

});

test("GET /urls should reject unauthorized request", async () => {

    const response = await request(app)
        .get("/urls");

    expect(response.status).toBe(401);

});

afterAll(async () => {

    await prisma.shortURL.deleteMany();
    await prisma.user.deleteMany();

    await prisma.$disconnect();

});

