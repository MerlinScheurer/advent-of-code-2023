import { readFileSync } from "node:fs";

const input = readFileSync("./10/2/input.txt").toString().split("\n");

// const input = [
//   "..........",
//   ".S------7.",
//   ".|F----7|.",
//   ".||....||.",
//   ".||....||.",
//   ".|L-7F-J|.",
//   ".|..||..|.",
//   ".L--JL--J.",
//   "..........",
// ];

// const input = [
//   "FF7FSF7F7F7F7F7F---7",
//   "L|LJ||||||||||||F--J",
//   "FL-7LJLJ||||||LJL-77",
//   "F--JF--7||LJLJ7F7FJ-",
//   "L---JF-JLJ.||-FJLJJ7",
//   "|F|F-JF---7F7-L7L|7|",
//   "|FFJF7L7F-JF7|JL---7",
//   "7-L-JL7||F7|L7F-7F7|",
//   "L.L7LFJ|||||FJL7||LJ",
//   "L7JLJL-JLJLJL--JLJ.L",
// ];

Math.area =
  Math.area ||
  function (polygon) {
    // source: https://gist.github.com/tnraro/f6c0bf3daa711721d3ce0dea1c37124a
    const length = polygon.length;

    let sum = 0;

    for (let i = 0; i < length; i += 2) {
      sum +=
        polygon[i] * polygon[(i + 3) % length] -
        polygon[i + 1] * polygon[(i + 2) % length];
    }

    return Math.abs(sum) * 0.5;
  };

const tileTemplate = {
  character: "",
  isStart: false,
  isGround: false,
  toNorth: false,
  toWest: false,
  toEast: false,
  toSouth: false,
};

let map = [];

input.forEach((row, rowIndex) => {
  map[rowIndex] = [];
  const tile = row.split("");

  tile.forEach((tileCharacter) => {
    const isStart = tileCharacter === "S";
    const isGround = tileCharacter === ".";

    let toNorth = ["|", "L", "J", "S"].includes(tileCharacter);
    let toEast = ["-", "L", "F", "S"].includes(tileCharacter);
    let toSouth = ["|", "7", "F", "S"].includes(tileCharacter);
    let toWest = ["-", "J", "7", "S"].includes(tileCharacter);

    map[rowIndex].push({
      ...tileTemplate,
      ...{
        character: tileCharacter,
        isStart,
        isGround,
        toNorth,
        toEast,
        toSouth,
        toWest,
      },
    });
  });
});

const [x, y] = input
  .map((row, rowIndex) => {
    if (row.includes("S")) {
      const startIndex = row.indexOf("S");
      return [startIndex, rowIndex];
    } else {
      return [];
    }
  })
  .filter((row) => {
    return row.length > 0;
  })
  .pop();

let currentX = x;
let currentY = y;

const directions = {
  North: 0,
  East: 1,
  South: 2,
  West: 3,
};

const arrow = {
  F: "↖",
  7: "↗",
  L: "↙",
  J: "↘",
};

let points = [];

points.push(currentX);
points.push(currentY);

let lastDirection = undefined;
let isFirstStart = true;
let tilesTraversed = 0;
while (
  (map[currentY][currentX].character !== "S" || isFirstStart) &&
  tilesTraversed < 1_000_000
) {
  let tile = map[currentY]?.[currentX];
  let tileNorth = map[currentY - 1]?.[currentX];
  let tileSouth = map[currentY + 1]?.[currentX];
  let tileWest = map[currentY]?.[currentX - 1];
  let tileEast = map[currentY]?.[currentX + 1];

  let connectionsCount = 0;

  const isNorthConnected = tile.toNorth && tileNorth?.toSouth;
  const isEastConnected = tile.toEast && tileEast?.toWest;
  const isSouthConnected = tile.toSouth && tileSouth?.toNorth;
  const isWestConnected = tile.toWest && tileWest?.toEast;

  if (isNorthConnected) {
    connectionsCount++;
  }

  if (isEastConnected) {
    connectionsCount++;
  }

  if (isSouthConnected) {
    connectionsCount++;
  }

  if (isWestConnected) {
    connectionsCount++;
  }

  if (connectionsCount >= 2) {
    if (isNorthConnected && lastDirection !== directions.North) {
      if (arrow[tile.character] !== undefined) {
        points.push(currentX);
        points.push(currentY);
      }

      currentY -= 1;
      lastDirection = directions.South;
    } else if (isEastConnected && lastDirection !== directions.East) {
      if (arrow[tile.character] !== undefined) {
        points.push(currentX);
        points.push(currentY);
      }

      currentX += 1;
      lastDirection = directions.West;
    } else if (isSouthConnected && lastDirection !== directions.South) {
      if (arrow[tile.character] !== undefined) {
        points.push(currentX);
        points.push(currentY);
      }

      currentY += 1;
      lastDirection = directions.North;
    } else if (isWestConnected && lastDirection !== directions.West) {
      if (arrow[tile.character] !== undefined) {
        points.push(currentX);
        points.push(currentY);
      }

      currentX -= 1;
      lastDirection = directions.East;
    }
  }

  if (isFirstStart) {
    isFirstStart = false;
  }

  tilesTraversed++;
}

let rows = [];
for (let x = 0; x < map.length; x++) {
  const element = map[x];

  let row = element
    .map((tile) => {
      return tile.character;
    })
    .join("");

  const mapping = {
    "-": "─",
    "|": "│",
    F: "┌",
    7: "┐",
    L: "└",
    J: "┘",
    // ".": " ",
  };

  Object.entries(mapping).map(([key, value]) => {
    row = row.replaceAll(key, value);
  });

  rows.push(row);
}

console.table(rows);

const halfPerimeter = tilesTraversed / 2 - 1;
const area = Math.area(points);

console.log(area, halfPerimeter);
console.log(area - halfPerimeter);
