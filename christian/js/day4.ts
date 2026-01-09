import fs from "node:fs";

// CONSTANTS
const INPUT_FILE_NAME = "day4.txt";
const SPLIT_CHARACTER = "\n";
const ROLL_CHARACTER = "@";
const EMPTY_CHARACTER = ".";
const ORBIT_THRESHOLD = 4;
const DEBUG = false;
const DISPLACEMENT_MAP = [
  { x: -1, y: -1 },
  { x: -1, y: 0 },
  { x: -1, y: 1 },
  { x: 0, y: -1 },
  { x: 0, y: 1 },
  { x: 1, y: -1 },
  { x: 1, y: 0 },
  { x: 1, y: 1 },
];

enum Part {
  "One" = 1,
  "Two" = 2,
}

// HELPER FUNCTIONS
/**
 * Reads an input file and splits it by the chosen split character.
 * @returns {string[]} An array of strings from the file, split by split char.
 */
const readFileIn = (): string[] => {
  const fileInput = fs.readFileSync(INPUT_FILE_NAME, "utf8");
  const lines = fileInput.split(SPLIT_CHARACTER);
  return lines;
};

//  iterate through each row
//      iterate through each item in each row
//          set orbitCount to 0
//          Check the items around it, iterating orbitCount if a roll is found
//      if the orbitCount is < 4, iterate the total (and optionally remove the roll from the map)
const part1 = (
  rows: string[],
  part?: Part
): { total: number; modifiedMap: string[] } => {
  let total = 0;
  let orbitCount = 0;

  // inclusive boundaries
  const boundariesY = { low: 0, high: rows.length - 1 };
  const boundariesX = { low: 0, high: rows[0].length - 1 };

  for (let y = 0; y < rows.length; y++) {
    for (let x = 0; x < rows[y].length; x++) {
      if (rows[y][x] === EMPTY_CHARACTER) continue;

      DEBUG && console.log("---");
      DEBUG && console.log("checking: ", x, y);

      orbitCount = 0;
      for (const displacement of DISPLACEMENT_MAP) {
        const tempX = x - displacement.x;
        const tempY = y - displacement.y;

        DEBUG && console.log(tempX, tempY);

        // if the new coordinate is outside of the boundaries of the map, continue onto the next one
        if (
          tempX > boundariesX.high ||
          tempX < boundariesX.low ||
          tempY > boundariesY.high ||
          tempY < boundariesY.low
        ) {
          DEBUG && console.log("out of bounds at: ", tempX, tempY);
          continue;
        }

        if (rows[tempY][tempX] === ROLL_CHARACTER) {
          DEBUG && console.log("orbiting roll found at ", tempX, tempY);
          orbitCount++;
          // no need to check other orbiting rolls if we are already above the threshold, break early.
          if (orbitCount >= ORBIT_THRESHOLD) break;
        }
      }

      if (orbitCount < ORBIT_THRESHOLD) {
        DEBUG && console.log("found good roll at", x, y);
        total++;
        // change the current character from a roll to an empty character
        if (part === Part.Two) {
          rows[y] =
            rows[y].substring(0, x) +
            EMPTY_CHARACTER +
            rows[y].substring(x + 1);
        }
      }
    }
  }

  DEBUG && console.log({ total });
  return { total, modifiedMap: rows };
};

// rerun part 1 over and over, updating the value of any removed roll to be an empty character.
// stop once it iterates over the map and there are no changes to it.
const part2 = (rows: string[]): number => {
  let runningTotal = 0;

  while (true) {
    let { total, modifiedMap } = part1(rows, Part.Two);
    rows = modifiedMap;

    // no changes during this iteration
    if (runningTotal + total === runningTotal) {
      break;
    } else {
      runningTotal += total;
    }
  }

  return runningTotal;
};

// MAIN
const rows = readFileIn();
console.log(part2(rows));
