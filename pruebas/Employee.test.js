import Employee from "../lib/Employee";

test('getRole() Devuelve "Employee"', () => {
  const testValue = "Employee";
  const a = new Employee("Pedro", 1, "pedro@gmail.com");
  expect(a.getRole()).toBe(testValue);
});
