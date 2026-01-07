const fs = require("fs");
const path = require("path");

const inputPath = path.join(__dirname, "input.txt");
const data = fs.readFileSync(inputPath, "utf8");
let currentPos = 50;
let count = 0;
let rotatesPastZero = 0;

const instructions = data.split("\n");

for (let i = 0; i < instructions.length; i++) {
  // set direction of rotation
  let rotation = instructions[i].slice(1);
  if (instructions[i].includes("L")) {
    rotation = rotation * -1;
  } else {
    rotation = rotation * 1;
  }

  rotatesPastZero += Math.floor(Math.abs(rotation) / 100);

  const remainder = Math.abs(rotation) % 100;

  if (rotation > 0) {
    if (currentPos + remainder > 100) {
      rotatesPastZero++;
    }
  } else {
    if (currentPos - remainder < 0 && currentPos !== 0) {
      rotatesPastZero++;
    }
  }

  // format current position
  currentPos = (((currentPos + rotation) % 100) + 100) % 100;

  // check if current position is 0
  if (currentPos === 0) {
    count = count + 1;
  }
}

console.log("total landed on 0", count); // 1043
console.log("total rotated past 0", rotatesPastZero); //4920
console.log("total", count + rotatesPastZero); // 5963
