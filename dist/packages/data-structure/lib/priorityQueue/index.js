"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const heap_1 = require("../heap");
const utils_1 = require("@nger-cloud/utils");
class PriorityQueue extends heap_1.MinHeap {
    constructor() {
        super();
        this.priorities = new Map();
        this.compare = new utils_1.Comparator(this.comparePriority.bind(this));
    }
    add(item, priority = 0) {
        this.priorities.set(item, priority);
        super.add(item);
        return this;
    }
    remove(item, customFindingComparator) {
        super.remove(item, customFindingComparator);
        this.priorities.delete(item);
        return this;
    }
    changePriority(item, priority) {
        this.remove(item, new utils_1.Comparator(this.compareValue));
        this.add(item, priority);
        return this;
    }
    findByValue(item) {
        return this.find(item, new utils_1.Comparator(this.compareValue));
    }
    hasValue(item) {
        return this.findByValue(item).length > 0;
    }
    comparePriority(a, b) {
        if (this.priorities.get(a) === this.priorities.get(b)) {
            return 0;
        }
        return this.priorities.get(a) < this.priorities.get(b) ? -1 : 1;
    }
    compareValue(a, b) {
        if (a === b) {
            return 0;
        }
        return a < b ? -1 : 1;
    }
}
exports.PriorityQueue = PriorityQueue;
