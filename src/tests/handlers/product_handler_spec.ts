import supertest from "supertest";
import app from "../../server";
import { ProductStore } from "../../models/product";

const request = supertest(app);
let token: string;

describe("products endpoint response test suite", () => {
  beforeAll(() => {
    spyOn(ProductStore.prototype, "index").and.returnValue(
      Promise.resolve([
        {
          name: "product",
          price: 12,
          category: "category",
        },
      ])
    );
    spyOn(ProductStore.prototype, "show").and.returnValue(
      Promise.resolve({
        name: "product",
        price: 12,
        category: "category",
      })
    );
    spyOn(ProductStore.prototype, "create").and.returnValue(
      Promise.resolve({
        name: "product",
        price: 12,
        category: "category",
      })
    );
    spyOn(ProductStore.prototype, "productsByCategory").and.returnValue(
      Promise.resolve([
        {
          name: "product",
          price: 12,
          category: "category",
        },
      ])
    );
  });

  it("get all products index endpoint", async () => {
    const res = await request.get("/products");
    expect(res.status).toBe(200);
    expect(res.body).toBeDefined();
  });
  it("get all products category endpoint", async () => {
    await request
      .post("/users/authenticate")
      .send({
        first_name: "hihi",
        password: "123",
      })
      .expect(200)
      .expect((response) => {
        token = response.body.accessToken;
      });
    const res = await request
      .get("/products/category/category")
      .set("Authorization", "Bearer " + token);
    expect(res.status).toBe(200);
    expect(res.body).toBeDefined();
  });
  it("get specific product show endpoint", async () => {
    const res = await request.get("/products/1");
    expect(res.status).toBe(200);
    expect(res.body).toBeDefined();
  });

  it("post product creation endpoint", async () => {
    const res = await request
      .post("/products")
      .set("Authorization", "Bearer " + token);
    expect(res.status).toBe(200);
  });
});
