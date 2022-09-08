import { UserStore, User } from "../../models/user";
const store = new UserStore();
const user: User = {
  first_name: "Legion",
  last_name: "Honey",
  password: "123",
};
describe("Index Method", () => {
  it("should have index method", async function () {
    await store.create(user);
    const users = await store.index();
    expect(users.length).toBeGreaterThan(0);
  });
});
describe("Show method", () => {
  it("should return details of the given user", async () => {
    const result = await store.show(user.first_name);
    console.log(result.first_name);

    expect(result.first_name).toEqual(user.first_name);
  });
});
describe("authenticate method", () => {
  it("should authenticate the user and return auth token", async () => {
    const result = await store.authenticate("Legion", "123");
    expect(result?.password).not.toBe("");
  });

  it("should throw error for wrong user credentials", async () => {
    let error;
    try {
      const result = await store.authenticate("Legions", "1234");
      expect(result).toEqual(null);
    } catch (err) {
console.log('err', err);
      error = err;
    }
  });
});
