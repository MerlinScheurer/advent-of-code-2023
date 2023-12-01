import { readFileSync } from "node:fs";

const input = readFileSync("./1/1/input.txt").toString().split("\n");

// const input = ["1abc2", "pqr3stu8vwx", "a1b2c3d4e5f", "treb7uchet"];
// const expectedResult = [12, 38, 15, 77];

const result = [];

input.forEach((inputString) => {
  const splittedString = inputString.split("");

  let firstValue = "";
  let isFirst = true;
  let lastValue = "";

  splittedString.forEach((character) => {
    if (Number.isInteger(Number(character))) {
      if (isFirst) {
        firstValue = character;

        isFirst = false;
      }

      lastValue = character;
    }
  });

  result.push(`${firstValue}${lastValue}`);
});

console.log(result);

console.log(
  result.reduce((agg, cur) => {
    return Number(agg) + Number(cur);
  }, 0)
);
