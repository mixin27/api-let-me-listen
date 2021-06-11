const request = require("supertest");

describe("auth middleware", () => {
  let server;
  let token;

  beforeEach(() => {
    server = require("../../app");
  });

  afterEach(async () => {
    await server.close();
  });
});
