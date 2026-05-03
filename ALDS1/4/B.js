const fs = require("fs");
const input = fs.readFileSync("/dev/stdin", "utf8");
const lines = input.split("\n");
const n = parseInt(lines[0]);
const S = lines[1].split(' ').map(str => parseInt(str));
const q = parseInt(lines[2]);
const T = lines[3].split(' ').map(str => parseInt(str));

let count = 0;

function binarySearch(n, A, key) {
    let left = 0;
    let right = n;

    while (left < right) {
        let mid = Math.floor((left + right) / 2);
        if (key === A[mid]) {
            count++;
            return;
        } else if (key < A[mid]) {
            right = mid;
        } else if (key > A[mid]) {
            left = mid + 1;
        }
    }
}

for (let i = 0; i < q; i++) {
    const key = T[i];
    binarySearch(n, S, key);
}

console.log(count);