import { readFileSync } from "node:fs";

const input = readFileSync("./5/1/input.txt").toString().split("\n");

// const input = [
//   "seeds: 79 14 55 13",
//   "",
//   "seed-to-soil map:",
//   "50 98 2", // soil, seed,   50 -> 51 --> 52 --> 1=1 <-- 96 <-- 97 <-- 98
//   "52 50 48",
//   "",
//   "soil-to-fertilizer map:",
//   "0 15 37",
//   "37 52 2",
//   "39 0 15",
//   "",
//   "fertilizer-to-water map:",
//   "49 53 8",
//   "0 11 42",
//   "42 0 7",
//   "57 7 4",
//   "",
//   "water-to-light map:",
//   "88 18 7",
//   "18 25 70",
//   "",
//   "light-to-temperature map:",
//   "45 77 23",
//   "81 45 19",
//   "68 64 13",
//   "",
//   "temperature-to-humidity map:",
//   "0 69 1",
//   "1 0 69",
//   "",
//   "humidity-to-location map:",
//   "60 56 37",
//   "56 93 4",
// ];

const mappings = {
  seed: [],
  soil: [],
  fertilizer: [],
  water: [],
  light: [],
  temperature: [],
  humidity: [],
  location: [],
};

let seeds = [];

const parseInput = (input) => {
  const seedRow = input.shift();
  seeds = seedRow.split(": ").pop().split(" ");

  let currentFrom = "";

  input.map((row) => {
    if (row === "") {
      return;
    }

    const [name, _] = row.split(":");

    if (name.includes("map")) {
      const [mapping, _] = name.split(" map");
      const [from, __] = mapping.split("-to-");

      currentFrom = from;
    } else {
      const [to, from, range] = name.split(" ");

      const fromNumber = Number(from);
      const toNumber = Number(to);
      const rangeNumber = Number(range);

      mappings[currentFrom].push({
        from: fromNumber,
        to: toNumber,
        range: rangeNumber,
      });
    }
  });

  return mappings;
};

const findSmallestLocation = (mapping) => {
  const keys = Object.keys(mapping);

  const location = seeds.map((seed) => {
    let currentSeed = seed;

    keys.forEach((key) => {
      const map = mapping[key];

      for (let i = 0; i < map.length; i++) {
        const { from, to, range } = map[i];

        if (currentSeed >= from && currentSeed < from + range) {
          currentSeed = to + (currentSeed - from);
          break;
        }
      }
    });

    return currentSeed;
  });

  return location
    .sort((a, b) => {
      return a - b;
    })
    .shift();
};

const map = parseInput(input);

const smallestLocation = findSmallestLocation(map);

console.log(smallestLocation);
