import { MinHeap } from '../heap';
import { Comparator, ComparatorFunctionResult } from '@nger-cloud/utils';
// It is the same as min heap except that when comparing two elements
// we take into account its priority instead of the element's value.
export class PriorityQueue<T = any> extends MinHeap<T> {
    priorities: Map<any, any> = new Map();
    constructor() {
        super();
        this.compare = new Comparator(this.comparePriority.bind(this));
    }

    /**
     * Add item to the priority queue.
     * @param {*} item - item we're going to add to the queue.
     * @param {number} [priority] - items priority.
     * @return {PriorityQueue}
     */
    add(item: T, priority: number = 0): PriorityQueue {
        this.priorities.set(item, priority);
        super.add(item);
        return this;
    }

    /**
     * Remove item from priority queue.
     * @param {*} item - item we're going to remove.
     * @param {Comparator} [customFindingComparator] - custom function for finding the item to remove
     * @return {PriorityQueue}
     */
    remove(item: T, customFindingComparator: Comparator<T>): this {
        super.remove(item, customFindingComparator);
        this.priorities.delete(item);
        return this;
    }

    /**
     * Change priority of the item in a queue.
     * @param {*} item - item we're going to re-prioritize.
     * @param {number} priority - new item's priority.
     * @return {PriorityQueue}
     */
    changePriority(item: T, priority: number): PriorityQueue {
        this.remove(item, new Comparator(this.compareValue));
        this.add(item, priority);
        return this;
    }

    /**
     * Find item by ite value.
     * @param {*} item
     * @return {Number[]}
     */
    findByValue(item: T): number[] {
        return this.find(item, new Comparator(this.compareValue));
    }

    /**
     * Check if item already exists in a queue.
     * @param {*} item
     * @return {boolean}
     */
    hasValue(item: T): boolean {
        return this.findByValue(item).length > 0;
    }

    /**
     * Compares priorities of two items.
     * @param {*} a
     * @param {*} b
     * @return {number}
     */
    comparePriority(a: T, b: T): ComparatorFunctionResult {
        if (this.priorities.get(a) === this.priorities.get(b)) {
            return 0;
        }
        return this.priorities.get(a) < this.priorities.get(b) ? -1 : 1;
    }

    /**
     * Compares values of two items.
     * @param {*} a
     * @param {*} b
     * @return {number}
     */
    compareValue(a: T, b: T): ComparatorFunctionResult {
        if (a === b) {
            return 0;
        }
        return a < b ? -1 : 1;
    }
}
