const jwt = require("jsonwebtoken");
const config = require("config");
const mongoose = require("mongoose");

const { User } = require("../../../models/user");

describe("user.generateAuthToken", () => {
  it("should return a valid JWt", () => {
    const payload = {
      _id: new mongoose.Types.ObjectId().toHexString(),
      isPro: true,
    };
    const user = new User(payload);
    const token = user.generateAuthToken();
    const decode = jwt.verify(token, config.get("jwtPrivateKey"));

    expect(decode).toMatchObject(payload);
  });
});
