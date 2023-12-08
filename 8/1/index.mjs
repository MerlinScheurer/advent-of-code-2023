import { readFileSync } from "node:fs";

const input = readFileSync("./8/1/input.txt").toString().split("\n");

// const input = [
//   "RL",
//   "",
//   "AAA = (BBB, CCC)",
//   "BBB = (DDD, EEE)",
//   "CCC = (ZZZ, GGG)",
//   "DDD = (DDD, DDD)",
//   "EEE = (EEE, EEE)",
//   "GGG = (GGG, GGG)",
//   "ZZZ = (ZZZ, ZZZ)",
// ];

// const input = [
//   "LLR",
//   "",
//   "AAA = (BBB, BBB)",
//   "BBB = (AAA, ZZZ)",
//   "ZZZ = (ZZZ, ZZZ)",
// ];

let directions = [];
const pathDecisions = {};

const parsedInput = (input) => {
  directions = input.shift().split("");

  input.shift();

  input.forEach((element) => {
    const [key, value] = element.split(" = ");

    const [left, right] = value
      .replaceAll("(", "")
      .replaceAll(")", "")
      .split(", ");

    pathDecisions[key] = [left, right];
  });
};

parsedInput(input);

let currentPath = "AAA";
let steps = 0;
do {
  const [left, right] = pathDecisions[currentPath];
  const directionIndex = steps % directions.length;

  const direction = directions[directionIndex];

  if (direction === "L") {
    currentPath = left;
  } else if (direction === "R") {
    currentPath = right;
  }

  steps++;
} while (currentPath !== "ZZZ");

console.log(currentPath, steps);
