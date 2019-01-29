module.exports = [
  {
    id: 1,
    title: 'Validate a BST',
    category: 'Binary Search Trees',
    difficulty: 4,
    parentCategory: 'trees',
    solution: "class Solution:\n  def isValidBST(self, root):\n    output = []\n    self.inOrder(root, output)\n    \n    for i in range(1, len(output)):\n      if output[i-1] >= output[i]:\n        return False\n\n    return True\n\n  def inOrder(self, root, output):\n    if root is None:\n      return\n    self.inOrder(node.left, output)\n    output.append(root.val)\n    self.inOrder(root.right, output) ",
  },
  {
    id: 2,
    title: 'Reverse a String in Place',
    category: 'Strings',
    difficulty: 2,
    parentCategory: 'strings'
  },  
  {
    id: 3,
    title: 'Generate All String Permutations',
    category: 'Strings',
    difficulty: 6,
    parentCategory: 'strings'
  },
  {
    id: 4,
    title: 'Stock Buy and Sell Optimization',
    category: 'Arrays',
    difficulty: 5,
    parentCategory: 'arrays'
  },  
  {
    id: 5,
    title: 'Contiguous Subarray Sum',
    category: 'Subarrays',
    difficulty: 1,
    parentCategory: 'arrays'
  },
  {
    id: 7,
    title: 'Two Sum from BST',
    category: 'Binary Search Trees',
    difficulty: 1,
    parentCategory: 'trees'
  },
  {
    id: 6,
    title: 'Flood Fill/Paintbucket',
    category: 'Graph Traversal',
    difficulty: 7,
    parentCategory: 'graphs'
  },
  {
    id: 5,
    title: 'Lowest Common Ancestor',
    category: 'Binary Search Trees',
    difficulty: 5,
    parentCategory: 'trees'
  },
  {
    id: 6,
    title: 'Dutch national flag sorting problem',
    category: 'Sorting',
    difficulty: 8,
    parentCategory: 'arrays'
  }
];
