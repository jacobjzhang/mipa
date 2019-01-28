module.exports = [
  {
    challenge: 1,
    type: 'multiple choice',
    question: 'Which of the following is NOT a property of the Binary Search Tree data structure?',
    options: ['The LEFT subtree of a node contains only nodes with keys LESS than the node’s key.', 'The LEFT subtree of a node contains only nodes with keys GREATER than the node’s key.', 'The RIGHT subtree of a node contains only nodes with keys GREATER than the node’s key.', 'Both the LEFT and RIGHT subtrees must also be binary search trees.'],   
    solution: 1,
    hint: "Hash Table definition:\n\n- Stores data with key value pairs.\n- Hash functions accept a key and return an output unique only to that specific key. This is known as hashing, which is the concept that an input and an output have a one-to-one correspondence to map information.\n- Hash functions return a unique address in memory for that data.\n- Designed to optimize searching, insertion, and deletion.\n- Hash collisions are when a hash function returns the same output for two distinct inputs.\n- Hashes are important for associative arrays and database indexing.",
    category: 'binary trees',
    hintImage: 'https://media.giphy.com/media/irTuv1L1T34TC/giphy.gif'
  },
  {
    challenge: 1,
    type: 'order',
    question: 'A single recursion of Pre-order Traversal for a Binary Search Tree called with function preOrder()',
    options: ['Visit the root.', 'Traverse the left subtree, i.e., call preOrder(left-subtree)', 'Traverse the right subtree, i.e., call preOrder(right-subtree)'],
    solution: [1, 2, 3],
    hint: "Depth First Traversals:\n(a) Inorder (Left, Root, Right)\n(b) Preorder (Root, Left, Right)\n(c) Postorder (Left, Right, Root)",
    category: 'Depth-First Traversal',
    hintImage: 'https://media.giphy.com/media/irTuv1L1T34TC/giphy.gif'
  },  
  {
    challenge: 1,
    type: 'multiple choice',
    question: 'What would be the result of the following recursive function?',
    code: "def func(num):\n    if n == 4:\n       return n\n    else:\n       return 2 * func(n+1);\n\nfunc(2)",
    options: ['4', '3', '16', 'infinity'],
    solution: 2,
    hint: "Depth First Traversals:\n(a) Inorder (Left, Root, Right)\n(b) Preorder (Root, Left, Right)\n(c) Postorder (Left, Right, Root)",
    category: 'Depth-First Traversal',
    hintImage: 'https://media.giphy.com/media/irTuv1L1T34TC/giphy.gif'
  },
  {
    challenge: 1,
    type: 'swipe',
    question: "An instance of a pre-order traversal of a BST returns the sequence 39, 30, 10, 17, 33, 23, 40, 34, 50.\n\nIts post-order traversal is 17, 10, 23, 33, 30, 34, 50, 40, 30.",
    code: "",
    options: null,
    solution: true,
    hint: "",
    category: 'Depth-First Traversal',
    hintImage: 'https://media.giphy.com/media/irTuv1L1T34TC/giphy.gif'
  },
  {
    challenge: 1,
    type: 'fill in',
    question: "The following is working code validating a Binary Search Tree in Python.",
    code: "class Solution:\n  def isValidBST(self, root):\n    output = []\n    self.inOrder(root, output)\n    \n    for i in range(1, len(output)):\n      if output[i-1] >= output[i]:\n        return False\n\n    return True\n\n  def inOrder(self, root, output):\n    if root is None:\n      return\n    ____________________________________\n    output.append(root.val)\n    self.inOrder(root.right, output) ",
    options: null,
    solution: "self.inOrder(root.left, output)",
    hint: "",
    category: 'dfs',
    hintImage: ''
  },
  {
    challenge: 2,
    type: "swipe",
    question: "A string is defined as a palindrome if the reversal of the string is equal to the original string.\n\nFor example, “toot” is a palindrome, but “boot” is not.",
    options: [],
    code: '',
    solution: true,
    hint: "",
    category: "strings",
    hintImage: "",
    questionImage: ""
  },
  {
    challenge: 2,
    type: "order",
    question: "Successfully finding out if a string is a palindrome.",
    options: ["Open a while loop to perform while low is less than high", "Continue until end of loop and return true", "Define two variables: high and low, as 0 and (length of string - 1)", "If string[low] does not equal string[high], return false. Increment low, decrement high"],
    code: '',
    solution: [2, 4, 1, 3],
    hint: "",
    category: "strings",
    hintImage: "",
    questionImage: ""
  },  
  {
    challenge: 2,
    type: "multiple choice",
    question: "What will the following code do to an input string?",
    options: ["Make a copy", "Reverse the string", "Swap the first and last letters", "Infinite loop"],
    code: "def reverse_str(str):\n  start = 0\n  end = len(str)-1\n  str_copy = [letter for letter in str]\n  while start < end:\n    temp = str_copy[start]\n    str_copy[start] = str_copy[end]\n    str_copy[end] = temp\n    start += 1\n    end -= 1\n  return \"\".join(str_copy)",
    solution: 1,
    hint: "",
    category: "strings",
    hintImage: "",
    questionImage: ""
  },
  {
    challenge: 2,
    type: "multiple choice",
    question: "What is the run time of the following code?",
    options: ["O(log n)", "O(n)", "O(n log n)", "O(n^2)"],
    code: "def reverse_str(str):\n  start = 0\n  end = len(str)-1\n  str_copy = [letter for letter in str]\n  while start < end:\n    temp = str_copy[start]\n    str_copy[start] = str_copy[end]\n    str_copy[end] = temp\n    start += 1\n    end -= 1\n  return \"\".join(str_copy)",
    solution: 1,
    hint: "",
    category: "strings",
    hintImage: "",
    questionImage: ""
  },  
  {
    challenge: 3,
    type: 'swipe',
    question: 'A permutation is defined as an arrangement of elements in a set with regards to order of selection.\n\nGiven a string "abc", permutations include "abc", "acb", "bac", "bca", "cba", and "cab".',
    solution: true,
    hint: "",
    category: 'strings',
    questionImage: ''
  },
  {
    challenge: 3,
    type: 'multiple choice',
    question: 'What is the definition of backtracking in programming?',
    options: ['An algorithm for finding solutions to problems by incrementally building candidates and then abandoning'],
    solution: [2, 1, 3],
    hint: "",
    category: 'backtracking',
    hintImage: ''
  },
  {
    challenge: 3,
    type: 'fill in',
    question: "The following is valid code for an inorder traversal.",
    code: "def inorder(node):\n   if node:\n      inorder(node.left)\n      print node.value;\n      _____________",
    solution: "inorder(node.right)",
    hint: "",
    category: 'Depth-First Traversal',
    hintImage: 'https://media.giphy.com/media/irTuv1L1T34TC/giphy.gif'
  },
  {
    challenge: 3,
    type: 'fill in',
    question: 'What missing line would print all permutations of the inputted string?',
    options: [],
    code: "def permutations(str, step = 0):\n    if step == len(str):\n        print(\"\".join(str))\n\n    for i in range(step, len(str)):\n        str_arr = [element for element in str]\n        _______________________________\n        permutations(str_arr, step + 1)",
    solution: "str_arr[step], str_arr[i] = str_arr[i], str_arr[step]",
    hint: "",
    category: "strings",
    hintImage: "",
    questionImage: ""
  },
  {
    challenge: 4,
    type: "fill in",
    question: "What line would get us the max profit for each day?",
    options: [],
    code: "def maxProfit(self, prices):\n    if len(prices)==0: return 0\n    if len(prices) == 1: return 0\n    curMax = prices[len(prices)-1]\n    maxP = 0\n    for i in range(len(prices)):\n        temp = prices[len(prices)-i-1]\n        _____________\n            curMax = temp\n        curProfit = curMax-temp\n        if curProfit > maxP:\n            maxP = curProfit\n    return maxP",
    solution: "if temp > curMax:",
    hint: "",
    category: "",
    hintImage: "",
    questionImage: ""
  },
  {
    challenge: 6,
    type: 'swipe',
    question: 'Recurrence and time complexity for worst case of QuickSort is T(n-1) + O(n) and O(n^2) respectively.',
    solution: true,
    hint: "The worst case of QuickSort occurs when the picked pivot is always one of the corner elements in sorted array. In worst case, QuickSort recursively calls one subproblem with size 0 and other subproblem with size (n-1). So recurrence is T(n) = T(n-1) + T(0) + O(n) The above expression can be rewritten as T(n) = T(n-1) + O(n).",
    category: 'Sorting',
    questionImage: ''
  },
  {
    challenge: 6,
    type: 'order',
    question: 'What is the order of steps in Quick Sort?',
    options: ['Then, apply the quicksort algorithm to the first and the third part. (recursively)', 'Pick a pivot element.', 'Partition the array into 3 parts: all elements in this part is less than the pivot, the pivot, and all elements greater.'],
    solution: [3, 1, 2],
    hint: "",
    category: 'Depth-First Traversal',
    hintImage: 'https://media.giphy.com/media/irTuv1L1T34TC/giphy.gif'
  },
  {
    challenge: 6,
    type: 'multiple choice',
    question: 'Which of the following one of these is the missing step to this algorithm:"\n\n(1) Create a low pointer at the beginning of the array and a high pointer at the end of the array.\n(2) Create a mid pointer that starts at the beginning of the array and iterates through each element.\n(3) _______________\n(4) If the element at arr[mid] is a 0, then swap arr[mid] and arr[low] and increase the low and mid pointers by 1.\n(5) If the element at arr[mid] is a 1, don\'t swap anything and just increase the mid pointer by 1.\n"',
    options: ['If the element at arr[mid] is a 2, then swap arr[mid] and arr[high] and decrease the high pointer by 1.', 'If the element at arr[mid] is a 1, then swap arr[mid] and arr[low] and decrease the low pointer by 1.', 'If the element at arr[low] is a 2, then swap arr[low] and arr[high] and increase the high pointer by 1.'],   
    solution: 'If the element at arr[mid] is a 2, then swap arr[mid] and arr[high] and decrease the high pointer by 1.',
    hint: "Hash Table definition:\n\n- Stores data with key value pairs.\n- Hash functions accept a key and return an output unique only to that specific key. This is known as hashing, which is the concept that an input and an output have a one-to-one correspondence to map information.\n- Hash functions return a unique address in memory for that data.\n- Designed to optimize searching, insertion, and deletion.\n- Hash collisions are when a hash function returns the same output for two distinct inputs.\n- Hashes are important for associative arrays and database indexing.",
    category: 'Sorting',
    hintImage: 'https://media.giphy.com/media/irTuv1L1T34TC/giphy.gif'
  },
  {
    challenge: 0,
    type: "",
    question: "",
    options: [],
    code: "",
    solution: "",
    hint: "",
    category: "",
    hintImage: "",
    questionImage: ""
  }
];