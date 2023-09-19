import prettyPrint from "./prettyPrint.js";
import BinaryST from "./binarySearchTree.js";
const newTree = new BinaryST([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
prettyPrint(newTree._root);
newTree.levelOrder(printData);

prettyPrint(newTree._root);
function printData(node) {
  console.log(node.data);
}
