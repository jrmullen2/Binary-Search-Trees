import Node from "./node.js";

export default class BinaryST {
  constructor(array) {
    let sortedArr = mergeSort(array);
    sortedArr = removeDuplicates(sortedArr);
    this._root = buildTree(sortedArr, 0, sortedArr.length - 1);
  }
  insert(value) {
    const newNode = new Node(value);
    let rootNode = this._root;
    if (this._root === null) {
      this._root = newNode;
      return;
    }
    while (rootNode !== newNode) {
      if (value < rootNode.data) {
        if (rootNode.left !== null) {
          rootNode = rootNode.left;
        } else {
          rootNode.left = newNode;
          rootNode = newNode;
        }
      } else {
        if (rootNode.right !== null) {
          rootNode = rootNode.right;
        } else {
          rootNode.right = newNode;
          rootNode = newNode;
        }
      }
    }
    return;
  }
  delete(value) {
    this._root = deleteNode(this._root, value);
  }
  find(value) {
    return findNode(this._root, value);
  }
  levelOrder(func) {
    if (this._root === null) {
      return;
    }
    //Setting up queue
    let queue = [];
    queue.push(this._root);
    while (queue.length !== 0) {
      let currentNode = queue[0];
      func(currentNode);
      //Adding nodes to queue
      if (currentNode.left) {
        queue.push(currentNode.left);
      }
      if (currentNode.right) {
        queue.push(currentNode.right);
      }
      queue.shift();
    }
  }
  preorder(func, root = this._root) {
    if (!root) {
      return;
    }
    func(root);
    this.preorder(func, root.left);
    this.preorder(func, root.right);
  }
  inorder(func, root = this._root) {
    if (!root) {
      return;
    }
    this.inorder(func, root.left);
    func(root);
    this.inorder(func, root.right);
  }
  postorder(func, root = this._root) {
    if (!root) {
      return;
    }
    this.postorder(func, root.left);
    this.postorder(func, root.right);
    func(root);
  }
  height(root = this._root) {
    if (!root) {
      return -1;
    }
    let leftHeight = this.height(root.left);
    let rightHeight = this.height(root.right);
    return leftHeight > rightHeight ? leftHeight + 1 : rightHeight + 1;
  }
  depth(node, root = this._root, currentDepth = 0) {
    node.depth = currentDepth;
    if (node.data < root.data) {
      currentDepth += 1;
      root = this.depth(node, root.left, currentDepth);
    } else if (node.data > root.data) {
      currentDepth += 1;
      root = this.depth(node, root.right, currentDepth);
    }
    return node.depth;
  }
}
function buildTree(arr, start, end) {
  if (start > end) {
    return null;
  }
  let mid = Math.floor((start + end) / 2);
  const node = new Node(arr[mid]);
  node.left = buildTree(arr, start, mid - 1);
  node.right = buildTree(arr, mid + 1, end);
  return node;
}
function mergeSort(arr) {
  if (arr.length < 2) {
    return arr;
  }
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}
function merge(left, right) {
  let sortedArray = [];
  while (left.length && right.length) {
    if (left[0] < right[0]) {
      sortedArray.push(left.shift());
    } else {
      sortedArray.push(right.shift());
    }
  }
  return [...sortedArray, ...left, ...right];
}
function removeDuplicates(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === arr[i + 1]) {
      arr.splice(i, 1);
    }
  }
  return arr;
}
function deleteNode(root, value) {
  //if rootNode is null then we're done
  if (root === null) {
    return root;
  }
  if (value < root.data) {
    root = deleteNode(root.left, value);
    return root;
  } else if (value > root.data) {
    root = deleteNode(root.right, value);
    return root;
  } else {
    //if root has one child or no child
    if (!root.right && !root.left) {
      return null;
    } else if (!root.left) {
      return root.right;
    } else if (!root.right) {
      return root.left;
      //if root has two children
    } else {
      let successorParent = root;
      let successor = root.right;
      //Finding a successor
      while (successor.left != null) {
        successorParent = successor;
        successor = successorParent.left;
      }

      if (successorParent !== root) {
        successorParent.left = successor.right;
      } else {
        successorParent.right = successor.right;
      }

      root.data = successor.data;
      return root;
    }
  }
}
function findNode(root, value) {
  if (root === null) {
    return root;
  }
  if (root.data === value) {
    return root;
  } else if (root.data < value) {
    root = findNode(root.right, value);
    return root;
  } else {
    root = findNode(root.left, value);
    return root;
  }
}
