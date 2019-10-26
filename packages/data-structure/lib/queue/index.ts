import { LinkedList } from '../linkedList';
import { StringCallBack } from '@nger-cloud/utils';
export class Queue<T> {
    linkedList: LinkedList<T>;
    constructor() {
        this.linkedList = new LinkedList();
    }

    /**
     * @return {boolean}
     */
    isEmpty(): boolean {
        return !this.linkedList.head;
    }

    /**
     * Read the element at the front of the queue without removing it.
     * @return {*}
     */
    peek(): T | null {
        if (!this.linkedList.head) {
            return null;
        }
        return this.linkedList.head.value;
    }

    /**
     * Add a new element to the end of the queue (the tail of the linked list).
     * This element will be processed after all elements ahead of it.
     * @param {*} value
     */
    enqueue(value: T): void {
        this.linkedList.append(value);
    }

    /**
     * Remove the element at the front of the queue (the head of the linked list).
     * If the queue is empty, return null.
     * @return {*}
     */
    dequeue(): T | null {
        const removedHead = this.linkedList.deleteHead();
        return removedHead ? removedHead.value : null;
    }

    /**
     * @param [callback]
     * @return {string}
     */
    toString(callback: StringCallBack): string {
        // Return string representation of the queue's linked list.
        return this.linkedList.toString(callback);
    }
}
