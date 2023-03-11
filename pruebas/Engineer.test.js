import Engineer from "../lib/Engineer";

test("Nombre de usuario de Github", () => {
  const testValue = "Githubuser";
  const a = new Engineer("Pablo", 1, "pablo@gmail.com", testValue);
  expect(a.github).toBe(testValue);
});

test("getRole() Devuelve Ingeniero", () => {
  const testValue = "Engineer";
  const a = new Engineer("Pablo", 1, "pablo@gmail.com", "Githubuser");
  expect(a.getRole()).toBe(testValue);
});
