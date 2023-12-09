import { readFileSync } from "node:fs";

const input = readFileSync("./9/2/input.txt").toString().split("\n");

// const input = ["0 3 6 9 12 15", "1 3 6 10 15 21", "10 13 16 21 30 45"];

const inputParsed = input.map((row) => {
  return row.split(" ").map((str) => {
    return Number(str);
  });
});

const allZero = (array) => {
  if (array.length === 0) {
    return false;
  }

  return array.every((element) => {
    return element === 0;
  });
};

// ---

const newNumbers = inputParsed.map((firstRow, index) => {
  let offsets = [...firstRow];
  let offsetHistory = [offsets];
  let sanitySteps = 0;
  do {
    let nextOffsets = [];

    for (let i = 0; i < offsets.length; i++) {
      const first = offsets[i];
      const second = offsets[i + 1];

      if (first !== undefined && second !== undefined) {
        const offset = second - first;

        nextOffsets.push(offset);
      }
    }

    offsets = nextOffsets;
    offsetHistory.push(offsets);
    sanitySteps++;
  } while (!allZero(offsets) && sanitySteps < 1_000_000);

  const offsetsReversed = offsetHistory.reverse();

  for (let i = 0; i < offsetsReversed.length; i++) {
    let currentRow = offsetsReversed[i];

    const firstElement = currentRow[0];
    let previousRow = offsetsReversed[i - 1];
    const previousFirstElement = previousRow?.[0];

    const numberToAdd = firstElement - previousFirstElement;

    if (previousFirstElement !== undefined) {
      offsetsReversed[i] = [
        isNaN(numberToAdd) ? 0 : numberToAdd,
        ...previousRow,
      ];
    }
  }

  const lastArray = offsetsReversed.pop();
  const lastNumber = lastArray.shift();
  return lastNumber;
});

const result = newNumbers.reduce((acc, cur) => {
  acc += cur;
  return acc;
});

console.log(result);
