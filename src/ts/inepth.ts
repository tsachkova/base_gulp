type Mapcallback<T, Q> = (item: T, index: number, arr: T[]) => Q;

function customMap<T, Q>(this: T[], callback: Mapcallback<T, Q>): Q[] {

    let result: Q[] = [];

    for (let i: number = 0; i < this.length; i++) {

        result.push(callback(this[i], i, this));
    }

    return result;
}

declare interface Array<T> {
    customMap<T, Q>(this: T[], callback: Mapcallback<T, Q>): Q[]
}

Array.prototype.customMap = customMap;

// /////////////////////////////////

type CallbackFilter<T> = (item: T, index: number, arr: T[]) => T;

function customFilter<T>(this: T[], callback: CallbackFilter<T>): T[] {

    let result: T[] = [];

    for (let i: number = 0; i < this.length; i++) {
        if (callback(this[i], i, this)) {
            result.push(this[i]);
        }
    }

    return result;
}

declare interface Array<T> {
    customFilter<T>(this: T[], callback: CallbackFilter<T>): T[]
}

Array.prototype.customFilter = customFilter;

// ///////////////////////////////////////

type ReduceCallback<T, Q> = (accum: T | Q, carrent: T, index: number, arr: T[]) => Q;

function customReduce<T, Q>(this: T[], callback: ReduceCallback<T, Q>, initialValue: Q): Q | T {

    let previous: Q | T;
    let cycleStart: number = 0;

    if (initialValue) {
        previous = initialValue;
    } else {
        previous = this[0];
        cycleStart = 1;
    }

    for (let i: number = cycleStart; i < this.length; i++) {
        previous = callback(previous, this[i], i, this);
    }

    return previous;
}

declare interface Array<T> {
    customReduce<T, Q>(this: T[], callback: ReduceCallback<T, Q>, initialValue: Q): Q | T
}

Array.prototype.customReduce = customReduce;

// ////////////////////////////////////////////////////////

type FindCallback<T> = (item: T, index: number, array: T[]) => boolean;

function customFind<T>(this: T[], callback: FindCallback<T>): T | undefined {

    for (let i: number = 0; i < this.length; i++) {
        if (callback(this[i], i, this)) {
            return this[i];
        }
    }
}

declare interface Array<T> {
    customFind<T>(this: T[], callback: FindCallback<T>): T | undefined
}

Array.prototype.customFind = customFind;

// /////////////////////////////////////////////

type ForEachCollback<T> = (item: T, index: number, arr: T[]) => void;

function customForEach<T>(this: T[], callback: ForEachCollback<T>): void {

    for (let i: number = 0; i < this.length; i++) {
        callback(this[i], i, this);
    }
}

declare interface Array<T> {
    customForEach<T>(this: T[], callback: ForEachCollback<T>): void
}

Array.prototype.customForEach = customForEach;


// ///////////////////////////////////////////

type BindCustome = (customThis: object, ...rest: []) => (arg?: []) => Function;

let customBind: BindCustome = function (this: Function, customThis: object, ...rest: []) {
    let targetFunc: Function = this;

    return function context(args:[]|undefined) {
        let keyName: symbol = Symbol('keyName');
        customThis[keyName] = targetFunc;
        let resultFunc: Function = customThis[keyName](...rest, args);
        delete customThis[keyName];
        return resultFunc;
    };
}

declare interface Function {
    customBind: BindCustome
}

Function.prototype.customBind = customBind;

// //////////////////////////////////////////

type CallCustome = (this: Function, customThis: object, ...rest: []) => void

let customCall: CallCustome = function (customThis: object, ...rest: []) {
    let keyName: symbol = Symbol('keyName');
    customThis[keyName] = this;
    customThis[keyName](...rest);
    delete customThis[keyName];
}

declare interface Function {
    customCall: CallCustome
}

Function.prototype.customCall = customCall;