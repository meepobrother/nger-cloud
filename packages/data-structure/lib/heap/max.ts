import { Heap } from './heap';

export class MaxHeap<T = any> extends Heap<T> {
    /**
     * Checks if pair of heap elements is in correct order.
     * For MinHeap the first element must be always smaller or equal.
     * For MaxHeap the first element must be always bigger or equal.
     *
     * @param {*} firstElement
     * @param {*} secondElement
     * @return {boolean}
     */
    pairIsInCorrectOrder(firstElement: T, secondElement: T): boolean {
        return this.compare.greaterThanOrEqual(firstElement, secondElement);
    }
}
