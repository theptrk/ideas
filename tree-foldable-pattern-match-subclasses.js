// say we have these Tree subclasses
class Tree {}
class TreeEmpty extends Tree {}
class TreeNode extends Tree {
  constructor(value) {
    super();
    this.value = value;
    this.left = new TreeEmpty();
    this.right = new TreeEmpty();
  }
}

// get the size of the tree
const treeSize = (tree) {
  // closest we can get to pattern matching syntax in javascript
  switch(tree.constructor) {
    case TreeEmpty:
      return 0;
    case TreeNode:
      return 1 + treeSize(tree.left) + treeSize(tree.right);
    default:
      return;
  }
}

// sum the values of the nodes
const treeSum = (tree) => {
  switch(tree.constructor) {
    case TreeEmpty:
      return 0;
    case TreeNode:
      return tree.value + treeSum(tree.left) + treeSum(tree.right);
    default:
      return;
  }
};

// count the depth of the branches
const treeDepth = (tree) => {
  switch(tree.constructor) {
    case TreeEmpty:
      return 0;
    case TreeNode:
      return 1 + Math.max(treeDepth(tree.left), treeDepth(tree.right));
    default:
      return;
  }
};

// flatten the tree
const treeFlatten = (tree) => {
  switch(tree.constructor) {
    case TreeEmpty:
      return [];
    case TreeNode:
      return treeFlatten(tree.left).concat([tree.value]).concat(treeFlatten(tree.right));
    default:
      return;
  }
};

// Notice the similiarities of all of these "fold" type functions
// const someFoldTypeFunction = (tree) => {
//   switch(tree.constructor) {
//     case TreeEmpty:
//       // returns some "empty" value that will act as a do nothing value
//       // for treeSize, treeSum, treeDepth we are summing a number so "empty" is 0
//       // for treeFlatten, we are concatting arrays so "empty" is []
//
//       // our folding function will need the empty value
//       // 1. empty
//
//    case TreeNode:
//       // return anything that calls someFoldTypeFunction as we build
//       // a data structure as we fold down the tree onto an empty value
//       // importantly: we must be able to handle the empty value
//
//       // our folding function will need to be passed in for the recursion
//       // 2. folding function
//       //
//       // the actual current processed tree needs to the passed in
//       // 3. tree
//
//       // Lets pass in the necessary data for any folding/reducing function
//       //   a. tree.left
//       //   b. tree.value
//       //   c. tree.right
//
//    default:
//      // this should actually never happen
//   }
// }

// e: empty value
// fn: receives left node, value, right node
// tree: current working node
const treeFold = (e, fn, tree) => {
  switch(tree.constructor) {
    case TreeEmpty:
      return e;
    case TreeNode:
      return fn(
        treeFold(e, fn, tree.left),
        tree.value,
        treeFold(e, fn, tree.right)
      );
    default:
      return;
  }
};

const treeSize2 = treeFold.bind(null, 0, (l, x, r) => 1 + l + r);
const treeSum2 = treeFold.bind(null, 0, (l, x, r) => x + l + r);
const treeDepth2 = treeFold.bind(null, 0, (l, x, r) => 1 + Math.max(l, r));
const treeFlatten2 = treeFold.bind(null, [], (l, x, r) => l.concat([x]).concat(r));
