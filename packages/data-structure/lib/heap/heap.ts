import { Comparator, ComparatorFunction } from '@nger-cloud/utils';

/**
 * Parent class for Min and Max Heaps.
 */
export class Heap<T = any> {
    heapContainer: T[];
    compare: Comparator<T>;
    /**
     * @constructs Heap
     * @param {Function} [comparatorFunction]
     */
    constructor(comparatorFunction?: ComparatorFunction<T>) {
        this.heapContainer = [];
        this.compare = new Comparator(comparatorFunction);
    }

    /**
     * @param {number} parentIndex
     * @return {number}
     */
    getLeftChildIndex(parentIndex: number): number {
        return (2 * parentIndex) + 1;
    }

    /**
     * @param {number} parentIndex
     * @return {number}
     */
    getRightChildIndex(parentIndex: number): number {
        return (2 * parentIndex) + 2;
    }

    /**
     * @param {number} childIndex
     * @return {number}
     */
    getParentIndex(childIndex: number): number {
        return Math.floor((childIndex - 1) / 2);
    }

    /**
     * @param {number} childIndex
     * @return {boolean}
     */
    hasParent(childIndex: number): boolean {
        return this.getParentIndex(childIndex) >= 0;
    }

    /**
     * @param {number} parentIndex
     * @return {boolean}
     */
    hasLeftChild(parentIndex: number): boolean {
        return this.getLeftChildIndex(parentIndex) < this.heapContainer.length;
    }

    /**
     * @param {number} parentIndex
     * @return {boolean}
     */
    hasRightChild(parentIndex: number): boolean {
        return this.getRightChildIndex(parentIndex) < this.heapContainer.length;
    }

    /**
     * @param {number} parentIndex
     * @return {*}
     */
    leftChild(parentIndex: number): T {
        return this.heapContainer[this.getLeftChildIndex(parentIndex)];
    }

    /**
     * @param {number} parentIndex
     * @return {*}
     */
    rightChild(parentIndex: number): T {
        return this.heapContainer[this.getRightChildIndex(parentIndex)];
    }

    /**
     * @param {number} childIndex
     * @return {*}
     */
    parent(childIndex: number): T {
        return this.heapContainer[this.getParentIndex(childIndex)];
    }

    /**
     * @param {number} indexOne
     * @param {number} indexTwo
     */
    swap(indexOne: number, indexTwo: number): void {
        const tmp = this.heapContainer[indexTwo];
        this.heapContainer[indexTwo] = this.heapContainer[indexOne];
        this.heapContainer[indexOne] = tmp;
    }

    /**
     * @return {*}
     */
    peek(): T | null {
        if (this.heapContainer.length === 0) {
            return null;
        }
        return this.heapContainer[0];
    }

    /**
     * @return {*}
     */
    poll(): T | null | undefined {
        if (this.heapContainer.length === 0) {
            return null;
        }

        if (this.heapContainer.length === 1) {
            return this.heapContainer.pop();
        }

        const item = this.heapContainer[0];

        // Move the last element from the end to the head.
        const pop = this.heapContainer.pop();
        if (pop) this.heapContainer[0] = pop;
        this.heapifyDown();

        return item;
    }

    /**
     * @param {*} item
     * @return {Heap}
     */
    add(item: T): Heap {
        this.heapContainer.push(item);
        this.heapifyUp();
        return this;
    }

    /**
     * @param {*} item
     * @param {Comparator} [comparator]
     * @return {Heap}
     */
    remove(item: T, comparator: Comparator = this.compare): Heap {
        // Find number of items to remove.
        const numberOfItemsToRemove = this.find(item, comparator).length;

        for (let iteration = 0; iteration < numberOfItemsToRemove; iteration += 1) {
            // We need to find item index to remove each time after removal since
            // indices are being changed after each heapify process.
            const indexToRemove = this.find(item, comparator).pop();

            // If we need to remove last child in the heap then just remove it.
            // There is no need to heapify the heap afterwards.
            if (indexToRemove === (this.heapContainer.length - 1)) {
                this.heapContainer.pop();
            } else {
                // Move last element in heap to the vacant (removed) position.
                if (indexToRemove) {
                    const pop = this.heapContainer.pop();
                    if (pop) this.heapContainer[indexToRemove] = pop;

                    // Get parent.
                    const parentItem = this.parent(indexToRemove);

                    // If there is no parent or parent is in correct order with the node
                    // we're going to delete then heapify down. Otherwise heapify up.
                    if (
                        this.hasLeftChild(indexToRemove)
                        && (
                            !parentItem
                            || this.pairIsInCorrectOrder(parentItem, this.heapContainer[indexToRemove])
                        )
                    ) {
                        this.heapifyDown(indexToRemove);
                    } else {
                        this.heapifyUp(indexToRemove);
                    }
                }

            }
        }

        return this;
    }

    /**
     * @param {*} item
     * @param {Comparator} [comparator]
     * @return {Number[]}
     */
    find(item: T, comparator = this.compare): number[] {
        const foundItemIndices = [];
        for (let itemIndex = 0; itemIndex < this.heapContainer.length; itemIndex += 1) {
            if (comparator.equal(item, this.heapContainer[itemIndex])) {
                foundItemIndices.push(itemIndex);
            }
        }
        return foundItemIndices;
    }

    /**
     * @return {boolean}
     */
    isEmpty(): boolean {
        return !this.heapContainer.length;
    }

    /**
     * @return {string}
     */
    toString(): string {
        return this.heapContainer.toString();
    }

    /**
     * @param {number} [customStartIndex]
     */
    heapifyUp(customStartIndex?: number) {
        // Take the last element (last in array or the bottom left in a tree)
        // in the heap container and lift it up until it is in the correct
        // order with respect to its parent element.
        let currentIndex = customStartIndex || this.heapContainer.length - 1;

        while (
            this.hasParent(currentIndex)
            && !this.pairIsInCorrectOrder(this.parent(currentIndex), this.heapContainer[currentIndex])
        ) {
            this.swap(currentIndex, this.getParentIndex(currentIndex));
            currentIndex = this.getParentIndex(currentIndex);
        }
    }

    /**
     * @param {number} [customStartIndex]
     */
    heapifyDown(customStartIndex = 0) {
        // Compare the parent element to its children and swap parent with the appropriate
        // child (smallest child for MinHeap, largest child for MaxHeap).
        // Do the same for next children after swap.
        let currentIndex = customStartIndex;
        let nextIndex = null;

        while (this.hasLeftChild(currentIndex)) {
            if (
                this.hasRightChild(currentIndex)
                && this.pairIsInCorrectOrder(this.rightChild(currentIndex), this.leftChild(currentIndex))
            ) {
                nextIndex = this.getRightChildIndex(currentIndex);
            } else {
                nextIndex = this.getLeftChildIndex(currentIndex);
            }

            if (this.pairIsInCorrectOrder(
                this.heapContainer[currentIndex],
                this.heapContainer[nextIndex],
            )) {
                break;
            }

            this.swap(currentIndex, nextIndex);
            currentIndex = nextIndex;
        }
    }

    /**
     * Checks if pair of heap elements is in correct order.
     * For MinHeap the first element must be always smaller or equal.
     * For MaxHeap the first element must be always bigger or equal.
     *
     * @param {*} firstElement
     * @param {*} secondElement
     * @return {boolean}
     */
    /* istanbul ignore next */
    pairIsInCorrectOrder(firstElement: T, secondElement: T): boolean {
        throw new Error(`
      You have to implement heap pair comparision method
      for ${firstElement} and ${secondElement} values.
    `);
    }
}
