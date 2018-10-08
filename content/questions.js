const questions = [
  {
    type: 'swipe',
    question: 'The worst case time complexity for search, insert and delete operations in a general Binary Search Tree is O(n).',
    solution: true,
    hint: "Binary search tree (BST):\nA binary tree that uses comparable keys to assign which direction a child is.\n\n- Left child has a key smaller than it's parent node.\n- Right child has a key greater than it's parent node.\n- There can be no duplicate node.\n- Because of the above it is more likely to be used as a data structure than a binary tree.\n\nAverage case Big-O:\nIndexing: O(log n)\nSearch: O(log n)\nInsertion O(log n)",
    category: 'Binary Search Trees',
    questionImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Binary_tree.svg/192px-Binary_tree.svg.png'
  },
  {
    type: 'order',
    question: 'In-order Traversal for a Binary Search Tree:',
    options: ['Visit the root.', 'Traverse the left subtree, i.e., call Inorder(left-subtree) ', 'Traverse the right subtree, i.e., call Inorder(right-subtree)'],
    solution: ['1. Traverse the left subtree, i.e., call Inorder(left-subtree) ', '2. Visit the root.', '3. Traverse the right subtree, i.e., call Inorder(right-subtree)'],
    hint: "Depth First Traversals:\n(a) Inorder (Left, Root, Right)\n(b) Preorder (Root, Left, Right)\n(c) Postorder (Left, Right, Root)",
    category: 'Depth-First Traversal',
    hintImage: 'https://media.giphy.com/media/irTuv1L1T34TC/giphy.gif'
  },
  {
    type: 'fill in',
    question: "The following is valid code for an inorder traversal in Javascript:\n\nfunction inorder(node){\n   if(node){\n      inorder(node.left);\n      console.log(node.value);\n      _______________\n   }\n}",
    solution: false,
    hint: "The following is valid code for an inorder traversal in Javascript:\n\nfunction inorder(node){\n   if(node){\n      inorder(node.left);\n      console.log(node.value);\n      inorder(node.right);\n   }\n}",
    category: 'Depth-First Traversal',
    hintImage: 'https://media.giphy.com/media/irTuv1L1T34TC/giphy.gif'
  },
  {
    type: 'multiple choice',
    question: 'Which of the following is not an advantage of a hash map data structure?',
    options: ['Being able to lookup data on the order of O(1) independent of the size of the data structure.', 'Being able to insert data on the order of O(1) independent of the size of the data structure.', 'Finding the maximum and minimum keys in O(1).', 'If the set of key-value pairs is fixed and known ahead of time, one may reduce the average lookup cost by a careful choice of the hash function, bucket table size, and internal data structures such that keys need not be stored in the table.'],   
    solution: 'Finding the maximum and minimum keys in O(1).',
    hint: "Hash Table definition:\n\n- Stores data with key value pairs.\n- Hash functions accept a key and return an output unique only to that specific key. This is known as hashing, which is the concept that an input and an output have a one-to-one correspondence to map information.\n- Hash functions return a unique address in memory for that data.\n- Designed to optimize searching, insertion, and deletion.\n- Hash collisions are when a hash function returns the same output for two distinct inputs.\n- Hashes are important for associative arrays and database indexing.",
    category: 'Hash Tables',
    hintImage: 'https://media.giphy.com/media/irTuv1L1T34TC/giphy.gif'
  },
  {
    type: 'swipe',
    question: 'How would you find all the pairs of two integers in an unsorted array that sum up to a given S?\n\nFor example, if the array is [3, 5, 2, -4, 8, 11] and the sum is 7, your program should return [[11, -4], [2, 5]] because 11 + -4 = 7 and 2 + 5 = 7.\n\nAs we pass through each element in the array, we check to see if S minus the current element exists in the hash table. We only need to loop through the array once, resulting in a running time of O(n) since each lookup and insertion in a hash table is O(1).',
    solution: true,
    hint: "function twoSum(arr, S) {\n\n  var sums = [];\n  var hashTable = {};\n  for (var i = 0; i < arr.length; i++) {\n    var difference = S - arr[i];\n    if (hashTable.hasOwnProperty(difference)) { \n      sums.push([arr[i], difference]);\n    }\n    hashTable[arr[i].toString()] = arr[i];\n\n  }\n  return sums;\n\n}",
    category: 'Two Sum',
    hintImage: 'https://media.giphy.com/media/irTuv1L1T34TC/giphy.gif'
  },
]

const cards2 = [
  {question: '10', image: 'https://media.giphy.com/media/12b3E4U9aSndxC/giphy.gif'},
  {question: '11', image: 'https://media4.giphy.com/media/6csVEPEmHWhWg/200.gif'},
  {question: '12', image: 'https://media4.giphy.com/media/AA69fOAMCPa4o/200.gif'},
  {question: '13', image: 'https://media.giphy.com/media/OVHFny0I7njuU/giphy.gif'},
]

export default questions;