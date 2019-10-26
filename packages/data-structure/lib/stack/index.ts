import { LinkedList } from '../linkedList';
import { StringCallBack } from '@nger-cloud/utils'
export class Stack<T = any> {
    linkedList: LinkedList<T>;
    constructor() {
        this.linkedList = new LinkedList();
    }

    /**
     * @return {boolean}
     */
    isEmpty(): boolean {
        // The stack is empty if its linked list doesn't have a head.
        return !this.linkedList.head;
    }

    /**
     * @return {*}
     */
    peek(): T | null {
        if (this.linkedList.head) return this.linkedList.head.value;
        return null;
    }

    /**
     * @param {*} value
     */
    push(value: T) {
        // Pushing means to lay the value on top of the stack. Therefore let's just add
        // the new value at the start of the linked list.
        this.linkedList.prepend(value);
    }

    /**
     * @return {*}
     */
    pop(): T | null {
        // Let's try to delete the first node (the head) from the linked list.
        // If there is no head (the linked list is empty) just return null.
        const removedHead = this.linkedList.deleteHead();
        return removedHead ? removedHead.value : null;
    }

    /**
     * @return {*[]}
     */
    toArray(): T[] {
        return this.linkedList
            .toArray()
            .map(linkedListNode => linkedListNode.value);
    }

    /**
     * @param {function} [callback]
     * @return {string}
     */
    toString(callback: StringCallBack) {
        return this.linkedList.toString(callback);
    }
}
