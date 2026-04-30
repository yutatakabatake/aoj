const fs = require("fs");
const input = fs.readFileSync("/dev/stdin", "utf8");
const lines = input.split("\n");
const n = parseInt(lines[0]);
const S = lines[1].split(' ').map(str => parseInt(str)).sort();
const q = parseInt(lines[2]);
const T = lines[3].split(' ').map(str => parseInt(str)).sort();

let count = 0;

for (let i = 0; i < q; i++) {
    const key = T[i];

    for (let j = 0; j < n; j++) {
        if (S[j] === key) {
            count++;
            break;
        }
    }
}

console.log(count);