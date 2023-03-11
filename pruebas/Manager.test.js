import Manager from "../lib/Manager";

test("getRole() Devuelve Manager", () => {
  const testValue = "Manager";
  const a = new Manager("Test", 1, "test@gmail.com", 10);
  expect(a.getRole()).toBe(testValue);
});
