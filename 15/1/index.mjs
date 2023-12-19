import { readFileSync } from "node:fs";

const input = readFileSync("./15/1/input.txt").toString().split("\n");

// const input = ["rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7"];

const inputs = input.pop().split(",");

console.log(inputs);

const res = inputs.map((str) => {
  let currentValue = 0;
  const characters = str.split("");

  characters.forEach((char) => {
    currentValue += char.charCodeAt(0);
    currentValue *= 17;
    currentValue %= 256;
  });

  return currentValue;
});

console.log(
  res.reduce((acc, cur) => {
    acc += cur;
    return acc;
  })
);
