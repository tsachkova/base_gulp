
type ArreyType = number | string | boolean | any[] | symbol | { [key: string | number | symbol]: any }

type CallbackMap<T> = (item: T, index: number, arr: T[]) => any

type MapCustom<T> = (this: T[], callback: CallbackMap<T>) => any[] | never


let customMap: MapCustom<ArreyType> = function (this, callback) {
    if (typeof callback !== 'function') {
        throw new Error("callback is not a function");
    }
    let result: any[] = [];



    for (let i = 0; i < this.length; i++) {

        result.push(callback(this[i], i, this));
    }

    return result;
}

declare interface Array<T> {
    customMap: MapCustom<T>
}

Array.prototype.customMap = customMap;

// /////////////////////////////////

type CallbackFilter<T> = (item: T, index: number, arr: T[]) => T;

type FilterCustom<T> = (this: T[], callback: CallbackFilter<T>) => T[] | never


let customFilter: FilterCustom<ArreyType> = function (this: ArreyType[], callback) {
    if (typeof callback !== 'function') {
        throw new Error("callback is not a function");
    }
    let result: ArreyType[] = [];

    for (let i = 0; i < this.length; i++) {
        if (callback(this[i], i, this)) {
            result.push(this[i]);
        }
    }

    return result;
}

declare interface Array<T> {
    customFilter: FilterCustom<T>
}

Array.prototype.customFilter = customFilter;

// ///////////////////////////////////////

type ReduceCallback<T> = (accum: T | any, carrent: T, index: number, arr: T[]) => any;

type ReduceCustom<T> = (this: T[], callback: ReduceCallback<T>, initialValue?: any) => any;

let customReduce: ReduceCustom<ArreyType> = function (this, callback, initialValue) {
    if (typeof callback !== 'function') {
        throw new Error("callback is not a function");
    }

    let previous: ArreyType;
    let cycleStart = 0;

    if (initialValue) {
        previous = initialValue;
    } else {
        previous = this[0];
        cycleStart = 1;
    }

    for (let i = cycleStart; i < this.length; i++) {
        previous = callback(previous, this[i], i, this);
    }

    return previous;
}

declare interface Array<T> {
    customReduce: ReduceCustom<T>
}

Array.prototype.customReduce = customReduce;

// ////////////////////////////////////////////////////////

type FindCallback<T> = (item: T, index: number, array: T[]) => boolean;

type FindCustom<T> = (this: T[], callback: FindCallback<T>) => T | undefined;

let customFind: FindCustom<ArreyType> = function (this, callback) {
    if (typeof callback !== 'function') {
        throw new Error("callback is not a function");
    }

    for (let i = 0; i < this.length; i++) {
        if (callback(this[i], i, this)) {
            return this[i];
        }
    }
}

declare interface Array<T> {
    customFind: FindCustom<T>
}

Array.prototype.customFind = customFind;

// /////////////////////////////////////////////

type ForEachCustom<T> = (this: T[], callback: (item: T, index: number, arr: T[]) => void) => void

let customForEach: ForEachCustom<ArreyType> = function (callback) {
    if (typeof callback !== 'function') {
        throw new Error("callback is not a function");
    }

    for (let i = 0; i < this.length; i++) {
        callback(this[i], i, this);
    }
}

// ///////////////////////////////////////////

type obj = { [key: string | number | symbol]: any };

type BindCustome = (customThis: obj, ...rest: any[]) => (arg?: any[]) => Function;

let customBind: BindCustome = function (this: Function, customThis, ...rest) {
    let targetFunc = this;

    return function context(args) {
        let keyName = Symbol('keyName');
        customThis[keyName] = targetFunc;
        let resultFunc = customThis[keyName](...rest, args);
        delete customThis[keyName];
        return resultFunc;
    };
}

declare interface Function {
    customBind: BindCustome
}

Function.prototype.customBind = customBind;

// //////////////////////////////////////////

type CallCustome = (this: Function, customThis: obj, ...rest: any[]) => any

let customCall: CallCustome = function (customThis, ...rest) {
    let keyName = Symbol('keyName');
    customThis[keyName] = this;
    customThis[keyName](...rest);
    delete customThis[keyName];
}

declare interface Function {
    customCall: CallCustome
}

Function.prototype.customCall = customCall;

