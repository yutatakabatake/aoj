const fs = require("fs");
const input = fs.readFileSync("/dev/stdin", "utf8");
const lines = input.split("\n");
const n = parseInt(lines[0]);
const A = lines[1].split(' ').map(str => parseInt(str));

function bubbleSort(A, N) {
    let flag = 1;
    let count = 0;
    while (flag) {
        flag = 0;
        for (let i = N - 1; i > 0; i--) {
            if (A[i] < A[i - 1]) {
                const tmp = A[i];
                A[i] = A[i - 1];
                A[i - 1] = tmp;
                flag = 1
                count++
            }

        }
    }

    console.log(A.join(' '));
    console.log(count);
}

bubbleSort(A, n);