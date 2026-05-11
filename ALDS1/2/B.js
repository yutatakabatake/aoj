const { count } = require("console");
const fs = require("fs");
const input = fs.readFileSync("/dev/stdin", "utf8");
const lines = input.split("\n");
const n = parseInt(lines[0]);
const A = lines[1].split(' ').map(str => parseInt(str));

function selectionSort(A, N) {
    let count = 0;
    for (let i = 0; i < N - 1; i++) {
        let minj = i;
        for (let j = i + 1; j < N; j++) {
            if (A[j] < A[minj]) {
                minj = j;
            }
        }
        if (A[minj] < A[i]) {
            const tmp = A[i];
            A[i] = A[minj];
            A[minj] = tmp;
            count++;
        }
    }
    console.log(A.join(' '));
    console.log(count);
}
selectionSort(A, n);