const request = require("supertest");
const mongoose = require("mongoose");

const { User } = require("../../models/user");
const { Artist } = require("../../models/artist");

let server;

describe("/api/artist", () => {
  beforeEach(() => {
    server = require("../../app");
  });
  afterEach(async () => {
    await Artist.deleteMany({});
    await server.close();
  });

  describe("GET /", () => {
    it("should return all artists", async () => {
      await Artist.collection.insertMany([
        { name: "artist1" },
        { name: "artist3" },
        { name: "artist2" },
      ]);

      const res = await request(server).get("/api/artists");
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(3);
      expect(res.body.some((ar) => ar.name === "artist1")).toBeTruthy();
    });
  });

  describe("GET /:id", () => {
    it("should return an artist if valid id is passed", async () => {
      const artist = new Artist({ name: "artist1" });
      await artist.save();
      const res = await request(server).get("/api/artists/" + artist._id);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("name", artist.name);
    });

    it("should return 404 if invalid id is passed", async () => {
      const res = await request(server).get("/api/artists/1");
      expect(res.status).toBe(404);
    });

    it("should return 404 if no artist with the given id exist", async () => {
      const id = mongoose.Types.ObjectId();
      const res = await request(server).get("/api/artists/" + id);
      expect(res.status).toBe(404);
    });
  });

  describe("POST /", () => {
    let token;
    let name;
    const exec = () =>
      request(server)
        .post("/api/artists")
        .set("x-auth-token", token)
        .send({ name });

    beforeEach(() => {
      token = new User().generateAuthToken();
      name = "artist1";
    });

    it("should return 401 if client is not logged in", async () => {
      token = "";
      const res = await exec();
      expect(res.status).toBe(401);
    });

    it("should return 400 if artist is less than 5 characters", async () => {
      name = "a";
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it("should return 400 if artist is more than 255 characters", async () => {
      name = new Array(257).join("a");
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it("should save the artist if it is valid", async () => {
      await exec();
      const genre = await Artist.find({ name });
      expect(genre).not.toBeNull();
    });

    it("should return the artist if it is valid", async () => {
      const res = await exec();
      expect(res.body).toHaveProperty("_id");
      expect(res.body).toHaveProperty("name", name);
    });
  });
});
