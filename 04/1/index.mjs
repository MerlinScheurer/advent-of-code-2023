import { readFileSync } from "node:fs";

const input = readFileSync("./4/1/input.txt").toString().split("\n");

// const input = [
//     "Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53",
//     "Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19",
//     "Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1",
//     "Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83",
//     "Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36",
//     "Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11",
//   ];

const card = {
  name: "",
  winning: [],
  pulled: [],
};

const replaceDoubleSpace = (characters) => {
  return characters.replaceAll("  ", " ");
};

const parseInput = (input) => {
  const currentCard = { ...card };

  const [name, rest] = input.split(":");
  const [winning, pulled] = rest.split("|");

  currentCard.name = name;

  const winningNumbers = replaceDoubleSpace(winning).trim().split(" ");
  const pullNumbers = replaceDoubleSpace(pulled).trim().split(" ");

  currentCard.winning = winningNumbers;
  currentCard.pulled = pullNumbers;

  return currentCard;
};

const points = input.map((currentCard) => {
  const cardParsed = parseInput(currentCard);

  const cardsIncludedInWinning = cardParsed.pulled
    .map((number) => {
      return cardParsed.winning.includes(number);
    })
    .filter(Boolean).length;

  if (cardsIncludedInWinning > 0) {
    return Math.pow(2, cardsIncludedInWinning - 1);
  } else {
    return 0;
  }
});

const result = points.reduce((agg, cur) => {
  return Number(agg) + Number(cur);
}, 0);

console.log(result);
