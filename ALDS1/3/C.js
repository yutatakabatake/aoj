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
        this.sentinel = new Node();
        this.sentinel.next = this.sentinel;
        this.sentinel.prev = this.sentinel;
    }

    insert(key) {
        const node = new Node(key);
        node.next = this.sentinel.next;
        this.sentinel.next.prev = node;
        this.sentinel.next = node;
        node.prev = this.sentinel;
    }

    delete(key) {
        let currentNode = this.sentinel.next;
        while (currentNode.key != key) {
            currentNode = currentNode.next;
        }
        if (currentNode.next == + null) {
            currentNode.prev.next = null;
        } else {
            currentNode.prev.next = currentNode.next;
            currentNode.next.prev = currentNode.prev;
        }
    }

    deleteFirst() {
        this.sentinel.next = this.sentinel.next.next;
        this.sentinel.next.prev = this.sentinel;
    }

    deleteLast() {
        let currentNode = this.sentinel.next;
        while (currentNode.next != + null) {
            currentNode = currentNode.next;
        }
        currentNode.prev.next = null;
    }

    print() {
        let currentNode = this.sentinel.next;
        let str = '';
        while (currentNode.next !== null) {
            str = str + ' ' + currentNode.key;
            currentNode = currentNode.next;
        };
        console.log(str);
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