type CallbackSort<T> = (elementPrev: T, elementNext: T, property?: string) => boolean;

type SortSignature<T> = (this: T[], callback: CallbackSort<T>, property?: string) => T[];

function sortObjectArr<T>(elementPrev: T, elementNext: T, property: string) {
    return (elementPrev[property] > elementNext[property]);
}

function sortPrimitiveArr<T>(elementPrev: T, elementNext: T) {
    return (elementPrev > elementNext);
}

function insertionSort<T>(this: T[], callback: CallbackSort<T>, property?: string): T[] {

    for (let i: number = 1; i < this.length; i++) {
        let temporary: T = this[i];
        let j: number = i - 1;

        while ((j >= 0) && callback(this[j], temporary, property)) {
            this[j + 1] = this[j];
            j--;
        }

        this[j + 1] = temporary;
    }

    return this;
}

Array.prototype.insertionSort = insertionSort;

//  //////////////////////////////////////////////////

function bubbleSort<T>(this: T[], callback: CallbackSort<T>, property?: string): T[] {

    for (let i: number = 0; i < this.length; i++) {
        for (let j: number = 0; j < this.length - 1 - i; j++) {

            if (callback(this[j], this[j + 1], property)) {
                let temporary: T = this[j];
                this[j] = this[j + 1];
                this[j + 1] = temporary;
            }
        }
    }

    return this;
}

Array.prototype.bubbleSort = bubbleSort;

declare interface Array<T> {
    bubbleSort: SortSignature<T>;
    insertionSort: SortSignature<T>
}

type params = number | string | symbol;

class binaryNode<T> {
    nodeValue: T | null;
    left: null | binaryNode<T>;
    right: null | binaryNode<T>;
    key?: string;
    constructor(nodeValue: T, key?: string) {
        this.nodeValue = nodeValue;
        this.left = null;
        this.right = null;
        if (key) {
            this.key = key;
        }
    }

    compare(carentValue: T, parentValue: T): boolean | void {
        if (this.key) {
            if (carentValue[this.key] === parentValue[this.key]) {
                return;
            }
            return (carentValue[this.key] > parentValue[this.key]);
        }
        if (carentValue === parentValue) {
            return;
        }
        return (carentValue > parentValue);
    }

    add(nodeValue: T, node?: binaryNode<T>) {
        node = node || this;
        if (node.nodeValue === null) {
            node.nodeValue = nodeValue;
            return;
        }

        if (this.compare(nodeValue, node.nodeValue)) {
            if (node.right !== null) {
                return this.add(nodeValue, node.right);
            }

            node.right = new binaryNode(nodeValue);

            return;
        } else if (this.compare(nodeValue, node.nodeValue) === false) {

            if (node.left !== null) {
                return this.add(nodeValue, node.left);
            }

            node.left = new binaryNode(nodeValue);
            return;
        }

        throw new Error("nodeValue is duplicated");

    }

    search(nodeValue: T, node?: binaryNode<T>) {
        node = node || this;

        if (!node.nodeValue) {
            throw new Error("there are no values in the tree");
        }

        if (this.compare(nodeValue, node.nodeValue) === undefined) {
            return node;
        }

        if (this.compare(nodeValue, node.nodeValue)) {

            if (node.right === null) {
                throw new Error("nodeValue is not found");
            }

            return this.search(nodeValue, node.right);
        }

        if (node.left === null) {
            throw new Error("nodeValue is not found");
        }

        return this.search(nodeValue, node.left);

    }

    delete(nodeValue: T, carentNode: binaryNode<T> = this, parentNode: binaryNode<T> | null = null, minElement: binaryNode<T> = carentNode) {
        if (typeof nodeValue !== typeof this.nodeValue) {
            throw new Error("Value is not found");
        }

        if (!carentNode.nodeValue) {
            throw new Error("there are no values in the tree");
        }

        if (this.compare(nodeValue, carentNode.nodeValue)) {

            if (carentNode.right === null) {
                throw new Error("Value is not found");
            }

            parentNode = carentNode;
            carentNode = carentNode.right;
            return this.delete(nodeValue, carentNode, parentNode);
        }

        if (this.compare(nodeValue, carentNode.nodeValue) === false) {

            if (carentNode.left === null) {
                throw new Error("nodeValue is not found");
            }

            parentNode = carentNode;
            carentNode = carentNode.left;

            return this.delete(nodeValue, carentNode, parentNode);
        }

        if (this.compare(nodeValue, carentNode.nodeValue) === undefined) {

            if ((carentNode.left === null) && (carentNode.right === null)) {

                if (carentNode === this) {
                    carentNode.nodeValue = null;
                    return;
                }

                if (parentNode && parentNode.nodeValue) {
                    if (carentNode.nodeValue < parentNode.nodeValue) {
                        parentNode.left = null;
                    }

                    if (carentNode.nodeValue > parentNode.nodeValue) {
                        parentNode.right = null;
                    }
                }

                return;
            }



            if ((carentNode.left === null) && (carentNode.right !== null)) {

                if (carentNode === this) {
                    carentNode.nodeValue = carentNode.right.nodeValue;
                    carentNode.left = carentNode.right.left;
                    carentNode.right = carentNode.right.right;

                    return;
                }

                if (parentNode && parentNode.nodeValue && carentNode.nodeValue < parentNode.nodeValue) {
                    parentNode.left = carentNode.right;
                }

                if (parentNode && parentNode.nodeValue && parentNode.nodeValue > parentNode.nodeValue) {
                    parentNode.right = carentNode.right;
                }

                return;
            }

            if ((carentNode.left !== null) && (carentNode.right === null)) {

                if (carentNode === this) {
                    carentNode.nodeValue = carentNode.left.nodeValue;
                    carentNode.right = carentNode.left.right;
                    carentNode.left = carentNode.left.left;

                    return;
                }

                if (parentNode && parentNode.nodeValue && carentNode.nodeValue < parentNode.nodeValue) {
                    parentNode.left = carentNode.left;
                }

                if (parentNode && parentNode.nodeValue && carentNode.nodeValue > parentNode.nodeValue) {
                    parentNode.right = carentNode.left;
                }

                return;
            }

            if ((carentNode.left !== null) && (carentNode.right !== null)) {

                if (minElement === carentNode) {
                    parentNode = minElement;
                    minElement = carentNode.right;
                }

                if (minElement.left !== null) {
                    parentNode = minElement;
                    minElement = minElement.left;

                    return this.delete(nodeValue, carentNode, parentNode, minElement)
                }

                if (minElement.left === null && parentNode) {
                    carentNode.nodeValue = minElement.nodeValue;

                    if (parentNode !== carentNode) {
                        parentNode.left = minElement.right;
                    } else {
                        carentNode.right = minElement.right;
                    }

                    return;
                }
            }
        }
    }
}
