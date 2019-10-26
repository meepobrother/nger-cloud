export type ComparatorFunctionResult = -1 | 0 | 1;
export interface ComparatorFunction<T = any> {
    (a: T, b: T): ComparatorFunctionResult;
}
export type DefaultComparatorFunctionType = string | number;
export function defaultCompareFunction(a: DefaultComparatorFunctionType, b: DefaultComparatorFunctionType) {
    if (a === b) {
        return 0;
    }
    return a < b ? -1 : 1;
}
export class Comparator<T = any> {
    compare: ComparatorFunction;
    /**
     * @param {function(a: *, b: *)} [compareFunction] - It may be custom compare function that, let's
     * say may compare custom objects together.
     */
    constructor(compareFunction?: ComparatorFunction) {
        this.compare = compareFunction || defaultCompareFunction;
    }

    /**
     * Checks if two variables are equal.
     * @param {*} a
     * @param {*} b
     * @return {boolean}
     */
    equal(a: T, b: T): boolean {
        return this.compare(a, b) === 0;
    }

    /**
     * Checks if variable "a" is less than "b".
     * @param {*} a
     * @param {*} b
     * @return {boolean}
     */
    lessThan(a: T, b: T): boolean {
        return this.compare(a, b) < 0;
    }

    /**
     * Checks if variable "a" is greater than "b".
     * @param {*} a
     * @param {*} b
     * @return {boolean}
     */
    greaterThan(a: T, b: T): boolean {
        return this.compare(a, b) > 0;
    }

    /**
     * Checks if variable "a" is less than or equal to "b".
     * @param {*} a
     * @param {*} b
     * @return {boolean}
     */
    lessThanOrEqual(a: T, b: T): boolean {
        return this.lessThan(a, b) || this.equal(a, b);
    }

    /**
     * Checks if variable "a" is greater than or equal to "b".
     * @param {*} a
     * @param {*} b
     * @return {boolean}
     */
    greaterThanOrEqual(a: T, b: T): boolean {
        return this.greaterThan(a, b) || this.equal(a, b);
    }

    /**
     * Reverses the comparison order.
     */
    reverse() {
        const compareOriginal = this.compare;
        this.compare = (a, b) => compareOriginal(b, a);
    }
}
