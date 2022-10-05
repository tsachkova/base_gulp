type ArreyUnsortType = Primitive |symbol| Function|{ [key: string | number | symbol]: Primitive };

type MapCustom<T, Q> = (this: T[], callback: (item: T, index: number, arr: T[]) => Q) => Q[];

let customMap: MapCustom<ArreyUnsortType, ArreyUnsortType> = function (this, callback) {
   
    let result: ArreyUnsortType[] = [];

    for (let i:number = 0; i < this.length; i++) {

        result.push(callback(this[i], i, this));
    }

    return result;
}

declare interface Array<T> {
    customMap: MapCustom<T, ArreyUnsortType>
}

Array.prototype.customMap = customMap;

// /////////////////////////////////

type CallbackFilter<T> = (item: T, index: number, arr: T[]) => T;

type FilterCustom<T> = (this: T[], callback: CallbackFilter<T>) => T[];

let customFilter: FilterCustom<ArreyUnsortType> = function (this: ArreyUnsortType[], callback) {
    
    let result: ArreyUnsortType[] = [];

    for (let i:number = 0; i < this.length; i++) {
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

type ReduceCallback<T, Q> = (accum: T | ArreyUnsortType, carrent: T, index: number, arr: T[]) => Q;

type ReduceCustom<T, Q> = (this: T[], callback: ReduceCallback<T, Q>, initialValue?: ArreyUnsortType) => Q;

let customReduce: ReduceCustom<ArreyUnsortType, ArreyUnsortType> = function (this, callback, initialValue) {

    let previous: ArreyUnsortType;
    let cycleStart:number = 0;

    if (initialValue) {
        previous = initialValue;
    } else {
        previous = this[0];
        cycleStart = 1;
    }

    for (let i:number = cycleStart; i < this.length; i++) {
        previous = callback(previous, this[i], i, this);
    }

    return previous;
}

declare interface Array<T> {
    customReduce: ReduceCustom<T, ArreyUnsortType>
}

Array.prototype.customReduce = customReduce;

// ////////////////////////////////////////////////////////

type FindCallback<T> = (item: T, index: number, array: T[]) => boolean;

type FindCustom<T> = (this: T[], callback: FindCallback<T>) => T | undefined;

let customFind: FindCustom<ArreyUnsortType> = function (this, callback) {
  
    for (let i:number = 0; i < this.length; i++) {
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

let customForEach: ForEachCustom<ArreyUnsortType> = function (callback) {

    for (let i:number = 0; i < this.length; i++) {
        callback(this[i], i, this);
    }
}

// ///////////////////////////////////////////

interface objFunction { [key:symbol]: Function }

interface obj extends objFunction{ [key: string | number]: ArreyUnsortType };

type BindCustome = (customThis: obj, ...rest: ArreyUnsortType[]) => (arg?:ArreyUnsortType[]) => Function;

let customBind: BindCustome = function (this: Function, customThis, ...rest) {
    let targetFunc:Function = this;

    return function context(args) {
        let keyName:symbol = Symbol('keyName');
        customThis[keyName] = targetFunc;
        let resultFunc:Function = customThis[keyName](...rest, args);
        delete customThis[keyName];
        return resultFunc;
    };
}

declare interface Function {
    customBind: BindCustome
}

Function.prototype.customBind = customBind;

// //////////////////////////////////////////

type CallCustome = (this: Function, customThis: obj, ...rest: ArreyUnsortType[]) => void

let customCall: CallCustome = function (customThis, ...rest) {
    let keyName:symbol = Symbol('keyName');
    customThis[keyName] = this;
    customThis[keyName](...rest);
    delete customThis[keyName];
}

declare interface Function {
    customCall: CallCustome
}

Function.prototype.customCall = customCall;