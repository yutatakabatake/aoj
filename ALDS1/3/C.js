const fs = require("fs");

class Node {
    constructor(key, prev = null, next = null) {
        this.key = key;
        this.prev = prev;
        this.next = next;
    }
}

class DoubleLinkedList {
    constructor() {
        this.head = new Node(null);
        this.tail = new Node(null);
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }

    insert(key) {
        const node = new Node(key);
        node.next = this.head.next;
        this.head.next.prev = node;
        this.head.next = node;
        node.prev = this.head;
    }

    delete(key) {
        let currentNode = this.head.next;
        while (currentNode.key != key && currentNode != this.tail) {
            currentNode = currentNode.next;
        }
        if (currentNode != this.tail) {
            currentNode.prev.next = currentNode.next;
            currentNode.next.prev = currentNode.prev;
        }
    }

    deleteFirst() {
        this.head.next = this.head.next.next;
        this.head.next.prev = this.head;
    }

    deleteLast() {
        let currentNode = this.head.next;
        while (currentNode.next != this.tail) {
            currentNode = currentNode.next;
        }
        currentNode.prev.next = currentNode.next;
    }

    print() {
        let currentNode = this.head.next;
        let res = [];
        while (currentNode.next !== null) {
            res.push(currentNode.key);
            currentNode = currentNode.next;
        }
        console.log(res.join(' '));
    }
}


const input = fs.readFileSync("/dev/stdin", "utf8");
const lines = input.split("\n");
const n = parseInt(lines[0]);
const commands = lines.slice(1).map(str => {
    const [command, keyStr] = str.split(' ');
    const key = parseInt(keyStr);
    return { command, key };
});

const list = new DoubleLinkedList();

for (let i = 0; i < n; i++) {
    switch (commands[i].command) {
        case "insert":
            list.insert(commands[i].key);
            break;
        case "delete":
            list.delete(commands[i].key);
            break;
        case "deleteFirst":
            list.deleteFirst();
            break;
        case "deleteLast":
            list.deleteLast();
            break;
        default:
            break;
    }
}

list.print();