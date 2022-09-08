import supertest from "supertest";
import app from "../../server";
import { UserStore } from "../../models/user";

const request = supertest(app);
let token: string;

describe("users endpoint response test suite", () => {
  beforeAll(() => {
    spyOn(UserStore.prototype, "index").and.returnValue(
      Promise.resolve([
        {
          first_name: "hihi",
          last_name: "haha",
        },
      ])
    );
    spyOn(UserStore.prototype, "show").and.returnValue(
      Promise.resolve({
        first_name: "hihi",
        last_name: "haha",
      })
    );
    spyOn(UserStore.prototype, "create").and.returnValue(
      Promise.resolve({
        first_name: "hihi",
        last_name: "haha",
        password: "123",
      })
    );
  });
  it("post user creation endpoint", async () => {
    await request
      .post("/users")
      .expect(200)
      .expect((response) => {
        token = response.body.accessToken;
      });
  });
  it("get all users index endpoint", async () => {
    const res = await request
      .get("/users")
      .set("Authorization", "Bearer " + token);
    expect(res.status).toBe(200);
    expect(res.body).toBeDefined();
  });

  it("get specific users show endpoint", async () => {
    const res = await request
      .get("/users/1")
      .set("Authorization", "Bearer " + token);
    expect(res.status).toBe(200);
    expect(res.body).toBeDefined();
  });
});
