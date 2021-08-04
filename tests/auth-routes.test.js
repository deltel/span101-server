const request = require("supertest");
const bcrypt = require("bcryptjs");

const app = require("../src/app");

const { user, client } = require("./fixtures/db");

describe("auth routes", () => {
  let clientSpy;
  beforeAll(() => {
    clientSpy = jest.spyOn(client, "query").mockImplementation(async () => {
      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash(user.password, salt);

      return {
        rows: [{ ...user, password }],
      };
    });
  });

  test("should successfully login", async () => {
    const response = await request(app)
      .post("/auth/login")
      .send({
        username: user.username,
        password: user.password,
      })
      .expect(200);

    expect(Object.entries(response.body).length).toBe(1);
    expect(typeof response.body.token).toBe("string");
    expect(response.body.token.length).toBeGreaterThan(0);
    expect(clientSpy).toHaveBeenCalledTimes(1);
  });

  test("should fail to login", async () => {
    const response = await request(app)
      .post("/auth/login")
      .send({
        username: user.username,
        password: "user.password",
      })
      .expect(401);

    expect(Object.entries(response.body).length).toBe(1);
    expect(typeof response.body.token).toBe("undefined");
    expect(response.body).toMatchObject({
      error: "Invalid username or password",
    });

    expect(clientSpy).toHaveBeenCalledTimes(2);
  });
});
