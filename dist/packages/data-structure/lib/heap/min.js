"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const heap_1 = require("./heap");
class MinHeap extends heap_1.Heap {
    pairIsInCorrectOrder(firstElement, secondElement) {
        return this.compare.lessThanOrEqual(firstElement, secondElement);
    }
}
exports.MinHeap = MinHeap;
