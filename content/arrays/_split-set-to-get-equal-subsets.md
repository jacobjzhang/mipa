## Original problem

{% highlight javascript %}
const newSet = [5, 7, 19, 7]

hasEqualSubsets(newSet);
// returns true
// newSet can be divided into [5, 7, 7] and [19]
{% endhighlight %}

And another example:

{% highlight javascript %}
const newSet = [9, 3, 1]

hasEqualSubsets(newSet);
// returns false
// newSet cannot be divided into equal subsets
{% endhighlight %}

We're given a set in the form of an array with a bunch of integers. Can you write a function that tells us whether it can be separated into two subsets whose elements have equal sums?

Here's an example.

---
## Let's solve this!

```
[5] === [7, 7, 19]   // false because 5 !== 33
```

```
[5, 7] === [7, 19]   // false because 12 !== 26
```

And then try:

```
[5, 7, 7] === [19]   // true because 19 === 19
```

As always, we can begin by looking for a brute force solution. The easiest way to start thinking of one is to visualize how a human would do it manually, and run through a few examples to identify potential patterns.

If we think about the manual process, a good portion of the mental checking might be comparing smaller subsets against each other and seeing if they worked. For example, we might start with one number and compare it against the sum of of the others. If it's too small, we'll keeep adding until we get a sense of these numbers' relation to each other.

{% highlight javascript %}
const totalSum = [5, 7, 19, 7].reduce((x, y) => { return x+y })   // 38
totalSum/2    // 19
{% endhighlight %}

However, do it a few times, and two things might jump out rather quickly:

1. We are dividing the set in half, meaning by 2. This means that if the total sum is an odd number, we certainly cannot get even sums.

2. If they are equal halves, then we can get one subset's total by taking the sum of all elements in the set and dividing it by 2.


```
      1st Tree                   2nd Tree           Merged Tree            
          3                         1                    4                
         / \                       / \                  / \        
        1                         3                    4        
```

Wait a second-- we have 19 in the set. So knowing point 2, one thing we may try is to get what one subset's sum should be, and see if we can find a subset that equals it.

This narrows down our problem into a subset search problem.

We can use recursion to test all the subsets available. 

So what we can do.


We can already see a pattern start to emerge: clearly, some form of traversal needs to be done, and at each step we can check both trees simultaneously.


## Traversal is the key

Since we started we'll need to eventually return a merged root, let's go with an pre-order traversal. Pseudocode as follows:

{% highlight javascript %}
function preOrder(node) {
  doSomeOperation()
  preOrder(node.left)
  preOrder(node.right)
}
{% endhighlight %}

Applying this to the problem at hand,  `doSomeOperation()` for us would mean checking the currently investigated node position at both the first and second trees, and deciding what to return.

{% highlight javascript %}
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
{% endhighlight %}


## But what do we need to get back?

The above code isn't exactly right though-- we're not returning a sum of the two values after checking for `null` on both, but rather we should be returning a merged node. To save space, if there are values at both nodes, let's just add them onto the first tree and simply return it. The actual operation body would look something like this:

{% highlight javascript %}
if (tree1 == null) {
  return tree2;
}
if (tree2 == null) {
  return tree1;
}
tree1.val = tree1.val + tree2.val
return tree1;
{% endhighlight %}

This needs to be done at every recurrence as we traverse through the trees. However, the traversal needs to be done before we return tree1-- the intuition being that we need to adjust the children of each node before we can give it back. In other words, we should write the merge results on the first tree and before "presenting" it back in our method.

{% highlight javascript %}
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
{% endhighlight %}

Here, our time complexity is O(m+n), with *m* and *n* being the number of nodes in each of the binary trees respectively. This makes sense given that we need to traverse through each, but can handle one node per tree at every iteration.


## Tests

{% highlight javascript %}
let tree1 = new Node(4);
tree1.left = new Node(3);
tree1.right = new Node(1);

let tree2 = new Node(6);
tree2.left = new Node(3);

const merged = mergeTwoBinaryTrees(tree1, tree2)

console.log(merged.val)   // 10
console.log(merged.left.val)  // 6
console.log(merged.right.val)   // 9
{% endhighlight %}