import { readFileSync } from "node:fs";

const input = readFileSync("./7/2/input.txt").toString().split("\n");

// const input = [
//   "32T3K 765",
//   "T55J5 684",
//    "KK677 28",
//    "KTJJT 220",
//    "QQQJA 483"];

const hands = [];

function countCharacters(cards) {
  let character = {};

  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];

    if (character[card] === undefined) {
      character[card] = 0;
    }

    character[card] += 1;
  }

  return character;
}

const checkFiveOfAKind = (cards) => {
  let character = countCharacters(cards);

  const keys = Object.keys(character);

  const filteredKeys = keys.filter((key) => {
    return character[key] === 5;
  });

  return filteredKeys.length === 1;
};

const checkFourOfAKind = (cards) => {
  let character = countCharacters(cards);

  const keys = Object.keys(character);

  const filteredKeys = keys.filter((key) => {
    return character[key] === 4;
  });

  return filteredKeys.length === 1;
};

const checkFullHouse = (cards) => {
  let character = countCharacters(cards);

  const keys = Object.keys(character);

  let hasOneTwoPair = false;
  let hasThreePair = false;
  keys.forEach((key) => {
    if (character[key] === 2) {
      if (!hasOneTwoPair) {
        hasOneTwoPair = true;
      }
    }
    if (character[key] === 3) {
      if (!hasThreePair) {
        hasThreePair = true;
      }
    }
  });

  return hasOneTwoPair && hasThreePair;
};

const checkThreeOfAKind = (cards) => {
  let character = countCharacters(cards);

  const keys = Object.keys(character);

  const filteredKeys = keys.filter((key) => {
    return character[key] === 3;
  });

  return filteredKeys.length === 1;
};

const checkTwoPair = (cards) => {
  let character = countCharacters(cards);

  const keys = Object.keys(character);

  let hasOnePair = false;
  let hasTwoPair = false;
  keys.forEach((key) => {
    if (character[key] === 2) {
      if (!hasOnePair) {
        hasOnePair = true;
      } else {
        if (!hasTwoPair) {
          hasTwoPair = true;
        }
      }
    }
  });

  return hasTwoPair;
};

const checkOnePair = (cards) => {
  let character = countCharacters(cards);

  const keys = Object.keys(character);

  let hasOnePair = false;
  let hasTwoPair = false;
  keys.forEach((key) => {
    if (character[key] === 2) {
      if (!hasOnePair) {
        hasOnePair = true;
      } else {
        if (!hasTwoPair) {
          hasTwoPair = true;
        }
      }
    }
  });

  const isOne = hasOnePair && !hasTwoPair;

  isOne;

  return hasOnePair && !hasTwoPair;
};

const checkHighCard = (cards) => {
  let character = countCharacters(cards);

  const keys = Object.keys(character);

  const filteredKeys = keys.filter((key) => {
    return character[key] === 1;
  });

  return filteredKeys.length === 5;
};

const getCharacterScore = (char) => {
  const characters = [
    "A",
    "K",
    "Q",
    "T",
    "9",
    "8",
    "7",
    "6",
    "5",
    "4",
    "3",
    "2",
    "J",
  ];

  return characters.reverse().indexOf(char);
};

const checkForJoker = (cards) => {
  if (!cards.includes("J")) {
    return cards;
  }

  let character = countCharacters(cards);

  const keys = Object.keys(character);

  const mostOccuring = keys.sort((a, b) => {
    const charA = character[a];
    const charB = character[b];

    if (charA < charB) {
      return 1;
    } else if (charA > charB) {
      return -1;
    }

    return 0;
  });

  let mostOccuringCard = mostOccuring.shift();

  if (mostOccuringCard === "J") {
    const secondMostOccuringCard = mostOccuring.shift();

    if (secondMostOccuringCard !== undefined) {
      mostOccuringCard = secondMostOccuringCard;
    }
  }

  return cards.replaceAll("J", mostOccuringCard);
};

input.forEach((hand) => {
  const [cards, bid] = hand.split(" ");

  const cardsWithoutJoker = checkForJoker(cards);

  const isFiveOfAKind = checkFiveOfAKind(cardsWithoutJoker);
  const isFourOfAKind = checkFourOfAKind(cardsWithoutJoker);
  const isFullHouse = checkFullHouse(cardsWithoutJoker);
  const isThreeOfAKind = checkThreeOfAKind(cardsWithoutJoker);
  const isTwoPair = checkTwoPair(cardsWithoutJoker);
  const isOnePair = checkOnePair(cardsWithoutJoker);
  const isHighCard = checkHighCard(cardsWithoutJoker);

  let score = 0;

  if (isFiveOfAKind) {
    score = 7;
  } else if (isFourOfAKind) {
    score = 6;
  } else if (isFullHouse) {
    score = 5;
  } else if (isThreeOfAKind) {
    score = 4;
  } else if (isTwoPair) {
    score = 3;
  } else if (isOnePair) {
    score = 2;
  } else if (isHighCard) {
    score = 1;
  } else {
    throw new Error(cardsWithoutJoker);
  }

  hands.push({
    cards,
    cardsWithoutJoker,
    bid: Number(bid),
    rank: 0,
    score,
    isFiveOfAKind,
    isFourOfAKind,
    isFullHouse,
    isThreeOfAKind,
    isTwoPair,
    isOnePair,
    isHighCard,
  });
});

const sortedHands = hands.sort((a, b) => {
  if (a.score < b.score) {
    return -1;
  } else if (a.score > b.score) {
    return 1;
  }

  for (let i = 0; i < a.cards.length; i++) {
    const cardA = a.cards[i];
    const cardB = b.cards[i];

    const charScoreA = getCharacterScore(cardA);
    const charScoreB = getCharacterScore(cardB);

    if (charScoreA < charScoreB) {
      return -1;
    } else if (charScoreA > charScoreB) {
      return 1;
    }
  }

  return 0;
});

let winningsSum = 0;
for (let i = 1; i < sortedHands.length + 1; i++) {
  const hand = sortedHands[i - 1];
  const winnings = hand.bid * i;

  winningsSum += winnings;
}

console.log(winningsSum);
