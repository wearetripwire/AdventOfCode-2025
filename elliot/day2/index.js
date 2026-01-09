// run `node index.js` in the terminal
const fs = require('fs');
let pIDs = [];
let validIDs = [];
let total = 0;

//convert input to array
try {
  const data = fs.readFileSync('data.txt', 'utf8').split(',');
  pIDs = data;
} catch (err) {
  console.log(err);
}

//find all valid id's
for (let i = 0; i < pIDs.length; i++) {
  let fullRange = getNumRange(pIDs[i]);
  validIDs = getValidIDs(fullRange, validIDs);
}

//add up valid ids for final code
for (let i = 0; i < validIDs.length; i++) {
  total = total + validIDs[i];
}

console.log(total);

//convert low and high end of range to integers
function getNumRange(item) {
  let range = item.split('-');
  let low = parseInt(range[0]);
  let high = parseInt(range[1]);
  return [low, high];
}

//determine if any numbers within range are valid
function getValidIDs(fullRange, validIDs) {
  let low = fullRange[0];
  let high = fullRange[1];
  for (let i = low; i < high + 1; i++) {
    let iS = i.toString();
    if (iS.length % 2 === 0) {
      let first = iS.slice(0, iS.length / 2);
      let last = iS.slice(iS.length / 2, iS.length);
      if (first === last) {
        let validID = first + last;
        validID = parseInt(validID);
        validIDs.push(validID);
      }
    }
  }
  return validIDs;
}
