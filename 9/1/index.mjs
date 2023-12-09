import { readFileSync } from "node:fs";

const input = readFileSync("./9/1/input.txt").toString().split("\n");

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

const newNumbers = inputParsed.map((firstRow) => {
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
  const newOffsets = [];

  for (let i = 0; i < offsetsReversed.length; i++) {
    const element = offsetsReversed[i];

    if (i === 0) {
      element.push(element[0]);
    } else if (i > 0) {
      const lastElement = element[element.length - 1];
      const lastRow = offsetsReversed[i - 1];
      const elementToAdd = lastRow[lastRow.length - 1];

      element.push(elementToAdd + lastElement);
    }

    newOffsets.push(element);
  }

  const lastArray = newOffsets.pop();
  const lastNumber = lastArray.pop();
  return lastNumber;
});

const result = newNumbers.reduce((acc, cur) => {
  acc += cur;
  return acc;
});

console.log(result);
