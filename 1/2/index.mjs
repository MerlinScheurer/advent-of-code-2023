import { readFileSync } from "node:fs";

const input = readFileSync("./1/2/input.txt").toString().split("\n");

// const input = [
//   "two1nine",
//   "eightwothree",
//   "abcone2threexyz",
//   "xtwone3four",
//   "4nineeightseven2",
//   "zoneight234",
//   "7pqrstsixteen",
//   "7tfourqjjzkktzplr47sjkkplrnrprll",
// ];

// const expectedResult = [29, 83, 13, 24, 42, 14, 76, 77];

const stringNumbersToReplace = {
  one: "o1ne",
  two: "t2wo",
  three: "t3hree",
  four: "f4our",
  five: "f5ive",
  six: "s6ix",
  seven: "s7even",
  eight: "e8ight",
  nine: "n9ine",
};

const replaceStringNumbersWithNumbers = (inputString) => {
  let replacedString = inputString;

  Object.entries(stringNumbersToReplace).forEach(([key, value]) => {
    replacedString = replacedString.replaceAll(key, value);
  });

  return replacedString;
};

const result = [];

input.forEach((inputString) => {
  const inputStringNumbersreplaced =
    replaceStringNumbersWithNumbers(inputString);
  const splittedString = inputStringNumbersreplaced.split("");

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

console.log(
  result.reduce((agg, cur) => {
    return Number(agg) + Number(cur);
  }, 0)
);
