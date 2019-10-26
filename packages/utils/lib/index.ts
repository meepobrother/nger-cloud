export { Comparator, ComparatorFunction, ComparatorFunctionResult } from './comparator';

export interface BooleanCallBack<T = any> {
    (val: T): boolean;
}

export interface StringCallBack<T = any> {
    (value: T): string;
}
