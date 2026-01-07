const fs = require("fs");
const path = require("path");

const inputPath = path.join(__dirname, "input.txt");
const data = fs.readFileSync(inputPath, "utf8");

const IDs = data.split(",");
let repeatingIds = 0;
let reversedIds = 0;

IDs.map((id) => {
  const idArray = id.split("-");
  const min = parseInt(idArray[0]);
  const max = parseInt(idArray[1]);
  for (let i = min; i <= max; i++) {
    i = String(i);
    const mid = Math.floor(i.length / 2);
    const [a, b] = [i.slice(0, mid), i.slice(mid)];
    if (a === b) {
      // invalid
      repeatingIds += Number(i);
    }

    let reversed = b.split("").reverse().join("");
    if (a === reversed) {
      // invalid
      reversedIds += Number(i);
    }
  }
  // need to add the values of the invalids ids together
});
console.log("repeating ids", repeatingIds);
// console.log("reversedIds ids", reversedIds);

//first submission 40394147121 //too low
// second 40398804950
