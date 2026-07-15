const request = require("supertest");
const app = require("../src/app");

describe("Authentication API", () => {

    it("should reject login with unknown email", async () => {

        const response = await request(app)
            .post("/auth/login")
            .send({
                email: "unknown@example.com",
                password: "123456",
            });

        expect(response.status).toBe(401);

        expect(response.body.success).toBe(false);

    });

});