class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor() {
    this.root = null;
  }

  buildTree(array, start, end) {
    if (start > end) {
      return null;
    }

    const mid = Math.floor((start + end) / 2);
    const node = new Node(array[mid]);

    node.left = this.buildTree(array, start, mid - 1);
    node.right = this.buildTree(array, mid + 1, end);

    return node;
  }

  prettyPrint(node, prefix = '', isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? '│   ' : '    '}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  }
}

function randomArray(number) {
  const tempArr = [];
  for (let index = 0; index < number; index++) {
    tempArr.push(Math.floor(Math.random() * number) + 1);
  }
  return tempArr;
}

const randomArr = randomArray(20);
console.log('🚀 ~ randomArr:', randomArr);

const testArray = [1, 2, 3, 4, 5, 6, 7];

const testTree = new Tree();
testTree.root = testTree.buildTree(testArray, 0, testArray.length - 1);
console.log('🚀 ~ testTree.root:', testTree.root);
testTree.prettyPrint(testTree.root);
