Let's implement Bucket Fill from MS Paint! You're given the following multi-dimensional array, with each element cell containing a character representing a color from `Red`, `Green`, `Blue`, or 'Yellow'.

```js
const matrix = [
  ['R', 'R', 'G', 'G', 'G'],
  ['G', 'R', 'B', 'G', 'G'],
  ['G', 'B', 'G', 'B', 'G'],
  ['Y', 'G', 'G', 'R', 'G']
];
```

Given the following function signature:

```js
floodBucketFill(
  matrix: Array,
  row: Number,
  column: Number,
  previousColor: String,
  replacementColor: String
)
```

Can you fill in the method to produce the following result? 

```js
floodBucketFill(matrix, 0, 2, 'G', 'Y');

const matrix = [
  ['R', 'R', 'Y', 'Y', 'Y'],
  ['G', 'R', 'B', 'Y', 'Y'],
  ['G', 'B', 'G', 'B', 'Y'],
  ['Y', 'G', 'G', 'R', 'Y']
];
```

_Hint: this is a variant of the Most Connected 1s problem. How did we find the most connections?_