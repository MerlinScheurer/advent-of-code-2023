import { readFileSync } from "node:fs";

// const input = readFileSync("./14/1/input.txt").toString().trim().split("\n");

const input = [
  "O....#....",
  "O.OO#....#",
  ".....##...",
  "OO.#O....O",
  ".O.....O#.",
  "O.#..O.#.#",
  "..O..#O..O",
  ".......O..",
  "#....###..",
  "#OO..#....",
];

const parseInput = (input) => {
  let map = [];
  for (let i = 0; i < input.length; i++) {
    const row = input[i].trim().split("");

    map.push(row);
  }

  return map;
};

const res = parseInput(input);

res.forEach((row) => {
  console.log(row.join(" "));
});

res.forEach((row, indexR) => {
  row.forEach((col, indexC) => {
    if (indexR > 0 && col === "O" && res[indexR - 1][indexC] === ".") {
      let i;
      for (i = 0; i < res.length; i++) {
        if (res[indexR - 1 - i]?.[indexC] !== ".") {
          break;
        }
      }

      res[indexR - i][indexC] = "O";
      res[indexR][indexC] = ".";
    }
  });
});

console.log("-------------------");

res.forEach((row) => {
  console.log(row.join(" "));
});

const result = res
  .map((row, indexR) => {
    return row
      .map((col) => {
        if (col === "O") {
          return res.length - indexR;
        }
      })
      .filter((elem) => {
        return elem !== undefined;
      });
  })
  .flat();

const sum = result.reduce((acc, cur) => {
  acc += cur;
  return acc;
});

console.log("-------------------");

console.log(sum);
