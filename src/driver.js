import BinaryST from "./binarySearchTree.js";
import prettyPrint from "./prettyPrint.js";
export default function test() {
  const tree = new BinaryST(generateArray());
  prettyPrint(tree._root);
  console.log("Balanced: " + tree.isBalanced());
  console.log("Level Order:");
  tree.levelOrder(printData);
  console.log("Preorder:");
  tree.preorder(printData);
  console.log("Inorder:");
  tree.inorder(printData);
  console.log("Postorder:");
  tree.postorder(printData);
  console.log("Inserted 540");
  console.log("Inserted 541");
  tree.insert(540);
  tree.insert(541);
  prettyPrint(tree._root);
  console.log("Balanced: " + tree.isBalanced());
  console.log("Rebalancing");
  tree.rebalance();
  prettyPrint(tree._root);
  console.log("Balanced: " + tree.isBalanced());
  console.log("Level Order:");
  tree.levelOrder(printData);
  console.log("Preorder:");
  tree.preorder(printData);
  console.log("Inorder:");
  tree.inorder(printData);
  console.log("Postorder:");
  tree.postorder(printData);
  function generateArray() {
    const array = [];
    while (array.length <= 15) {
      array.push(Math.round(Math.random() * 100));
    }
    return array;
  }
  function printData(node) {
    console.log(node.data);
  }
}
