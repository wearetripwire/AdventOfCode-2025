import fs from "node:fs";

// CONSTANTS
const INPUT_FILE_NAME = "day5.txt";
const SPLIT_CHARACTER = "\n";
const DEBUG = false;

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

/**
 * Transforms a string range to an object containing the range as numbers
 * @param {string} inputStr - The range to transform (i.e., "1-5").
 * @returns {{ low: number; high: number }} An object containing the low and high values of the range.
 * @example "1-5" => {low: 1, high: 5}
 * @example "111-555" => {low: 111, high: 555}
 * @example "1" => throws error
 */
const getRangeFromString = (
  inputStr: string
): { low: number; high: number } => {
  const nums = inputStr.split("-");
  if (nums.length !== 2) {
    throw new Error(`Malformed range: ${inputStr}`);
  }

  try {
    return { low: Number.parseInt(nums[0]), high: Number.parseInt(nums[1]) };
  } catch (e) {
    throw e;
  }
};

//throw it in a set?
const part1 = (rows: string[]): number => {
  let total = 0;
  let IDRanges = new Array<{ low: number; high: number }>();

  // since one file has both ranges, and fresh IDs, we need to denote if we are reading a line containing a range, or an ID.
  let parsingRanges = true;
  for (let rowIdx = 0; rowIdx < rows.length; rowIdx++) {
    DEBUG && console.log("newRow", parsingRanges);
    // if the row is empty, then its the separator between ranges and fresh ids. Switch modes.
    if (rows[rowIdx] === "") {
      parsingRanges = false;
      continue;
    }

    if (parsingRanges) {
      const range = getRangeFromString(rows[rowIdx]);
      IDRanges.push(range);
    } else {
      const freshId = Number.parseInt(rows[rowIdx]);
      const isFresh = IDRanges.some((range) => {
        if (freshId >= range.low && freshId <= range.high) return true;
      });

      if (isFresh) total++;
    }
  }

  return total;
};

const part2 = (rows: string[]): number => {
  let total = 0;

  return total;
};

// MAIN
const rows = readFileIn();
console.log(part1(rows));
