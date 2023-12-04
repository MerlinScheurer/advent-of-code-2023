import { readFileSync } from "node:fs";

const input = readFileSync("./4/1/input.txt").toString().split("\n");

// const input = [
//   "Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53",
//   "Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19",
//   "Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1",
//   "Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83",
//   "Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36",
//   "Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11",
// ];

const card = {
  name: "",
  number: 0,
  winning: [],
  pulled: [],
};

const cards = {};

const replaceDoubleSpace = (characters) => {
  return characters.replaceAll("  ", " ");
};

const parseInput = (input) => {
  const currentCard = { ...card };

  const [name, rest] = input.split(":");
  const [_, number] = name.split("d");
  const [winning, pulled] = rest.split("|");

  currentCard.name = name.trim();
  currentCard.number = number.trim();

  const winningNumbers = replaceDoubleSpace(winning).trim().split(" ");
  const pullNumbers = replaceDoubleSpace(pulled).trim().split(" ");

  currentCard.winning = winningNumbers;
  currentCard.pulled = pullNumbers;

  return currentCard;
};

const getWinningCount = (card) => {
  const cardsIncludedInWinning = card.pulled
    .map((number) => {
      return card.winning.includes(number);
    })
    .filter(Boolean).length;

  if (cardsIncludedInWinning > 0) {
    return cardsIncludedInWinning;
  } else {
    return 0;
  }
};

const parsedCards = input.map((currentCard) => {
  const cardParsed = parseInput(currentCard);
  return cardParsed;
});

parsedCards.forEach((card) => {
  if (cards[card.number] === undefined) {
    cards[card.number] = [];
  }

  cards[card.number].push(card);
});

Object.entries(cards).map(([cardNumber, cardInstances]) => {
  cardInstances.map((card) => {
    const winingCount = getWinningCount(card);

    for (let i = 0; i < winingCount; i++) {
      const cardsToAdd = Number(cardNumber) + i + 1;

      const nextCard = cards[cardsToAdd][0];

      cards[cardsToAdd].push({ ...nextCard });
    }
  });
});

const cardNumbers = Object.keys(cards);

const sum = cardNumbers.reduce((acc, cur) => {
  acc += cards[cur].length;

  return acc;
}, 0);

console.log(sum);
