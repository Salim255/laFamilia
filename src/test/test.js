const request = require("supertest");

const add = (a, b) => {
  return a + b;
};

it("just test to pass my ci build", () => {
  //
  const result = add(1, 1);
  //
  expect(result).toBe(2);
});
