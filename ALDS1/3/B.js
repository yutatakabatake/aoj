const fs = require("fs");
const input = fs.readFileSync("/dev/stdin", "utf8");

const lines = input.split("\n");
const firstLine = lines[0].split(' ');
const n = parseInt(firstLine[0]);
const q = parseInt(firstLine[1]);

class Queue {
    constructor() {
        this.size = n + 1;
        this.buffer = new Array(this.size).fill(null);
        this.head = 0;
        this.tail = 0;
    }

    isEmpty() {
        return this.head == this.tail;
    }

    isFull() {
        return this.head == (this.tail + 1) % this.size;
    }

    enqueue(value) {
        if (this.isFull()) {
            // overflow
            return;
        }
        this.buffer[this.tail] = value;
        if (this.tail + 1 == this.size) {
            this.tail = 0;
        } else {
            this.tail++;
        }
    }

    dequeue() {
        if (this.isEmpty()) {
            // underflow
            return;
        }
        const value = this.buffer[this.head];
        if (this.head + 1 == this.size) {
            this.head = 0;
        } else {
            this.head++;
        }
        return value;
    }
}

const queue = new Queue();

lines.slice(1).map(str => {
    const [name, timeStr] = str.split(' ');
    const time = parseInt(timeStr);
    return { name, time };
}).forEach(ps => queue.enqueue(ps));

let now = 0;

while (!queue.isEmpty()) {
    const ps = queue.dequeue();
    if (ps.time <= q) {
        now += ps.time;
        console.log(`${ps.name} ${now}`);
    } else {
        now += q;
        queue.enqueue({ ...ps, time: ps.time - q });
    }
}