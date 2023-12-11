import { readFileSync } from "node:fs";

const input = readFileSync("./10/1/input.txt").toString().split("\n");

// const input = ["7-F7-", ".FJ|7", "SJLL7", "|F--J", "LJ.LJ"];

// const input = [".....", ".S-7.", ".|.|.", ".L-J.", "....."];

const tileTemplate = {
  character: "",
  isStart: false,
  isGround: false,
  toNorth: false,
  toWest: false,
  toEast: false,
  toSouth: false,
};

const map = [];

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
  North: "N",
  East: "E",
  South: "S",
  West: "W",
};

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
      currentY -= 1;
      lastDirection = directions.South;
    } else if (isEastConnected && lastDirection !== directions.East) {
      currentX += 1;
      lastDirection = directions.West;
    } else if (isSouthConnected && lastDirection !== directions.South) {
      currentY += 1;
      lastDirection = directions.North;
    } else if (isWestConnected && lastDirection !== directions.West) {
      currentX -= 1;
      lastDirection = directions.East;
    }
  }

  if (isFirstStart) {
    isFirstStart = false;
  }

  tilesTraversed++;
}

const result = tilesTraversed / 2;

console.log(result);
