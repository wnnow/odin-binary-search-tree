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

  insert(value) {
    const newNode = new Node(value);
    if (this.root === null) {
      this.root = newNode;
    } else {
      this.root = this.insertNode(this.root, newNode);
    }
  }

  insertNode(root, newNode) {
    if (root.data === newNode) return;

    if (newNode.data < root.data) {
      if (root.left === null) {
        root.left = newNode;
      } else {
        this.insertNode(root.left, newNode);
      }
    } else {
      if (root.right === null) {
        root.right = newNode;
      } else {
        this.insertNode(root.right, newNode);
      }
    }
    return root;
  }

  find(value) {
    let current = this.root;

    while (current !== null) {
      if (value === current.data) {
        return current;
      } else if (value < current.data) {
        current = current.left;
      } else if (value > current.data) {
        current = current.right;
      }
    }
    return null;
  }

  min(node = this.root) {
    while (node.left !== null) {
      node = node.left;
    }
    return node;
  }

  max(node = this.root) {
    while (node.right !== null) {
      node = node.right;
    }
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

  // find(node = this.root, value) {
  //   if (node === null) return null;
  //   if (value === node.data) {
  //     return node;
  //   }
  //   if (value < node.data) {
  //     return this.find(node.left, value);
  //   }
  //   if (value > node.data) {
  //     return this.find(node.right, value);
  //   }
  //   return 'not found';
  // }

  // insert(key) {
  //   this.root = this.insertRec(this.root, key);
  // }

  // insertRec(root, key) {
  //   if (root == null) {
  //     root = new Node(key);
  //     return root;
  //   }

  //   if (key < root.data) root.left = this.insertRec(root.left, key);
  //   else if (key > root.data) root.right = this.insertRec(root.right, key);

  //   return root;
  // }

  // minValue(node = this.root) {
  //   let minValue;
  //   while (node) {
  //     minValue = node.data;
  //     node = node.left;
  //   }
  //   return minValue;
  // }

  // maxValue(node = this.root) {
  //   let maxValue;
  //   while (node) {
  //     maxValue = node.data;
  //     node = node.right;
  //   }
  //   return maxValue;
  // }
}

function randomArray(number) {
  const tempArr = [];
  for (let index = 0; index < number; index++) {
    tempArr.push(Math.floor(Math.random() * number) + 1);
  }
  return tempArr;
}

function mergeSort(arr) {
  if (arr.length <= 1) {
    return arr;
  } else {
    const mid = Math.floor(arr.length / 2);
    const leftArr = mergeSort(arr.slice(0, mid));
    const rightArr = mergeSort(arr.slice(mid));

    const result = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < leftArr.length && rightIndex < rightArr.length) {
      if (leftArr[leftIndex] < rightArr[rightIndex]) {
        result.push(leftArr[leftIndex]);
        leftIndex++;
      } else {
        result.push(rightArr[rightIndex]);
        rightIndex++;
      }
    }
    return result
      .concat(leftArr.slice(leftIndex))
      .concat(rightArr.slice(rightIndex));
  }
}
// const randomArr = randomArray(40);
// const sortedRandomArr = mergeSort(randomArr);
// console.log('🚀 ~ randomArr:', randomArr);
// console.log('🚀 ~ sortedRandomArr:', sortedRandomArr);

// const sortedTree = new Tree();
// sortedTree.root = sortedTree.buildTree(
//   sortedRandomArr,
//   0,
//   sortedRandomArr.length - 1
// );

// console.log('🚀 ~ sortedTree.root:', sortedTree.root);
// sortedTree.prettyPrint(sortedTree.root);

// const testArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 12, 13, 15, 17];

const testArray = [1, 2, 3, 4, 5, 6, 7];
const testTree = new Tree();

testTree.root = testTree.buildTree(testArray, 0, testArray.length - 1);

testTree.prettyPrint(testTree.root);
// testTree.insert(34);
// testTree.insert(14);
// console.log('🚀 ~ testTree.min(testTree.root):', testTree.min());

// console.log('🚀 ~ testTree.min(testTree.root):', testTree.max());
testTree.prettyPrint(testTree.root);

console.log('🚀 ~ testTree.find(testTree.root, 3):', testTree.find(5));
// const foundNode = testTree.find(testTree.root, 3);
// console.log(foundNode); // Check the result
