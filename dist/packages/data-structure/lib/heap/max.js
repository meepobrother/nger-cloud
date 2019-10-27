"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const heap_1 = require("./heap");
class MaxHeap extends heap_1.Heap {
    pairIsInCorrectOrder(firstElement, secondElement) {
        return this.compare.greaterThanOrEqual(firstElement, secondElement);
    }
}
exports.MaxHeap = MaxHeap;
