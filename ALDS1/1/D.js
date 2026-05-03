const fs = require("fs");
const input = fs.readFileSync("/dev/stdin", "utf8");

const lines = input.split("\n");
const firstLine = lines[0].split(' ');
const n = parseInt(firstLine[0]);
const R = lines.splice(1).map(line => parseInt(line));

let max_profit = -1000000000;
let min_value = R[0];

for (let i = 1; i < n; i++) {
    max_profit = Math.max(max_profit, R[i] - min_value);
    min_value = Math.min(min_value, R[i]);
}

console.log(max_profit);