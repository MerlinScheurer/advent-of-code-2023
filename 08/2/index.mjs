import { readFileSync } from "node:fs";

const input = readFileSync("./8/2/input.txt").toString().split("\n");

// const input = [
//     "LR",
//     "",
//     "11A = (11B, XXX)",
//     "11B = (XXX, 11Z)",
//     "11Z = (11B, XXX)",
//     "22A = (22B, XXX)",
//     "22B = (22C, 22C)",
//     "22C = (22Z, 22Z)",
//     "22Z = (22B, 22B)",
//     "XXX = (XXX, XXX)",
//   ];

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

const getAllEndingWithA = (pathes) => {
  return pathes.filter((path) => {
    return path.endsWith("A");
  });
};

const checkEndsWithZ = (path) => {
  return path.endsWith("Z");
};

const lcm = (arr) => {
  // source: https://www.30secondsofcode.org/js/s/lcm/

  const gcd = (x, y) => (!y ? x : gcd(y, x % y));
  const _lcm = (x, y) => (x * y) / gcd(x, y);
  return [...arr].reduce((a, b) => _lcm(a, b));
};

parsedInput(input);

const pathesEndingWithA = getAllEndingWithA(Object.keys(pathDecisions));

let currentPaths = [...pathesEndingWithA];
let pathLengths = {};
let steps = 0;
do {
  const nextPathes = currentPaths.map((currentPath) => {
    const [left, right] = pathDecisions[currentPath];
    const directionIndex = steps % directions.length;

    const direction = directions[directionIndex];

    if (direction === "L") {
      return left;
    } else if (direction === "R") {
      return right;
    }
  });

  nextPathes.map((path) => {
    if (checkEndsWithZ(path) && pathLengths[path] === undefined) {
      pathLengths[path] = steps + 1;
    }
  });

  currentPaths = nextPathes;
  steps++;
} while (
  Object.keys(pathLengths).length !== currentPaths.length &&
  steps < 10_000_000
);

console.log(pathLengths);

const result = lcm(Object.values(pathLengths));

console.log(result);
