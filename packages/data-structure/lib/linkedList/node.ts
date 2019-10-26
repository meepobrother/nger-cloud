import { StringCallBack } from '@nger-cloud/utils';
export class LinkedListNode<T = any> {
    value: T;
    next: LinkedListNode | null;
    constructor(value: T, next: LinkedListNode | null = null) {
        this.value = value;
        if (next) this.next = next;
    }
    toString(callback: StringCallBack<T>): string {
        return callback ? callback(this.value) : `${this.value}`;
    }
}
