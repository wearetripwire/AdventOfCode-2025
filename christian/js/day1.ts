import fs from "node:fs";

// CONSTANTS
const INPUT_FILE_NAME = "day1.txt";
const DIAL_LENGTH = 100;
const DIAL_START = 50;

// VARIABLES USED IN CALCULATING AMT
let dial = DIAL_START;
let dialTurnAmt = 0;
let amt = 0;

const fileInput = fs.readFileSync(INPUT_FILE_NAME, "utf8");
const lines = fileInput.split("\n");
for (const line of lines) {
  const prevDial = dial;
  const decrementing = line[0] === "L";
  dialTurnAmt = Number.parseInt(line.substring(1));

  if (decrementing) dialTurnAmt *= -1;
  dial += dialTurnAmt;

  amt += Math.abs(Math.trunc(dial / DIAL_LENGTH));

  // prevDial and Dial are different signs, meaning it crossed over 0
  if (prevDial * dial < 0) amt++;
  else if (dial === 0) amt++;

  // wrap between [0, DIAL_LENGTH]
  dial %= DIAL_LENGTH;
}

console.log(amt);
