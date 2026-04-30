const fs = require("fs");
const input = fs.readFileSync("/dev/stdin", "utf8");

const args = input.split("\n");
const exp = args[0].split(' ');

const size = exp.length;
const stack = [];
const operators = ['+', '-', '*', '/'];

for(let i = 0; i < size ; i++) {
    const term = exp[i];
    if(operators.includes(term)) {
        const a = parseInt(stack.pop());
        const b = parseInt(stack.pop());

        if(term == operators[0]) {
            const res = b + a;
            stack.push(res);
        } else if(term == operators[1]) {
            const res = b - a;
            stack.push(res);
        } else if(term == operators[2]) {
            const res = b * a;
            stack.push(res);
        } else if(term == operators[3]) {
            const res = b / a;
            stack.push(res);
        }
    } else {
        stack.push(term);
    }
console.log(stack);
}

console.log(stack[0]);
