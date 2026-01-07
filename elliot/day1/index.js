// run `node index.js` in the terminal
const fs = require('fs');
var currPos = 50;
var fileData = [];
var zeroCount = 0;

try {
  const data = fs.readFileSync('test_data.txt', 'utf8').split('\n');
  fileData = data;
} catch (err) {
  console.log(err);
}

for (i = 0; i < fileData.length; i++) {
  var turn = turnDial(fileData[i], currPos, zeroCount);
  currPos = turn[0];
  zeroCount = turn[1];
}

console.log('Zero Count: ' + zeroCount);

function turnDial(turn, currPos, zeroCount) {
  var dir = turn.slice(0, 1);
  var rotation = parseInt(turn.slice(1));
  var newPos = 0;
  var zeros = 0;

  console.log('Starting pos: ' + currPos);
  console.log('Turn is: ' + dir + rotation);

  //determine raw rotation
  if (dir === 'L') {
    newPos = currPos - rotation;
  } else if (dir === 'R') {
    newPos = currPos + rotation;
  } else {
    newPos = currPos;
  }

  if (newPos < 0) {
    //calc # of zeros passed
    if (newPos < -99) {
      zeros = Math.abs(Math.trunc(newPos / 100));
    }
    //count 1 zero
    zeros++;
    //convert raw rotation to 0-99 dial
    newPos = ((newPos % 100) + 100) % 100;
  } else if (newPos > 100) {
    zeros = Math.trunc(newPos / 100);
    newPos = newPos % 100;
  } else if (newPos === 100) {
    newPos = 0;
  }

  if (newPos === 0) {
    zeroCount++;
  }

  zeroCount = zeroCount + zeros;

  console.log('New pos: ' + newPos);
  console.log(' ');
  return [newPos, zeroCount];
}
