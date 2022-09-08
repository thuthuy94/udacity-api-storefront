import { OrderStore, Order } from "../../models/order";

const store = new OrderStore();
const order: Order = {
  user_id: "1",
  status: "completed",
  title: "abc",
};
describe("Order Model", () => {
  it("index method should return a list of Order", async () => {
    await store.create(order);
    const orders = await store.index();

    expect(orders.length).toBeGreaterThan(0);
  });
});
describe("Show method", () => {
  it("should return details of the given order", async () => {
    const result = await store.show(order.title);

    expect(result.title.toString()).toEqual(order.title);
  });
});
describe("Order by user method", () => {
  it("should return a list of orders", async () => {
    const orders = await store.ordersByUser(order.user_id);

    expect(orders.length).toBeGreaterThan(0);
  });
});
describe("completed order method", () => {
  it("should return a list of orders", async () => {
    const orders = await store.ordersByUser(order.user_id);

    expect(orders.length).toBeGreaterThan(0);
  });
});
