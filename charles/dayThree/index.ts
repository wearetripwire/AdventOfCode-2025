import fs from "node:fs/promises";

const data = await fs.readFile("./input.txt", "utf8");

let joltages = getJoltages(data);
let totalJoltage = joltages.reduce((total, joltage) => total + joltage, 0);
displayOutput(joltages, totalJoltage);

function displayOutput(joltages: number[], maxJoltage: number) {
  console.log(`\n------------------------------------\n`);
  let totalString = "";

  for (const [index, voltage] of joltages.entries()) {
    totalString += `${voltage} ${index < joltages.length - 1 ? "+ " : "="}`;
  }

  console.log(
    `The total output joltage is the sum of the maximum joltage from each bank, so in this example, the total output joltage is ${totalString} ${maxJoltage}.`
  );
  console.log(`\n------------------------------------`);
}
function getJoltages(data: string) {
  let joltages: number[] = [];

  for (const battery of data.split("\n")) {
    let first = getVoltage(battery, true);
    let second = getVoltage(
      battery.slice(battery.indexOf(first.toString()) + 1)
    );
    let voltage: string = `${first}${second}`;
    console.log(
      `In ${battery}, you can make the largest joltage possible, ${voltage}, by turning on batteries ${first} and ${second}.`
    );
    joltages.push(parseInt(voltage));
  }
  return joltages;
}

function getVoltage(battery: string, enableLastDigitCheck = false) {
  let high: number = 0;
  let prevHigh: number = 0;
  for (const digit of battery) {
    if (high < parseInt(digit)) {
      prevHigh = high;
      high = parseInt(digit);
    }
  }
  // only run on the first voltage digit
  if (
    battery.indexOf(high.toString()) + 1 === battery.length &&
    enableLastDigitCheck
  ) {
    high = prevHigh;
  }
  return high;
}
