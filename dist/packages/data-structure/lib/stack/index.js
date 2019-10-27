"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const linkedList_1 = require("../linkedList");
class Stack {
    constructor() {
        this.linkedList = new linkedList_1.LinkedList();
    }
    isEmpty() {
        return !this.linkedList.head;
    }
    peek() {
        if (this.linkedList.head)
            return this.linkedList.head.value;
        return null;
    }
    push(value) {
        this.linkedList.prepend(value);
    }
    pop() {
        const removedHead = this.linkedList.deleteHead();
        return removedHead ? removedHead.value : null;
    }
    toArray() {
        return this.linkedList
            .toArray()
            .map(linkedListNode => linkedListNode.value);
    }
    toString(callback) {
        return this.linkedList.toString(callback);
    }
}
exports.Stack = Stack;
