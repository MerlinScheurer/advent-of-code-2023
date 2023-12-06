import { readFileSync } from "node:fs";

const input = readFileSync("./6/2/input.txt").toString().split("\n");

// const input = ["Time:      7  15   30", "Distance:  9  40  200"];

const race = {};

input.map((row) => {
  const [name, values] = row.split(":");

  const raceInput = values
    .trim()
    .split(" ")
    .filter((item) => {
      return item !== "";
    })
    .reduce((acc, cur) => {
      acc = acc.concat(cur);
      return acc;
    }, "");

  [raceInput].forEach((number, index) => {
    if (race?.[index]?.[name] === undefined) {
      race[index] = { ...race[index], [name]: Number(number) };
    }
  });
});

const pathes = Object.entries(race).map(([raceId, values]) => {
  const { Time, Distance } = values;

  let wayToWin = [];
  let holdingMs = 0;
  for (let i = 0; i < Time; i++) {
    const path = (Time - i) * holdingMs;
    holdingMs++;

    if (path > Distance) {
      wayToWin.push(path);
    }
  }
  return wayToWin.length;
});

const result = pathes.reduce((acc, cur) => {
  acc *= cur;
  return acc;
});

console.log(result);
