import { readFileSync } from "node:fs";

const input = readFileSync("./11/1/input.txt").toString().split("\n");

// const input = [
//   "...#......",
//   ".......#..",
//   "#.........",
//   "..........",
//   "......#...",
//   ".#........",
//   ".........#",
//   "..........",
//   ".......#..",
//   "#...#.....",
// ];

const allEmptySpace = (row) => {
  return row.every((char) => {
    return char === ".";
  });
};

function transpose(matrix) {
  return matrix.map((col, i) => matrix.map((row) => row[i]));
}

const getDistance = (from, to) => {
  return Math.abs(to.x - from.x) + Math.abs(to.y - from.y);
};

const expandGridBy = (map) => {
  const newMap = [];

  for (let y = 0; y < map.length; y++) {
    const element = map[y];

    if (allEmptySpace(element)) {
      newMap.push(element);
      newMap.push(element);
    } else {
      newMap.push(element);
    }
  }

  return newMap;
};

const map = input.map((row) => {
  return row.split("");
});

const mapY = expandGridBy(map);
const mapYFlipped = transpose(mapY);
const mapX = expandGridBy(mapYFlipped);

const mapFlipped = transpose(mapX);

const mapWithoutUndefined = [];
for (let i = 0; i < mapFlipped.length; i++) {
  for (let a = 0; a < mapFlipped[i].length; a++) {
    const element = mapFlipped[i][a];

    if (element !== undefined) {
      if (!mapWithoutUndefined[i]) {
        mapWithoutUndefined[i] = [];
      }
      if (!mapWithoutUndefined[i][a]) {
        mapWithoutUndefined[i][a] = [];
      }

      mapWithoutUndefined[i][a] = element;
    }
  }
}

const galaxyTemplate = {
  id: 0,
  x: 0,
  y: 0,
};

const galaxies = [];
let galaxyCount = 1;

for (let y = 0; y < mapWithoutUndefined.length; y++) {
  for (let x = 0; x < mapWithoutUndefined[0].length; x++) {
    const elem = mapWithoutUndefined[y][x];

    if (elem === "#") {
      galaxies.push({ ...galaxyTemplate, id: galaxyCount, x, y });
      galaxyCount++;
    }
  }
}

const galaxyIds = Object.keys(galaxies);

const distances = [];
for (let i = 0; i < galaxyIds.length; i++) {
  for (let a = i + 1; a < galaxyIds.length; a++) {
    const d1 = getDistance(galaxies[i], galaxies[a]);

    distances.push(d1);
  }
}

const res = distances.reduce((acc, cur) => {
  acc += cur;
  return acc;
}, 0);

console.log(res);
