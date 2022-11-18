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

declare interface Array<T> {
    insertionSort: SortSignature<T>
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

declare interface Array<T> {
    bubbleSort: SortSignature<T>
}

Array.prototype.bubbleSort = bubbleSort;

//  /////////////////////////////////////////////////

type NodeArgument = number | string | number[] | string[]

class binaryNode<NodeArgument> {
    nodeValue: NodeArgument | null;
    left: null | binaryNode<NodeArgument>;
    right: null | binaryNode<NodeArgument>;
    constructor(nodeValue: NodeArgument | null) {
        this.nodeValue = nodeValue;
        this.left = null;
        this.right = null;
    }

    add(nodeValue: NodeArgument, node?: binaryNode<NodeArgument>) {
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

    search(nodeValue: NodeArgument, node?: binaryNode<NodeArgument>) {
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

    delete(nodeValue: NodeArgument, carentNode: binaryNode<NodeArgument> = this, parentNode: binaryNode<NodeArgument> | null = null, minElement: binaryNode<NodeArgument> = carentNode) {
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



let binaryTree: binaryNode<NodeArgument> = new binaryNode<NodeArgument>(null);