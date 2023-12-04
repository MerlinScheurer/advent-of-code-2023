import { readFileSync } from "node:fs";

const input = readFileSync("./3/1/input.txt").toString().split("\n");

// const input = [
//   "467..114..",
//   "...*......",
//   "..35..633.",
//   "......#...",
//   "617*......",
//   ".....+.58.",
//   "..592.....",
//   "......755.",
//   "...$.*....",
//   ".664.598..",
// ];

/**
 * Additional testcase
 * source: reddit: https://www.reddit.com/r/adventofcode/comments/189q9wv/2023_day_3_another_sample_grid_to_use/
 * Thanks to i_have_no_biscuits
 */
// const input = [
//   "12.......*..",
//   "+.........34",
//   ".......-12..",
//   "..78........",
//   "..*....60...",
//   "78.........9",
//   ".5.....23..$",
//   "8...90*12...",
//   "............",
//   "2.2......12.",
//   ".*.........*",
//   "1.1..503+.56",
// ];

const rowHasSymbols = (row) => {
  if (row !== undefined) {
    return row
      .split("")
      .map((character) => {
        return isSymbol(character);
      })
      .some(Boolean);
  } else {
    return false;
  }
};

const isSymbol = (character) => {
  const isSymbol = isNaN(Number(character));
  const isDot = character === ".";
  const isUndefined = character === undefined;

  return !isUndefined && isSymbol && !isDot;
};

const numbersList = [];

for (let y = 0; y < input.length; y++) {
  const previousRow = input[y - 1];
  const row = input[y];
  const nextRow = input[y + 1];

  let currentNumber = "";

  for (let x = 0; x < row.length + 1; x++) {
    const character = row[x];
    const number = Number(character);

    if (isNaN(number)) {
      if (currentNumber.length !== 0) {
        let hasSymbol = false;

        const length = currentNumber.length - 1;

        let topLeft = previousRow?.[x - length - 2];
        const isSymbolTopLeft = isSymbol(topLeft);
        let midLeft = row?.[x - length - 2];
        const isSymbolMidLeft = isSymbol(midLeft);
        let bottomLeft = nextRow?.[x - length - 2];
        const isSymbolBottomLeft = isSymbol(bottomLeft);

        let topRight = previousRow?.[x];
        const isSymbolTopRight = isSymbol(topRight);
        let midRight = row?.[x];
        const isSymbolMidRight = isSymbol(midRight);
        let bottomRight = nextRow?.[x];
        const isSymbolBottomRight = isSymbol(bottomRight);

        const from = x - length - 1;
        const to = x;

        const splittedPreviousRow = previousRow?.slice(from, to);
        const hasSymbolAbove = rowHasSymbols(splittedPreviousRow);

        const splittedNextRow = nextRow?.slice(from, to);
        const hasSymbolBelow = rowHasSymbols(splittedNextRow);

        hasSymbol =
          isSymbolTopLeft ||
          isSymbolMidLeft ||
          isSymbolBottomLeft ||
          hasSymbolAbove ||
          hasSymbolBelow ||
          isSymbolTopRight ||
          isSymbolMidRight ||
          isSymbolBottomRight;

        // helpful debugging
        if (false && hasSymbol) {
          console.log(topLeft, splittedPreviousRow, topRight);
          console.log(midLeft, currentNumber, midRight);
          console.log(bottomLeft, splittedNextRow, bottomRight);

          console.log(isSymbolTopLeft, hasSymbolAbove, isSymbolTopRight);
          console.log(isSymbolMidLeft, currentNumber, isSymbolMidRight);
          console.log(isSymbolBottomLeft, hasSymbolBelow, isSymbolBottomRight);

          console.log("---------");
        }

        if (hasSymbol) {
          numbersList.push(Number(currentNumber));
        }
      }

      currentNumber = "";
    } else {
      currentNumber += character;
    }
  }
}

console.log(numbersList);

const sum = numbersList.reduce((agg, cur) => {
  return Number(agg) + Number(cur);
}, 0);

// test input result:
// 4361
console.log(sum);
