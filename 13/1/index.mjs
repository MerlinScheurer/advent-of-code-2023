import { readFileSync } from "node:fs";

const input = readFileSync("./13/1/input.txt").toString().split("\n");

// const input = [
//   "#.##..##.",
//   "..#.##.#.",
//   "##......#",
//   "##......#",
//   "..#.##.#.",
//   "..##..##.",
//   "#.#.##.#.",
//   "",
//   "#...##..#",
//   "#....#..#",
//   "..##..###",
//   "#####.##.",
//   "#####.##.",
//   "..##..###",
//   "#....#..#",
//   "",
// ];

function transpose(matrix) {
  return matrix.map((col, i) => matrix.map((row) => row[i]));
}

const parseInput = (input) => {
  const maps = [];

  let map = [];
  for (let i = 0; i < input.length; i++) {
    const row = input[i].trim().split("");

    if (row.length === 0) {
      maps.push([...map]);
      map = [];
    } else {
      map.push(row);
    }
  }

  return maps;
};

const findMirrorInRow = (map) => {
  const mirrorCounts = {};

  for (let row = 0; row < map.length; row++) {
    for (let x = 0; x < map[row].length; x++) {
      let current = map[row][x];
      let next = map[row][x + 1];

      let isMirroring = true;
      if (current === next) {
        for (let i = 0; i < x; i++) {
          const previous = map[row][x - 1 - i];
          const future = map[row][x + i + 2];

          if (!future || !previous) {
            break;
          }

          if (previous !== future) {
            isMirroring = false;
            break;
          }
        }

        if (isMirroring) {
          mirrorCounts[x + 1] = (mirrorCounts[x + 1] || 0) + 1;
        }
      }
    }
  }

  const potentialMatchingPoint = Object.entries(mirrorCounts)
    .map(([key, value]) => {
      if (value === map.length) {
        return Number(key);
      }
    })
    .filter((elem) => {
      return !isNaN(elem);
    })
    .pop();

  return potentialMatchingPoint;
};

const maps = parseInput(input);

const mapsRowMirrors = maps.map((map) => {
  return findMirrorInRow(map);
});

const mirrorsRow = [];
const mirrorsCol = [];

mapsRowMirrors.forEach((matchInRow, index) => {
  if (matchInRow === undefined) {
    const mapToTranspose = maps[index];
    const transposedMap = transpose(mapToTranspose);

    const potentialMirror = findMirrorInRow(transposedMap);

    if (potentialMirror === undefined) {
      console.log("WTF");
    }
    mirrorsCol.push(potentialMirror);
  } else {
    mirrorsRow.push(matchInRow);
  }
});

const resultRow = mirrorsRow.reduce((acc, cur) => {
  acc += cur;
  return acc;
}, 0);

const resultCol = mirrorsCol.reduce((acc, cur) => {
  acc += cur * 100;
  return acc;
}, 0);

console.log(resultRow + resultCol);
