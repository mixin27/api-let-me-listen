const request = require("supertest");

const { User } = require("../../models/user");
const { Artist } = require("../../models/artist");

describe("auth middleware", () => {
  let server;
  beforeEach(() => {
    server = require("../../app");
  });

  afterEach(async () => {
    await Artist.deleteMany({});
    await server.close();
  });

  let token;

  const exec = () => {
    return request(server)
      .post("/api/artists")
      .set("x-auth-token", token)
      .send({ name: "artist1" });
  };

  beforeEach(() => {
    token = new User().generateAuthToken();
  });

  it("should return 401 if no token is provided", async () => {
    token = "";
    const res = await exec();
    expect(res.status).toBe(401);
  });

  it("should return 400 if token is invalid", async () => {
    token = "invalid";
    const res = await exec();
    expect(res.status).toBe(400);
  });

  it("should return 200 if token is valid", async () => {
    const res = await exec();
    expect(res.status).toBe(200);
  });
});
