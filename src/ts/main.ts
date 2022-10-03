// Написать функцию которая проверяет являются две строки анаграммой или нет

function isAnagramm(str1: string, str2: string): boolean {

    if (str1.length !== str2.length) {
        return false;
    }

    for (let i = 0; i < str1.length; i++) {
        let letter: string = str1[i];
        if (str2.indexOf(letter) !== -1) {
            str2 = str2.replace(str1[i], '');
        }
    }

    return (str2 === '');
}

// Написать функцию которая вычисляет подсчет количество цифр в числе. Реализовать с помощью рекурсии.

function digitInNamber(number: number, index: number): number {

    number = Math.abs(number);
    index = index || 1;

    if (number / Math.pow(10, index) < 1) {
        return (index);
    }
    return digitInNamber(number, index + 1);
}

// Реализовать функцию которая проверяет, является ли строка палиндромом

function withoutPunct(string: string): string {

    let stringWithoutPunct: string = '';

    for (let i = 0; i < string.length; i++) {
        let letter: string = string[i];
        let allLetter: string = '!"#$%&()*+,-./:;<=>?@[\]^_{|}~';

        if (!(allLetter.indexOf(letter) + 1)) {
            stringWithoutPunct += letter;
        }
    }

    return stringWithoutPunct;

}

function isPalindrom(string: string): boolean {

    let onlyLeter: string = withoutPunct(string).toLowerCase();
    onlyLeter = onlyLeter.replace(/\s+/g, '');

    for (let i = 0; i < onlyLeter.length; i++) {
        let lastLetter: number = onlyLeter.length - 1;
        if (onlyLeter[i] !== onlyLeter[(lastLetter - i)]) {
            return false;
        }
    }

    return true;
}

//Написать функцию которая вычисляет подсчет уникальных слов в предложении

function uniqueWords(string: string): number {

    let stringWithoutPunct: string = withoutPunct(string);
    let unique: number = 0;
    let arrString: string[] = stringWithoutPunct.split(' ');

    for (let i = 0; i < arrString.length; i++) {
        let word = arrString[i];
        let flag: boolean = false;

        for (let j = 0; j < arrString.length; j++) {

            if ((word === arrString[j]) && (i !== j)) {
                flag = true;
            }

            if ((j === arrString.length - 1) && (flag === false)) {
                ++unique;
            }
        }
    }
    return unique;
}

// Написать функцию которая вычисляет вхождение каждого слова в предложение

function wordsCount(string: string): {} {

    let stringWithoutPunct: string = withoutPunct(string).toLowerCase();
    let wordsCount: { [key: string]: number } = {};
    let arrString: string[] = stringWithoutPunct.split(' ');

    for (let i = 0; i < arrString.length; i++) {

        if (wordsCount[arrString[i]] === undefined) {
            wordsCount[arrString[i]] = 1;
        }
        ++wordsCount[arrString[i]];
    }

    return wordsCount;
}

//Вычислить периметр и площадь для прямоугольника, треугольника и круга. С помощью конструктора и классов.

interface Rectangle {
    height: number,
    width: number,
    squareRectangle: () => number,
    perimetrRectangle: () => number
}

abstract class Figure {
    abstract getSquare(): number;
    abstract getPerimetr(): number;
}

class RectangleClass extends Figure {

    constructor(public height: number, public width: number) {
        super()
        this.height = height;
        this.width = width;
    }

    getSquare() {
        return (this.height * this.width);
    }

    getPerimetr() {
        return ((this.height + this.width) * 2);
    }
}

class TriangClass extends Figure {

    constructor(public sideA: number, public sideB: number, public sideC: number) {
        super()
        this.sideA = sideA;
        this.sideB = sideB;
        this.sideC = sideC;
    }

    getSquare() {
        let halfPer = (this.sideA + this.sideB + this.sideC) / 2;
        return (Math.sqrt(halfPer * (halfPer - this.sideA) * (halfPer - this.sideB) * (halfPer - this.sideC)));
    }

    getPerimetr() {
        return (this.sideA + this.sideB + this.sideC);
    }
}

class CircleClass extends Figure {

    constructor(public radius: number) {
        super()
        this.radius = radius;
    }

    getSquare() {
        return (Math.PI * this.radius * this.radius);
    }

    getPerimetr() {
        return (Math.PI * 2 * this.radius);
    }
}

// Вычислить факториал числа. Реализовать с помощью рекурсии. Реализовать мемоизированную функцию вычисления факториала.

function factorialRecurs(customNumber: number, result?: number, factor?: number): number {

    factor = factor || 1;
    result = result || 1;
    result = result * factor;

    if (factor < customNumber) {
        ++factor;
        return factorialRecurs(customNumber, result, factor);
    }
    factor = 1;
    return result;
}

interface CashCalculetion {
    [key: string]: number
}

function factorialCash(): (customNumber: number, result?: number) => CashCalculetion {

    let cashCalculetion: CashCalculetion = {};
    let factor = 1;

    return function factorialCalc(customNumber: number, result?: number): CashCalculetion {

        result = result || 1;
        result = result * factor;
        cashCalculetion[factor] = result;

        if (factor < customNumber) {
            ++factor;
            return factorialCalc(customNumber, result);
        }

        factor = 1;

        return cashCalculetion;
    }
}

let factorial = factorialCash();

let memoiz = function () {

    let cash: CashCalculetion = {};
    let maxCash = 0;

    return function (customNumber: number) {

        if (customNumber in cash) {
            return cash[customNumber];
        }

        let result = factorial(customNumber);
        for (let key in result) {
            if (Number(key) > maxCash) { 
                cash[key] = result[key] 
            }
        }
        maxCash = customNumber;

        return result[customNumber];
    }
}

let memoizFactorial = memoiz();

//Посчитать сумму всех элементов массива, только тех которые (Кратные двум, кратные трем, которые только положительные и нечетные), реализовать с помощью рекурсии для одномерного массива.

let sumEvenFunc = function (item: number): number {

    if (item % 2 === 0) {
        return item;
    }
    return 0;

}

let sumMultOfThreeFunc = function (item: number): number {

    if (item % 3 === 0) {
        return (item);
    }
    return 0;
}

let sumOddPositivFunc = function (item: number): number {

    if ((item % 2 !== 0) && (item > 0)) {
        return (item);
    }
    return 0;
}


function sumArr(arr: number[], callback: (item: number) => number) {

    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        if (callback === undefined) {
            sum = sum + arr[i];
        }
        sum = sum + (callback(arr[i]));
    }
    return sum;
}

function sumRecurs(arr: number[], sum: number, index: number): number {

    sum = sum || 0;
    index = index || 0;
    sum = sum + arr[index];

    if (arr.length < index + 2) {
        return sum;
    }

    return sumRecurs(arr, sum, index + 1);
}

// Посчитать количество элементов массива которые (Нулевые, отрицательные, положительные, простые числа).

function nullNumb(arr: number[]) {

    let count = 0;

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === 0) {
            ++count;
        }
    }

    return count;
}

function positivNumb(arr: number[]) {

    let count = 0;

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > 0) {
            ++count;
        }
    }

    return count;
}

function negativNumb(arr: number[]) {

    let count = 0;

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < 0) {
            ++count;
        }
    }

    return count;
}

function primeNumb(arr: number[]) {

    let count = 0;
    let flag = false;

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > 0) {

            for (let m = 2; m < arr[i]; m++) {
                if ((arr[i] % m === 0)) {
                    flag = true;
                }
            }

            if (flag === false) {
                count += 1;
            }
        }
    }

    return count;
}

//Написать функции которые преобразовывают число из десятичной системы счисления в двоичную и в обратную сторону. (Достаточно написать для целых положительных чисел).

function toBinary(numb: number): string {

    let binaryRevers = '';
    let oneBit = 1;

    while (oneBit <= numb) {

        if (oneBit & numb) {
            binaryRevers = binaryRevers + '1';
        }
        binaryRevers = binaryRevers + '0';
        oneBit <<= 1;
    }

    let binary = '';

    for (let i = binaryRevers.length - 1; i >= 0; i--) {
        binary = binary + binaryRevers.charAt(i);
    }

    return binary;
}

function toDex(binary: string): number {

    let multiplier = 1;
    let dex = 0;

    for (let i = binary.length - 1; i >= 0; i--) {

        if (binary[i] === '1') {
            dex = dex + multiplier;
        }

        multiplier = multiplier * 2;
    }

    return dex;
}

//Пункты 9 и 10 выполнить для двумерных массивов.

function twoDemensArray(arr: number[][], func: (item: number) => number): number {

    let sum = 0;

    for (let i = 0; i < arr.length; i++) {
        let demensArr = arr[i];
        let sumDemArr = sumArr(demensArr, func || undefined);
        sum += sumDemArr;
    }

    return sum;
}

// Посчитать сумму значений чисел от min до max (всех, только тех которые
// кратны 3, только положительные). Нарисовать блок схему. Реализовать также с помощью рекурсии.

function sumMinToMax(min: number, max: number, sum: number): number {

    min = min + 1;
    sum = sum || 0;
    sum = sum + min;

    if (min + 1 < max) {
        return sumMinToMax(min, max, sum);
    }

    return sum;
}

function sumMinToMaxMultThree(min: number, max: number, sum: number): number {

    min = min + 1;
    sum = sum || 0;

    if (min % 3 === 0) {
        sum = sum + min;
    }

    if (min + 1 < max) {
        return sumMinToMaxMultThree(min, max, sum);
    }

    return sum;
}

function sumMinToMaxPositiv(min: number, max: number, sum: number): number {

    min = min + 1;
    sum = sum || 0;

    if (min > 0) {
        sum = sum + min;
    }

    if (min + 1 < max) {
        return sumMinToMaxPositiv(min, max, sum);
    }

    return sum;
}

function sumMinToMaxCycle(min: number, max: number): number {

    let sum = 0;

    for (let i = min + 1; i < max; i++) {
        sum = sum + i;
    }

    return sum;
}

//Найти среднее значение всех элементов одномерного/двумерного массива (Среднее только тех которые четные и которые не четные).

interface Result {
    sum: number;
    count: number;
}

function averageArrSum(arr: number[]): Result {

    let sum = 0;
    let count = 0;

    for (let j = 0; j < arr.length; j++) {
        sum += arr[j];
        ++count;
    }

    let result = { sum, count };
    return result;
}

function averageEvenSum(arr: number[]): Result {
    let sum = 0;
    let count = 0;

    for (let j = 0; j < arr.length; j++) {
        if (arr[j] % 2 === 0) {
            sum += arr[j];
            ++count;
        }
    }

    let result = { sum, count };
    return result;
}

function averageOddSum(arr: number[]): Result {
    let sum = 0;
    let count = 0;

    for (let j = 0; j < arr.length; j++) {
        if (arr[j] % 2 !== 0) {
            sum += arr[j];
            ++count;
        }
    }

    let result: Result = { sum, count };
    return result;
}

function average(arr: number[], callback: (arrIn: number[]) => Result): number;

function average(arr: number[][], callback: (arrIn: number[]) => Result): number;

function average(arr: number[]|number[][], callback: (arrIn: number[]) => Result): number {

    let count = 0;
    let sum = 0;

    for (let i = 0; i < arr.length; i++) {
        let arrIn = arr[i];

        if (typeof arrIn === 'number') {
            let callbackResult = callback(arr as number[]);
            return callbackResult.sum / callbackResult.count;

        }
        else {
            let callbackResult = callback(arrIn);
            count += callbackResult.count;
            sum += callbackResult.sum;

        }
    }

    return (sum / count);

}

//Транспонировать матрицу, сложить две матрицы.

type Matrix = number[][];

function transponMatrix(matrix: Matrix) {

    let newMatrix: Matrix = [];

    for (let j = 0; j < matrix.length; j++) {
        let matrixRow = matrix[j];

        for (let i = 0; i < matrixRow.length; i++) {
            if (j === 0) {
                newMatrix.push([]);
            }
            newMatrix[i][j] = matrixRow[i];
        }
    }

    return newMatrix;
}



function sumMatrix(matrix1: Matrix, matrix2: Matrix) {

    let sumMatr: Matrix = [];

    for (let i = 0; i < matrix1.length; i++) {
        sumMatr.push([]);
        let matrixRow1 = matrix1[i];
        let matrixRow2 = matrix2[i];
        for (let j = 0; j < matrixRow1.length; j++) {
            sumMatr[i][j] = matrixRow1[j] + matrixRow2[j];
        }
    }

    return sumMatr;
}

// Удалить из двумерного массива строку в которой присутствует хотя бы один нулевой элемент. Для столбца аналогично реализовать.

function deleteStrngWithNull(arr: Matrix, index?: number): Matrix | [] {

    index = index || 0;
    let arrString = arr[index];
    let flag = false;

    for (let i = 0; i < arrString.length; i++) {
        if (arrString[i] === 0) {
            flag = true;
        }
    }

    if (flag === true) {
        arr.splice(index, 1);
        --index;
    }

    if (index + 1 < arr.length) {
        return deleteStrngWithNull(arr, index + 1);
    }

    return arr;
}

function deleteColumnWithNull(arr: Matrix, index?: number): Matrix | [][] {

    index = index || 0;
    let arrString = arr[index];

    for (let i = 0; i < arrString.length; i++) {

        if (arrString[i] === 0) {
            for (let m = 0; m < arr.length; m++) {
                arr[m].splice(i, 1);

            }
            --i;
        }
    }

    if (index + 1 < arr.length) {
        return deleteColumnWithNull(arr, index + 1);
    }

    return arr;
}

//Посчитать сумму/количество нулевых элементов/среднее значение элементов матрицы над
// и под главной диагональю и на главной диагональю.

type Callback = (arr: number[], i: number) => number;

let underDiagonalMatrixSum: Callback = function (arr, i) {
    let sum = 0;

    for (let m = arr.length - 1; m > i; m--) {
        sum += arr[m];
    }

    return sum;
}

let overDiagonalMatrixSum: Callback = function (arr, i) {
    let sum = 0;

    for (let m = 0; m < i; m++) {
        sum += arr[m];
    }

    return sum;
}

let countNullUnderDiagonalMatrix: Callback = function (arr, i) {
    let count = 0;

    for (let m = arr.length - 1; m > i; m--) {
        if (arr[m] === 0) {
            ++count;
        }
    }

    return count;
}

let countNullOverDiagonalMatrix: Callback = function (arr, i) {
    let count = 0;

    for (let m = 0; m < i; m++) {
        if (arr[m] === 0) {
            ++count;
        }
    }

    return count;
}

function calculationMatrix(matrix: Matrix, callback: Callback) {

    for (let i = 0; i < (matrix.length - 1); i++) {
        if (matrix[i].length !== matrix.length) {
            throw new Error("arrey is not matrix");
        }
    }

    let resultAll = 0;

    for (let i = 0; i < matrix.length; i++) {
        let matrixString = matrix[i];
        resultAll += callback(matrixString, i);
    }

    return resultAll;

}

function avarageUnderDiagonalMatrix(matrix: Matrix) {

    for (let i = 0; i < (matrix.length - 1); i++) {
        if (matrix[i].length !== matrix.length) {
            throw new Error("arrey is not matrix");
        }
    }

    let count = 0;
    let sum = 0;

    for (let i = 0; i < matrix.length; i++) {
        let matrixString = matrix[i];
        for (let m = matrixString.length - 1; m > i; m--) {
            sum += matrixString[m];
            ++count;
        }
    }

    return sum / count;
}

function avarageOverDiagonalMatrix(matrix: Matrix) {

    for (let i = 0; i < (matrix.length - 1); i++) {
        if (matrix[i].length !== matrix.length) {
            throw new Error("arrey is not matrix");
        }
    }

    let count = 0;
    let sum = 0;

    for (let i = 0; i < matrix.length; i++) {
        let matrixString = matrix[i];
        for (let m = 0; m < i; m++) {
            sum += matrixString[m];
            ++count;
        }
    }

    return sum / count;
}

function DiagonalMatrixSum(matrix: Matrix) {

    for (let i = 0; i < (matrix.length - 1); i++) {
        if (matrix[i].length !== matrix.length) {
            throw new Error("arrey is not matrix");
        }
    }

    let sum = 0;

    for (let i = 0; i < matrix.length; i++) {
        let matrixString = matrix[i];
        sum += matrixString[i];
    }

    return sum;
}



function DiagonalMatrixNull(matrix: Matrix) {

    for (let i = 0; i < (matrix.length - 1); i++) {
        if (matrix[i].length !== matrix.length) {
            throw new Error("arrey is not matrix");
        }
    }

    let nullElemCount = 0;

    for (let i = 0; i < matrix.length; i++) {
        if (matrix[i][i] === 0) {
            ++nullElemCount;
        }
    }

    return nullElemCount;
}

function DiagonalMatrixAvarage(matrix: Matrix) {

    for (let i = 0; i < (matrix.length - 1); i++) {
        if (matrix[i].length !== matrix.length) {
            throw new Error("arrey is not matrix");
        }
    }

    let elemCount = 0;
    let sum = 0;

    for (let j = 0; j < matrix.length; j++) {
        sum += matrix[j][j];
        ++elemCount;
    }

    return sum / elemCount;
}

//Создать итерируемый объект, который на каждой итерации возвращает следующее значение числа
//фибоначчи (Реализовать с помощью итератора и генератора). Реализовать мемоизированную функцию.
//Реализовать с помощью рекурсии.

interface Next {
    done: boolean;
    value?: number | undefined
}

interface FibonachiIterator {
    num: number;
    [Symbol.iterator](): { next(): IteratorResult<number, boolean> };
}

let fibonachiIterator: FibonachiIterator = {
    num: 10,
    [Symbol.iterator](): { next(): IteratorResult<number, boolean> } {

        let prev = 1;
        let next = 1;
        let num = this.num;
        let res: number;
        return {

            next(): IteratorResult<number> {
                if (prev <= num) {
                    res = prev + next;
                    prev = next;
                    next = res;
                    return {
                        done: false,
                        value: res
                    }
                }
                return {
                    done: true,
                    value: undefined
                }
            }
        }
    }
};

let i = 0;
for (let num of fibonachiIterator) {
    console.log(num)
    if (i++ > 10)
        break;
}



function* fibonachiGenerator() {
    let max = 10;
    let prev: number = 0;
    let next: number = 1;
    let res:number;

    if (prev === 0) {
        next = 1;
    }

    while (prev < max) {
        res = prev + next;
        prev = next;
        next = res;
        yield res;
    }
}

let generator = fibonachiGenerator();

function recursFibonachi(index: number, arr?: number[], numb2?: number, res?: number): number[] {

    let arrFibonachi = arr || [];
    let numb1 = 0;
    numb2 = numb2 || 1;
    res = res || 0;

    if (arrFibonachi.length < (index - 1)) {
        numb1 = numb2;
        numb2 = res;
        res = numb1 + numb2;
        arrFibonachi.push(res);
        return recursFibonachi(index, arrFibonachi, numb2, res);
    }

    return arrFibonachi;
}

function fibonachiMemo() {
    let cash: number[] = [];

    return function (index: number) {

        if (index > cash.length) {
            cash = recursFibonachi(index);
        }
        let arrResult: number[] = [];
        for (let i = 0; i < index; i++) {
            arrResult.push(cash[i]);
        }
        return arrResult;
    }
}
let fiboMemo = fibonachiMemo();

//Реализовать с помощью итератора и генератора светофор. При каждой следующей итерации мы должны получать
//следующий корректный цвет по логике светофора.

function* trafficLightGenerator(): Generator<"red" | "yellow" | "green", void> {

    while (true) {
        yield 'red';
        yield 'yellow';
        yield 'green';
        yield 'yellow';
    }
}

let trafficLight = trafficLightGenerator();

let index = 0;
while (true) {
    console.log(trafficLight.next().value);
    if (index++ > 10)
        break;
}

interface NextString {
    done: boolean;
    value?: string | undefined
}

let trafficLightIterator = {
    num: 0,
    colors: [
        'red',
        'yellow',
        'green',
        'yellow',
    ],
    [Symbol.iterator]() {
        return this;
    },
    next(): NextString {

        if (this.num > 3)
            this.num = 0;

        return {
            done: false,
            value: this.colors[this.num++]
        };

    }
}
let ind = 0;
for (let num of trafficLightIterator) {
    console.log(num);
    if (ind++ > 10)
        break;
}


// Определить является ли число отрицательным или положительным без сравнения на больше/меньше нуля (побитово).
//     Посчитать количество битов числакоторые установлены в единицу и которые установлены в 0.
// Написать свою реализацию для ~, двумя способами).

function isNegative(number: number) {

    if ((number >> 31) & 1) {
        return true;
    }
    return false;
}

function countOfNumber(numb: number) {
    let count = 0;
    let countOne = 0;
    let countZero = 0;
    let oneBit = 1;

    while (oneBit <= numb) {

        if (oneBit & numb) {
            ++countOne;
        }
        ++countZero;


        oneBit <<= 1;
        ++count;
    }

    if ((numb >> 31) & 1) {
        countOne = countOne + (32 - count);
    }
    countZero = countZero + (32 - count);


    return { count, countOne, countZero };
}

function tildaMath(numb: number) {

    if (numb < 0) {
        return Math.abs(numb) - 1;
    }
    return -(numb + 1);
}



function tilda(number: number) {

    let numb = number;
    for (let i = 0; i < 32; i++) {
        numb = numb ^ (1 << i);
    }
    return numb;
}
