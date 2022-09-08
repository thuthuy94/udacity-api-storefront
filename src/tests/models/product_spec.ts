import { Product, ProductStore } from "../../models/product";

const store = new ProductStore();
const product: Product = {
  name: "Pen",
  price: 12,
  category: "abc",
};
describe("Product Model", () => {
  it("index method should return a list of products", async () => {
    await store.create(product);
    const products = await store.index();
    expect(products.length).toBeGreaterThan(0);
  });
});
describe("Show method", () => {
  it("should return details of the given product", async () => {
    const result = await store.show(product.name);
    expect(result.name).toEqual(product.name);
  });
});
describe("Product by category", () => {
  it("should return a list of products", async () => {
    const result = await store.productsByCategory(product.category || "");
    expect(result.length).toBeGreaterThan(0);
  });
});
