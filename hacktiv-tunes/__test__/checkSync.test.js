const fs = require("fs");
const modelFile = fs.readFileSync("./models/model.js", "utf-8");

describe("Test if Asynchronous", () => {
  test("check if readFileSync is used", () => {
    const regex = /readFileSync/;
    expect(modelFile.match(regex)).toBe(null);
  });

  test("check if writeFileSync is used", () => {
    const regex = /writeFileSync/;
    expect(modelFile.match(regex)).toBe(null);
  });
});
