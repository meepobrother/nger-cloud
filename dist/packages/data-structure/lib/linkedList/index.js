"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = require("./node");
exports.LinkedListNode = node_1.LinkedListNode;
const utils_1 = require("@nger-cloud/utils");
class LinkedList {
    constructor(comparatorFunction) {
        this.compare = new utils_1.Comparator(comparatorFunction);
    }
    prepend(value) {
        const newNode = new node_1.LinkedListNode(value, this.head);
        this.head = newNode;
        if (!this.tail) {
            this.tail = newNode;
        }
        return this;
    }
    append(value) {
        const newNode = new node_1.LinkedListNode(value);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
            return this;
        }
        if (this.tail)
            this.tail.next = newNode;
        this.tail = newNode;
        return this;
    }
    delete(value) {
        if (!this.head) {
            return null;
        }
        let deletedNode = null;
        while (this.head && this.compare.equal(this.head.value, value)) {
            deletedNode = this.head;
            this.head = this.head.next;
        }
        let currentNode = this.head;
        if (currentNode !== null) {
            while (currentNode.next) {
                if (this.compare.equal(currentNode.next.value, value)) {
                    deletedNode = currentNode.next;
                    currentNode.next = currentNode.next.next;
                }
                else {
                    currentNode = currentNode.next;
                }
            }
        }
        if (this.tail && this.compare.equal(this.tail.value, value)) {
            this.tail = currentNode;
        }
        return deletedNode;
    }
    find({ value = undefined, callback = undefined }) {
        if (!this.head) {
            return null;
        }
        let currentNode = this.head;
        while (currentNode) {
            if (callback && callback(currentNode.value)) {
                return currentNode;
            }
            if (value !== undefined && this.compare.equal(currentNode.value, value)) {
                return currentNode;
            }
            if (currentNode.next) {
                currentNode = currentNode.next;
            }
        }
        return null;
    }
    deleteTail() {
        const deletedTail = this.tail;
        if (this.head === this.tail) {
            this.head = null;
            this.tail = null;
            return deletedTail;
        }
        let currentNode = this.head;
        if (currentNode) {
            while (currentNode.next) {
                if (!currentNode.next.next) {
                    currentNode.next = null;
                }
                else {
                    currentNode = currentNode.next;
                }
            }
        }
        this.tail = currentNode;
        return deletedTail;
    }
    deleteHead() {
        if (!this.head) {
            return null;
        }
        const deletedHead = this.head;
        if (this.head.next) {
            this.head = this.head.next;
        }
        else {
            this.head = null;
            this.tail = null;
        }
        return deletedHead;
    }
    fromArray(values) {
        values.forEach(value => this.append(value));
        return this;
    }
    toArray() {
        const nodes = [];
        let currentNode = this.head;
        while (currentNode) {
            nodes.push(currentNode);
            currentNode = currentNode.next;
        }
        return nodes;
    }
    toString(callback) {
        return this.toArray().map(node => node.toString(callback)).toString();
    }
    reverse() {
        let currNode = this.head;
        let prevNode = null;
        let nextNode = null;
        while (currNode) {
            nextNode = currNode.next;
            currNode.next = prevNode;
            prevNode = currNode;
            currNode = nextNode;
        }
        this.tail = this.head;
        this.head = prevNode;
        return this;
    }
}
exports.LinkedList = LinkedList;
