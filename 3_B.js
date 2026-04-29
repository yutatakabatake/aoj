const fs = require("fs");
const input = fs.readFileSync("/dev/stdin", "utf8");

const lines = input.split("\n");
const firstLine = lines[0].split(' ');
const n = parseInt(firstLine[0]);
const q = parseInt(firstLine[1]);

let queue = lines.slice(1).map(str => {
    const [name, timeStr] = str.split(' ');
    const time = parseInt(timeStr);
    return {name, time};
})
let now = 0;

while(queue.length !== 0) {
    let ps = queue[0];
    if(ps.time <= q) {
        now = now + ps.time;
        console.log(`${ps.name} ${now}`);
        queue = queue.slice(1);
    } else {
        now = now + q;
        const newPs = { ...ps , time : ps.time - q};
        queue = [...queue.slice(1), newPs];
    }
}
