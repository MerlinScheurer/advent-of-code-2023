import { readFileSync } from "node:fs";

const input = readFileSync("./3/2/input.txt").toString().split("\n");

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

function checkToRight(previousRow, x) {
  let number = previousRow[x - 1];
  let nextNumber = previousRow[x];
  let index = 0;

  do {
    if (isNumber(nextNumber)) {
      nextNumber += number;
      number = nextNumber;
    }

    index++;

    nextNumber = previousRow[x + index];
  } while (isNumber(nextNumber));

  return number
    .split("")
    .reverse()
    .reduce((acc, cur) => {
      acc += cur;
      return acc;
    }, "");
}

function checkToLeft(previousRow, x) {
  let number = "";
  let nextNumber = previousRow[x - 1];
  let index = 0;

  do {
    if (isNumber(nextNumber)) {
      nextNumber += number;
      number = nextNumber;
    }

    index++;

    nextNumber = previousRow[x - 1 - index];
  } while (isNumber(nextNumber));

  return number;
}

const rowHasNumbers = (row) => {
  if (row !== undefined) {
    return row
      .split("")
      .map((character) => {
        return isNumber(character);
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

const isNumber = (character) => {
  const isNumber = !isNaN(Number(character));
  const isDot = character === ".";
  const isUndefined = character === undefined;

  return !isUndefined && isNumber && !isDot;
};

const gearRatios = [];

for (let y = 0; y < input.length; y++) {
  const previousRow = input[y - 1];
  const row = input[y];
  const nextRow = input[y + 1];

  let currentSymbol = "";

  for (let x = 0; x < row.length + 1; x++) {
    const character = row[x];

    if (!isSymbol(character)) {
      if (currentSymbol.length !== 0) {
        let hasNumber = false;

        const length = currentSymbol.length - 1;

        let topLeft = previousRow?.[x - length - 2];
        const isNumberTopLeft = isNumber(topLeft);
        let midLeft = row?.[x - length - 2];
        const isNumberMidLeft = isNumber(midLeft);
        let bottomLeft = nextRow?.[x - length - 2];
        const isNumberBottomLeft = isNumber(bottomLeft);

        let topRight = previousRow?.[x];
        const isNumberTopRight = isNumber(topRight);
        let midRight = row?.[x];
        const isNumberMidRight = isNumber(midRight);
        let bottomRight = nextRow?.[x];
        const isNumberBottomRight = isNumber(bottomRight);

        const from = x - length - 1;
        const to = x;

        const splittedPreviousRow = previousRow?.slice(from, to);
        const hasNumberAbove = rowHasNumbers(splittedPreviousRow);

        const splittedNextRow = nextRow?.slice(from, to);
        const hasNumberBelow = rowHasNumbers(splittedNextRow);

        hasNumber =
          isNumberTopLeft ||
          isNumberMidLeft ||
          isNumberBottomLeft ||
          hasNumberAbove ||
          hasNumberBelow ||
          isNumberTopRight ||
          isNumberMidRight ||
          isNumberBottomRight;

        if (hasNumber) {
          const numbersList = [];

          if (isNumberTopLeft || hasNumberAbove || isNumberTopRight) {
            if (isNumberTopLeft && hasNumberAbove && isNumberTopRight) {
              const number = checkToLeft(previousRow, x + 1);

              numbersList.push(Number(number));
            }

            if (isNumberTopLeft && !hasNumberAbove && isNumberTopRight) {
              const rightNumber = checkToRight(previousRow, x + 1);
              const leftNumber = checkToLeft(previousRow, x - 1);

              numbersList.push(Number(rightNumber));
              numbersList.push(Number(leftNumber));
            }

            if (!isNumberTopLeft && !hasNumberAbove && isNumberTopRight) {
              const number = checkToRight(previousRow, x + 1);

              numbersList.push(Number(number));
            }

            if (!isNumberTopLeft && hasNumberAbove && isNumberTopRight) {
              const number = checkToRight(previousRow, x);

              numbersList.push(Number(number));
            }

            if (isNumberTopLeft && hasNumberAbove && !isNumberTopRight) {
              const number = checkToLeft(previousRow, x);

              numbersList.push(Number(number));
            }

            if (isNumberTopLeft && !hasNumberAbove && !isNumberTopRight) {
              const number = checkToLeft(previousRow, x - 1);

              numbersList.push(Number(number));
            }

            if (!isNumberTopLeft && hasNumberAbove && !isNumberTopRight) {
              const number = checkToLeft(previousRow, x);

              numbersList.push(Number(number));
            }
          }

          if (isNumberMidLeft || isNumberMidRight) {
            if (isNumberMidLeft && isNumberMidRight) {
              const rightNumber = checkToRight(row, x + 1);
              const leftNumber = checkToLeft(row, x - 1);

              numbersList.push(Number(rightNumber));
              numbersList.push(Number(leftNumber));
            }

            if (isNumberMidLeft && !isNumberMidRight) {
              const number = checkToLeft(row, x - 1);

              numbersList.push(Number(number));
            }

            if (!isNumberMidLeft && isNumberMidRight) {
              const number = checkToRight(row, x + 1);

              numbersList.push(Number(number));
            }
          }

          if (isNumberBottomLeft || hasNumberBelow || isNumberBottomRight) {
            if (isNumberBottomLeft && hasNumberBelow && isNumberBottomRight) {
              const number = checkToLeft(nextRow, x + 1);

              numbersList.push(Number(number));
            }

            if (isNumberBottomLeft && !hasNumberBelow && isNumberBottomRight) {
              const rightNumber = checkToRight(nextRow, x + 1);
              const leftNumber = checkToLeft(nextRow, x - 1);
              numbersList.push(Number(rightNumber));
              numbersList.push(Number(leftNumber));
            }

            if (!isNumberBottomLeft && !hasNumberBelow && isNumberBottomRight) {
              const number = checkToRight(nextRow, x + 1);

              numbersList.push(Number(number));
            }

            if (!isNumberBottomLeft && hasNumberBelow && isNumberBottomRight) {
              const number = checkToRight(nextRow, x);

              numbersList.push(Number(number));
            }

            if (isNumberBottomLeft && hasNumberBelow && !isNumberBottomRight) {
              const number = checkToLeft(nextRow, x);

              numbersList.push(Number(number));
            }

            if (isNumberBottomLeft && !hasNumberBelow && !isNumberBottomRight) {
              const number = checkToLeft(nextRow, x - 1);
              numbersList.push(Number(number));
            }

            if (!isNumberBottomLeft && hasNumberBelow && !isNumberBottomRight) {
              const number = checkToLeft(nextRow, x);
              numbersList.push(Number(number));
            }
          }

          if (numbersList.length > 1) {
            const ratio = numbersList.reduce((acc, cur) => {
              acc *= cur;
              return acc;
            });

            gearRatios.push(ratio);
          }
        }
      }

      currentSymbol = "";
    } else {
      currentSymbol += character;
    }
  }
}

const gearRatioSum = gearRatios.reduce((agg, cur) => {
  return Number(agg) + Number(cur);
}, 0);

// test input result:
// 467835
console.log(gearRatios);
console.log(gearRatioSum);

// I solved it, but i feel less smart now... xD
