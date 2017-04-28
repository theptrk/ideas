'use strict';
const createTreeNode = (left, value, right) => {
  return { left, value, right };
};

const addTreeNode = (tree, value) => {
  if(tree === null) {
    return createTreeNode(null, value, null);
  }
  if(tree.value > value) {
    return createTreeNode(addTreeNode(tree.left, value), tree.value, tree.right);
  } else {
    return createTreeNode(tree.left, tree.value, addTreeNode(tree.right, value));
  }
};

const treeSize = (tree) => {
  if(tree === null) {
    return 0;
  }
  return 1 + treeSize(tree.left) + treeSize(tree.right);
};

const treeSum = (tree) => {
  if(tree === null) {
    return 0;
  }
  return tree.value + treeSum(tree.left) + treeSum(tree.right);
};

const treeDepth = (tree) => {
  if(tree === null) {
    return 0;
  }
  return 1 + Math.max(treeDepth(tree.left), treeDepth(tree.right));
};

const treeFlatten = (tree) => {
  if(tree === null) {
    return [];
  }
  return treeFlatten(tree.left).concat([tree.value]).concat(treeFlatten(tree.right));
};

const treeFold = (e, fn, tree) => {
  if(tree === null) {
    return e;
  }
  return fn(
    treeFold(tree.left),
    tree.value,
    treeFold(tree.right)
  );
};

const treeSize2 = treeFold.bind(null, 0, (l, x, r) => 1 + l + r);
const treeSum2 = treeFold.bind(null, 0, (l, x, r) => x + l + r);
const treeDepth2 = treeFold.bind(null, 0, (l, x, r) => 1 + Math.max(l, r));
const treeFlatten2 = treeFold.bind(null, [], (l, x, r) => l.concat([x]).concat(r));
