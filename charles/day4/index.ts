import fs from "node:fs/promises";

let warehouse: {
  [key: number]: string[];
} = {};
let totalAccessiblePaperRolls = 0;
await setupWarehouseInventory();
console.log(warehouse);
console.log("Mark movable bay's with an x");
warehouse = findMovableRolls();
console.log(warehouse);
for (const aisle of Object.values(warehouse)) {
  for (const bay of aisle) {
    if (bay === "x") {
      totalAccessiblePaperRolls++;
    }
  }
}
console.log(
  `Number of rolls of paper that can be accessed by a forklift: ${totalAccessiblePaperRolls}`
);

function findMovableRolls() {
  let mappedWarehouse: {
    [key: number]: string[];
  } = {};
  let aisleIndex = 0;
  for (let aisle of Object.values(warehouse)) {
    let mappedAisle = [];
    let bayIndex = 0;
    for (let bay of aisle) {
      if (bay === "@") {
        if (isMovable(aisleIndex, bayIndex, aisle.length)) {
          mappedAisle.push("x");
        } else {
          mappedAisle.push("@");
        }
      } else {
        mappedAisle.push(".");
      }
      bayIndex++;
    }
    mappedWarehouse[aisleIndex] = mappedAisle;
    aisleIndex++;
  }
  return mappedWarehouse;
}
function isMovable(
  currentAisle: number,
  currentBay: number,
  aisleLength: number
) {
  let prevAisle: number | null = currentAisle - 1 < 0 ? null : currentAisle - 1;
  let nextAisle: number | null =
    currentAisle + 1 > aisleLength ? null : currentAisle + 1;
  let prevBay: number | null = currentBay - 1 < 0 ? null : currentBay - 1;
  let nextBay: number | null =
    currentBay + 1 > aisleLength ? null : currentBay + 1;

  let inaccessiblePoints = 0;

  let row = warehouse[prevAisle];
  // top left
  checkBay(prevBay, row) ? inaccessiblePoints++ : inaccessiblePoints;
  //top center
  checkBay(currentBay, row) ? inaccessiblePoints++ : inaccessiblePoints;
  //top right
  checkBay(nextBay, row) ? inaccessiblePoints++ : inaccessiblePoints;

  row = warehouse[currentAisle];
  // center left
  checkBay(prevBay, row) ? inaccessiblePoints++ : inaccessiblePoints;
  // center right
  checkBay(nextBay, row) ? inaccessiblePoints++ : inaccessiblePoints;

  row = warehouse[nextAisle];
  // bottom left
  checkBay(prevBay, row) ? inaccessiblePoints++ : inaccessiblePoints;
  //bottom center
  checkBay(currentBay, row) ? inaccessiblePoints++ : inaccessiblePoints;
  //bottom right
  checkBay(nextBay, row) ? inaccessiblePoints++ : inaccessiblePoints;

  return inaccessiblePoints < 4 ? true : false;
}
function checkBay(refBay: number | null, row: string[] | undefined) {
  if (refBay !== null && row) {
    let bay = row[refBay];
    if (bay === "@") {
      return true;
    }
  }
  return false;
}
async function setupWarehouseInventory() {
  const data = await fs.readFile("./input.txt", "utf8");
  let currentAisle = 0;
  for (const aisle of data.split("\n")) {
    let currentAisleItems: string[] = [];
    for (const bay of aisle) {
      currentAisleItems.push(bay);
    }
    warehouse[currentAisle] = currentAisleItems;
    currentAisle++;
  }
  return warehouse;
}
