<strong>Let's solve this!</strong>

```js
      1st Tree           2nd Tree           Merged Tree       
          3                 1                    4               
```

As always, we can begin by looking for a brute force solution. The easiest way to start thinking of one is to visualize how a human would do it manually, and run through a few examples to identify potential patterns.

If we think about the manual process, we are beginning at the root for each tree, and then checking to see if there are both left and right values. In this case, there is a 3 in the first tree, and a 1 in the second. Following rule #2, we can sum it up and return a value of 4 for that node.

```js
      1st Tree             2nd Tree           Merged Tree            
          3                   1                    4                
         / \                 / \                  / \        
        1                   3                    4        
```

We then move onto the left child node of the root. Here, a scan between the first and second tree happens again, as we see a 1 on the left, and a 3 on the right. Again, we sum it up and return 4.

We can already see a pattern start to emerge: clearly, some form of traversal needs to be done, and at each step we can check both trees simultaneously.


<strong>Traversal is the key</strong>

```js
function preOrder(node) {
  doSomeOperation()
  preOrder(node.left)
  preOrder(node.right)
}
```

Since we started we'll need to eventually return a merged root, let's go with an pre-order traversal. Pseudocode as follows:

```js
function preOrder(tree1, tree2) {
  if (tree1 == null) {
    return tree2;
  }
  if (tree2 == null) {
    return tree1;
  }
  return tree1.val + tree2.val;

  // Do the above on both of their left children
  preOrder(tree1.left, tree2.left)

  // Do the above on both of their right children
  preOrder(tree1.right, tree2.right)
}
```

Applying this to the problem at hand,  `doSomeOperation()` for us would mean checking the currently investigated node position at both the first and second trees, and deciding what to return.

<strong>But what do we need to get back?</strong>

```js
if (tree1 == null) {
  return tree2;
}
if (tree2 == null) {
  return tree1;
}
tree1.val = tree1.val + tree2.val
return tree1;
```

The above code isn't exactly right though-- we're not returning a sum of the two values after checking for `null` on both, but rather we should be returning a merged node. To save space, if there are values at both nodes, let's just add them onto the first tree and simply return it. The actual operation body would look something like this:

This needs to be done at every recurrence as we traverse through the trees. However, the traversal needs to be done before we return tree1-- the intuition being that we need to adjust the children of each node before we can give it back. In other words, we should write the merge results on the first tree before _presenting_ it back in our method.

```js
function mergeTwoBinaryTrees(tree1, tree2) {
  if (tree1 == null) {
    return tree2;
  }
  if (tree2 == null) {
    return tree1;
  }
  tree1.val += tree2.val

  tree1.left = mergeTwoBinaryTrees(tree1.left, tree2.left);
  tree1.right = mergeTwoBinaryTrees(tree1.right, tree2.right);

  return tree1;
}
```

Here, our time complexity is O(m+n), with *m* and *n* being the number of nodes in each of the binary trees respectively. This makes sense given that we need to traverse through each, but can handle one node per tree at every iteration.


<strong>Tests</strong>

```js
let tree1 = new Node(4);
tree1.left = new Node(3);
tree1.right = new Node(1);

let tree2 = new Node(6);
tree2.left = new Node(3);

const merged = mergeTwoBinaryTrees(tree1, tree2)

console.log(merged.val)   // 10
console.log(merged.left.val)  // 6
console.log(merged.right.val)   // 9
```