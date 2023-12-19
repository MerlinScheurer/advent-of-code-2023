import { readFileSync } from "node:fs";

// const input = readFileSync("./15/2/input.txt").toString().split("\n");

const input = ["rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7"];

const inputs = input.pop().split(",");

const hash = (str) => {
  let currentValue = 0;

  str.split("").forEach((char) => {
    currentValue += char.charCodeAt(0);
    currentValue *= 17;
    currentValue %= 256;
  });

  return currentValue;
};

const boxes = {};

inputs.forEach((str) => {
  const hasEqualSign = str.includes("=");

  if (hasEqualSign) {
    const [label, focal] = str.split("=");
    const box = hash(label);

    if (!boxes[box]) {
      boxes[box] = new Map();
    }

    boxes[box].set(label, Number(focal));
  } else {
    const [label, _] = str.split("-");
    const box = hash(label);

    if (!boxes[box]) {
      boxes[box] = new Map();
    }

    boxes[box].delete(label);
  }
});

console.log(boxes);

const focusingPowers = Object.keys(boxes).map((index) => {
  let focusingPower = 0;

  const box = boxes[index];
  const entries = box.entries();

  let iteration = 1;
  for (const key of entries) {
    focusingPower += (Number(index) + 1) * iteration * key[1];

    iteration++;
  }

  return focusingPower;
});

console.log(focusingPowers);

console.log(
  focusingPowers.reduce((acc, cur) => {
    acc += cur;
    return acc;
  })
);
