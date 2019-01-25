You're given the following multi-dimensional array matrix:

```js
const matrix = [
  [1, 1, 0, 0, 0],
  [0, 1, 1, 0, 0],
  [0, 1, 0, 1, 0],
  [1, 0, 0, 0, 0]
];
```

What is the largest concentration of connected 1s in the matrix?

A `1` is considered `connected` to another `1` if it is located 1) above, 2) below, 3) to the left, or 4) to the right of it. 

In the above example, the answer is `5`. Starting from position [0, 0], we see the 1s move to the right and down. Here's another example:

```js
const matrix = [
  [1, 1, 0, 0],
  [0, 0, 1, 0],
  [0, 1, 1, 0],
  [1, 0, 0, 0]
];

const mco = new MostConnectedOnes(matrix);
mco.max();    // 3
```

Write a method that takes a multi-dimensional array of 1s and 0s and returns the area of the largest group of connected 1s.