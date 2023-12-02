import { readFileSync } from "node:fs";

const input = readFileSync("./2/1/input.txt").toString().split("\n");

// const input = [
//   "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green",
//   "Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue",
//   "Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red",
//   "Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red",
//   "Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green",
// ];

const pullTemplate = {
  red: 0,
  green: 0,
  blue: 0,
};

const gameTemplate = {
  name: "",
  pulls: [],
};

const parseInput = (input) => {
  const [gameName, rest] = input.split(":");

  const iterations = rest.split(";");

  const pulls = iterations.map((iteration) => {
    const colors = iteration.trim().split(", ");

    const parsedColor = colors.map((colorString) => {
      const [count, color] = colorString.split(" ");

      return [count, color];
    });

    const pulls = parsedColor.reduce(
      (acc, cur) => {
        const [count, color] = cur;
        acc[color] = count;

        return acc;
      },
      { ...pullTemplate }
    );

    return pulls;
  });

  return { ...gameTemplate, name: gameName, pulls };
};

const checkIfValidGame = (game) => {
  const gameNumber = Number(game.name.split(" ").pop());

  const pullsChecked = game.pulls.map((pull) => {
    return pull.red <= 12 && pull.green <= 13 && pull.blue <= 14;
  });

  const isValid = pullsChecked.every((bool) => {
    return bool;
  });

  if (isValid) {
    return gameNumber;
  } else {
    return 0;
  }
};

const result = input.map((game) => {
  const parsedGame = parseInput(game);

  const gameNumber = checkIfValidGame(parsedGame);

  return gameNumber;
});

const sum = result.reduce((acc, cur) => {
  acc += cur;
  return acc;
}, 0);

console.log(sum);
