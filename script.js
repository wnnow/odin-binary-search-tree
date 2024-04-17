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

  //case 1: leaf node(no child). cut the reference of that node
  //case 2: node have 1 child. replace node with their own child
  //case 3: node have 2 child. replace node with the minimum of
  //node right sub tree them remove that minimum node by use case 1 or 2
  delete(value) {
    this.root = this.deleteNode(this.root, value);
  }

  deleteNode(root, value) {
    if (root === null) {
      return root;
    }
    // If the value is less than the root's data, go to the left subtree
    if (value < root.data) {
      root.left = this.deleteNode(root.left, value);
    }
    // If the value is greater than the root's data, go to the right subtree
    else if (value > root.data) {
      root.right = this.deleteNode(root.right, value);
    }
    // If the value matches the root's data, delete this node
    else {
      // Case 1: Node has no children (leaf node)
      if (!root.left && !root.right) {
        return null;
      }
      // Case 2: Node has one child
      if (!root.left) {
        return root.right;
      } else if (!root.right) {
        return root.left;
      }
      // Case 3: Node has two children
      // Find the minimum value in the right subtree
      // Replace the data of the root with the data of the minimum value node
      root.data = this.min(root.right).data;
      // Delete the minimum value node from the right subtree
      root.right = this.deleteNode(root.right, root.data);
    }
    return root;
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

  preOrder(root) {
    if (root === null) return;
    console.log(root.data);
    if (root.left) this.preOrder(root.left);
    if (root.right) this.preOrder(root.right);
  }

  inOrder(root) {
    if (root === null) return;
    if (root.left) this.inOrder(root.left);
    console.log(root.data);
    if (root.right) this.inOrder(root.right);
  }

  postOrder(root) {
    if (root === null) return;
    if (root.left) this.postOrder(root.left);
    if (root.right) this.postOrder(root.right);
    console.log(root.data);
  }

  breadthFirst(root) {
    if (root === null) return;
    const queue = [root];
    while (queue.length) {
      const current = queue.shift();
      console.log(current.data);
      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);
    }
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

// const testArray = [1, 2, 3, 4, 5, 6, 7];
const testArray = [1, 3, 5, 10, 15, 20, 25];
const testTree = new Tree();

testTree.root = testTree.buildTree(testArray, 0, testArray.length - 1);

testTree.prettyPrint(testTree.root);

// testTree.inOrder(testTree.root);
// testTree.postOrder(testTree.root);
// testTree.breadthFirst(testTree.root);
testTree.delete(10);
testTree.prettyPrint(testTree.root);
testTree.preOrder(testTree.root);
// console.log(testTree);
