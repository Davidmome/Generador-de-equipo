import Intern from "../lib/Intern";

test("getRole() devuelve Intern", () => {
  const testValue = "Intern";
  const a = new Intern("David", 1, "david@gmail.com", "Tec");
  expect(a.getRole()).toBe(testValue);
});
