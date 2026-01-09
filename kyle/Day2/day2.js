const fs = require("fs");
const path = require("path");

const inputPath = path.join(__dirname, "input.txt");
const data = fs.readFileSync(inputPath, "utf8");

const IDs = data.split(",");
let part2Total = 0;
let part1Total = 0;

const buildChunks = (id, chunkArray, chunk) => {
  for (let i = 0; i < Math.ceil(id.length / 2); i++) {
    chunk += id[i];
    chunkArray.push(chunk);
  }
  //chunkArray = // [ '4', '44', '446' ] from 446444
};

const compareIDToChunks = (id, chunks) => {
  // [ '4', '44', '446' ] need to compare each chunk to equivalent chunks from the current id
  // need to divide the current id into chunks
  for (const chunk of chunks) {
    const n = id.length / chunk.length;
    if (n < 2) continue;

    if (chunk.repeat(n) === id) {
      // console.log({ repeating: true, chunk, times: n });
      return (part2Total += parseInt(id));
    }
  }
  return;
};

// part 1
IDs.map((id) => {
  const idArray = id.split("-");
  const min = parseInt(idArray[0]);
  const max = parseInt(idArray[1]);
  for (let i = min; i <= max; i++) {
    currentID = String(i);
    // part 1 //
    const mid = Math.floor(currentID.length / 2);
    const [a, b] = [currentID.slice(0, mid), currentID.slice(mid)];
    if (a === b) {
      // invalid
      part1Total += Number(currentID);
    }
    // part 1 //

    // part 2 //
    const chunkArray = [];
    let chunk = "";
    buildChunks(currentID, chunkArray, chunk);
    // chunks are built and stored in array

    // iterate through the currentID
    compareIDToChunks(currentID, chunkArray);
    // part 2 //
  }
});
console.log("part 1", part1Total);
//first submission 40394147121 //too low
// second 40398804950 // correct

console.log("part 2", part2Total);
// 65794984339 //correct
