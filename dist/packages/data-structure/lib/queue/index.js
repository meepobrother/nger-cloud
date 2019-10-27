"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const linkedList_1 = require("../linkedList");
class Queue {
    constructor() {
        this.linkedList = new linkedList_1.LinkedList();
    }
    isEmpty() {
        return !this.linkedList.head;
    }
    peek() {
        if (!this.linkedList.head) {
            return null;
        }
        return this.linkedList.head.value;
    }
    enqueue(value) {
        this.linkedList.append(value);
    }
    dequeue() {
        const removedHead = this.linkedList.deleteHead();
        return removedHead ? removedHead.value : null;
    }
    toString(callback) {
        return this.linkedList.toString(callback);
    }
}
exports.Queue = Queue;
