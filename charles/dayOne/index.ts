import fs from "node:fs/promises";

const data = await fs.readFile("./input.txt", "utf8");
const start = 50;
const rotations = data.split("\n");

let movements: string[] = [];
let position = start;
let encountersWithZero = 0;

startClicking();
displayOutput();

function displayOutput() {
  console.log("The dial starts by pointing at " + start + ".\n");
  for (const movement of movements) {
    console.log(movement);
  }
  console.log("\nThe dial encountered zero " + encountersWithZero + " times.");
}
function startClicking() {
  for (const rotation of rotations) {
    let direction = rotation.substring(0, 1);
    let clicks = parseInt(rotation.substring(1));
    if (isNaN(clicks)) {
      continue;
    }
    let positionAdjustment = clicks % 100;
    let rollovers = Math.floor(clicks / 100);
    let initialPosition = position;
    position =
      direction === "L"
        ? position - positionAdjustment
        : position + positionAdjustment;

    if (position < 0 && initialPosition !== 0) {
      rollovers++;
    }

    if (position < 0) {
      position += 100;
    }

    if (position > 100) {
      position -= 100;
      rollovers++;
    }

    if (position === 100) {
      position = 0;
    }

    if (position === 0) {
      rollovers++;
    }
    encountersWithZero += rollovers;

    movements.push(
      `The dial is rotated ${rotation} to point at ${position}${
        rollovers > 0
          ? `; during this rotation, it points at zero ${rollovers} times.`
          : `.`
      }`
    );
  }
}
