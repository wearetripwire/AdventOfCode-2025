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
    let nextDigit = getVoltage(battery, 12);
    let powerOverwhelming = nextDigit.toString();
    let remainingBatteryVoltage = battery;
    for (let i = 1; i <= 11; i++) {
      remainingBatteryVoltage = remainingBatteryVoltage.slice(
        remainingBatteryVoltage.indexOf(nextDigit.toString()) + 1
      );
      nextDigit = getVoltage(remainingBatteryVoltage, 12 - i);
      powerOverwhelming += nextDigit.toString();
    }

    console.log(
      `In ${battery}, you can make the largest 12 digit joltage possible using ${powerOverwhelming}.`
    );
    joltages.push(parseInt(powerOverwhelming));
  }
  return joltages;
}

function getVoltage(battery: string, limit: number) {
  let high: number = 0;
  let index = battery.length;
  for (const digit of battery) {
    if (high < parseInt(digit)) {
      high = parseInt(digit);
    }
    if (index <= limit) {
      break;
    }
    index--;
  }
  return high;
}
