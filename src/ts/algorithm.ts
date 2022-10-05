type CallbackPrimitive<T> = (elementPrev: T, elementNext: T) => boolean;

type CallbackObject<T> = (elementPrev: T, elementNext: T, property: string) => boolean;

interface ObjectType {
    [key: string]: Primitive
}

type Primitive = number | string | boolean | Primitive[];

type SortSignature<T> = (this: T[], callback: CallbackObject<T> | CallbackPrimitive<T>, property: string) => T[];

let sortObjectArr: CallbackObject<ObjectType> = function (elementPrev, elementNext, property) {
    return (elementPrev[property] > elementNext[property]);
}

let sortPrimitiveArr: CallbackPrimitive<Primitive> = function (elementPrev, elementNext) {
    return (elementPrev > elementNext);
}

let insertionSort: SortSignature<Primitive | ObjectType> =
    function (this, callback, property) {
        if (typeof callback !== 'function') {
            throw new Error("callback is not a function");
        }

        for (let i: number = 1; i < this.length; i++) {
            let temporary: Primitive | ObjectType = this[i];
            let j: number = i - 1;

            while ((j >= 0) && callback(this[j], temporary, property)) {
                this[j + 1] = this[j];
                j--;
            }

            this[j + 1] = temporary;
        }

        return this;
    }

declare interface Array<T> {
    insertionSort: SortSignature<T>
}

Array.prototype.insertionSort = insertionSort;

//  //////////////////////////////////////////////////

let bubbleSort: SortSignature<Primitive | ObjectType> = function (callback, property) {
    if (typeof callback !== 'function') {
        throw new Error("callback is not a function");
    }

    for (let i: number = 0; i < this.length; i++) {
        for (let j: number = 0; j < this.length - i; j++) {

            if (callback(this[j], this[j + 1], property)) {
                let temporary: Primitive | ObjectType = this[j];
                this[j] = this[j + 1];
                this[j + 1] = temporary;
            }
        }
    }

    return this;
}

declare interface Array<T> {
    bubbleSort: SortSignature<T>
}

Array.prototype.bubbleSort = bubbleSort;

//  /////////////////////////////////////////////////

interface NodeInterface<T> {
    nodeValue: T | null,
    left: null | NodeInterface<T>,
    right: null | NodeInterface<T>,
    add: (nodeValue: T, node?: NodeInterface<T>) => void | never;
    search: (nodeValue: T, node?: NodeInterface<T>) => never | NodeInterface<T>;
    delete: (nodeValue: T, node: NodeInterface<T>, parentNode: NodeInterface<T> | null, minElement?: NodeInterface<T>) => void | never;
}

class binaryNode<T> implements NodeInterface<T>{
    nodeValue: T | null;
    left: null | NodeInterface<T>;
    right: null | NodeInterface<T>;
    constructor(nodeValue: T | null) {
        this.nodeValue = nodeValue;
        this.left = null;
        this.right = null;
    }

    add(nodeValue: T, node?: NodeInterface<T>) {
        node = node || this;
        if (node.nodeValue === null) {
            node.nodeValue = nodeValue;
            return;
        } else {

            if (nodeValue > node.nodeValue) {

                if (node.right !== null) {
                    return this.add(nodeValue, node.right);
                }

                node.right = new binaryNode(nodeValue);

                return;
            }

            if (nodeValue < node.nodeValue) {

                if (node.left !== null) {
                    return this.add(nodeValue, node.left);
                }

                node.left = new binaryNode(nodeValue);
                return;
            }

            if (nodeValue = node.nodeValue) {
                throw new Error("nodeValue is duplicated");
            }
        }
    }

    search(nodeValue: T, node?: NodeInterface<T>) {
        node = node || this;

        if (node.nodeValue === nodeValue) {
            return node;
        }

        if (!node.nodeValue) {
            throw new Error("there are no values in the tree");
        }

        if (nodeValue > node.nodeValue) {

            if (node.right === null) {
                throw new Error("nodeValue is not found");
            }

            return this.search(nodeValue, node.right);
        }

        if (nodeValue < node.nodeValue) {

            if (node.left === null) {
                throw new Error("nodeValue is not found");
            }

            return this.search(nodeValue, node.left);
        }
    }

    delete(nodeValue: T, carentNode: NodeInterface<T> = this, parentNode: NodeInterface<T> | null = null, minElement: NodeInterface<T> = carentNode) {
        if (typeof nodeValue !== typeof this.nodeValue) {
            throw new Error("Value is not found");
        }

        if (!carentNode.nodeValue) {
            throw new Error("there are no values in the tree");
        }

        if (nodeValue > carentNode.nodeValue) {

            if (carentNode.right === null) {
                throw new Error("Value is not found");
            }

            parentNode = carentNode;
            carentNode = carentNode.right;
            return this.delete(nodeValue, carentNode, parentNode);
        }

        if (nodeValue < carentNode.nodeValue) {

            if (carentNode.left === null) {
                throw new Error("nodeValue is not found");
            }

            parentNode = carentNode;
            carentNode = carentNode.left;

            return this.delete(nodeValue, carentNode, parentNode);
        }

        if (nodeValue === carentNode.nodeValue) {

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

let binaryTree: binaryNode<null> = new binaryNode(null);