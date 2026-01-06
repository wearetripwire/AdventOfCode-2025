import fs from "node:fs/promises";

const data = await fs.readFile("./input.txt", "utf8");
displayOutput(getSumOfInvalidIDs(data));

function displayOutput(invalidIdTotal: number) {
  console.log(`\n------------------------------------\n`);
  console.log(`Sum of all invalid IDs : ${invalidIdTotal}`);
  console.log(`\n------------------------------------`);
}

function getSumOfInvalidIDs(data: string) {
  let total = 0;
  for (const range of data.split(",")) {
    const low = range.split("-")[0] as string;
    const high = range.split("-")[1] as string;
    let invalidIDs: number[] = findInvalidIDs(parseInt(low), parseInt(high));
    console.log(
      `${range} has ${invalidIDs.length} invalid IDs${
        invalidIDs.length > 0 ? `, ${invalidIDs.toString()}` : `.`
      }`
    );
    for (const invalidID of invalidIDs) {
      total += invalidID;
    }
  }
  return total;
}
function findInvalidIDs(low: number, high: number) {
  let invalidIDs: number[] = [];
  for (let current = low; current <= high; current++) {
    if (current.toString().match(/\b(\d+)\1+\b/)) {
      invalidIDs.push(current);
    }
  }
  return invalidIDs;
}
