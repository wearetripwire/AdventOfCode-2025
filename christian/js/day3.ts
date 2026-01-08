import fs from "node:fs";

// CONSTANTS
const INPUT_FILE_NAME = "day3.txt";
const SPLIT_CHARACTER = "\n";
const DEBUG = false;
const DIGITS = 12;

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

const joltageToNum = (joltage: {
  firstDig: number;
  secondDig: number;
}): number => {
  return Number.parseInt(`${joltage.firstDig}${joltage.secondDig}`);
};

// iterate through each bank
//    iterate through each character in the bank, left to right
//        if the current character is larger than the first dig and its not the final index of the string, set it to the first dig and set the second digit to -1,
//        if the cur char is larger than the second dig, set it to the second dig and continue going
//    add joltage of this bank to total
const part1 = (banks: string[]): void => {
  let total = 0;
  let joltage = { firstDig: -1, secondDig: -1 };

  for (const bank of banks) {
    joltage = { firstDig: -1, secondDig: -1 };

    for (let i = 0; i < bank.length; i++) {
      const digit = Number.parseInt(bank[i]);
      const isLastIdx = i === bank.length - 1;

      DEBUG && console.log(digit);
      if (digit > joltage.firstDig && !isLastIdx) {
        DEBUG && console.log("adding to first");
        joltage.firstDig = digit;
        joltage.secondDig = 0;

        DEBUG && console.log({ joltage });
      } else if (digit > joltage.secondDig) {
        DEBUG && console.log("adding to second");
        joltage.secondDig = digit;
        DEBUG && console.log({ joltage });
      }
    }

    DEBUG && console.log(joltage);
    total += joltageToNum(joltage);
  }

  console.log({ total });
};

// same as part1, but abstract out the logic from lines 44 - 55. It should instead check if there are enough digits left in the string to place it at a certain index. I.e., if there are 4 digits left in the string, it can only replace the joltage digits 9 - 12 (so long as the incoming digit is greater.)
const part2 = (banks: string[]): void => {
  let total = 0;
  let joltage: Array<number> | null = null;

  for (const bank of banks) {
    joltage = new Array<number>(DIGITS).fill(-1);

    for (let i = 0; i < bank.length; i++) {
      const digit = Number.parseInt(bank[i]);

      DEBUG && console.log(digit);

      // only replace a joltage digit if there are enough digits left in the string to fill in the remaining joltage digits to the right of the current one.
      for (let joltageIdx = 0; joltageIdx < DIGITS; joltageIdx++) {
        const remainingIdxs = bank.length - i;
        if (
          digit > joltage[joltageIdx] &&
          joltageIdx >= DIGITS - remainingIdxs
        ) {
          joltage[joltageIdx] = digit;

          // reset other digits after this one
          for (
            let otherDigs = joltageIdx + 1;
            otherDigs < DIGITS;
            otherDigs++
          ) {
            joltage[otherDigs] = 0;
          }
          DEBUG && console.log(joltage.join(""));
          break;
        }
      }
    }

    DEBUG && console.log(joltage);
    total += Number.parseInt(joltage.join(""));
  }

  console.log({ total });
};

// MAIN
const banks = readFileIn();
part2(banks);
