import fs from "node:fs";

// CONSTANTS
const INPUT_FILE_NAME = "day2.txt";
const SPLIT_CHARACTER = ",";
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

/**
 * Splits a string in half
 * @param {string} inputStr - The string to split.
 * @returns {{ left: string; right: string }} The two halves of the string.
 * @example "abc" => {left: "a", right: "bc"}
 * @example "aabb" => {left: "aa", right: "bb"}
 * @example "a" => {left: "", right: "a"}
 * @example "" => {left: "", right: ""}
 */
const splitInHalf = (inputStr: string): { left: string; right: string } => {
  const midPoint = inputStr.length / 2;
  const left = inputStr.substring(0, midPoint);
  const right = inputStr.substring(midPoint);
  return { left, right };
};

const part1 = (ranges: string[]): void => {
  let splitString: { left: string; right: string } = { left: "", right: "" };
  let total = 0;

  for (const rangeStr of ranges) {
    const idRange = getRangeFromString(rangeStr);

    for (let id = idRange.low; id <= idRange.high; id++) {
      splitString = splitInHalf(id + "");
      if (splitString.left === splitString.right) {
        total += id;
      }
    }
  }

  console.log(total);
};

const part2 = (ranges: string[]): void => {
  // iterate through every range in ranges
  // iterate through every number in range
  // iterate through each number string, start iteration with length of value / 2 := i. Iterate down by 1
  // check if i is divisible by the length, if not continue to next window
  // if i is divisible, check each window -> i.e., "1234", window = 2 -> 12 === 34?
  // if this loop gets to the end without breaking, add it to the sum

  let total = 0;
  let isMultiple = true;

  for (const rangeStr of ranges) {
    const idRange = getRangeFromString(rangeStr);
    DEBUG && console.log(idRange);

    for (let id = idRange.low; id <= idRange.high; id++) {
      const idAsString = id + "";
      const idLength = idAsString.length;

      DEBUG && console.log("---");
      DEBUG && console.log(id);

      for (let window = Math.floor(idLength / 2); window > 0; window--) {
        if (idLength % window !== 0) {
          DEBUG &&
            console.log({ window, status: `Not divisible by ${idLength}` });
          continue; // this window size will not evenly fit into the length of the number.
        }

        isMultiple = true; // reset the flag for each window
        for (let index = 0; index < idLength - window; index += window) {
          const LWindowStart = index;
          const LWindowEnd = LWindowStart + window;
          const RWindowStart = LWindowEnd;
          const RWindowEnd = RWindowStart + window;

          const leftWindow = idAsString.substring(LWindowStart, LWindowEnd);
          const rightWindow = idAsString.substring(RWindowStart, RWindowEnd);

          DEBUG &&
            console.log(
              `Checking Window: [${LWindowStart}, ${LWindowEnd}) against [${RWindowStart}, ${RWindowEnd}]: ${leftWindow} === ${rightWindow}?`
            );

          if (leftWindow !== rightWindow) {
            DEBUG && console.log("no.");
            isMultiple = false;
            break;
          }
        }

        if (isMultiple) {
          total += id;
          break;
        }
      }
    }
  }

  console.log({ total });
};

// MAIN
const ranges = readFileIn();
part2(ranges);
