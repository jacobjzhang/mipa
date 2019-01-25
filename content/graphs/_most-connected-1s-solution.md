```js
class MostConnectedOnes {
  constructor(matrix) {
    this.matrix = matrix;
    this.seen = [];
  }

  // method to determine area
  area(row, col) {
    // if it's not within the graph, seen, or not a 1, don't count it
    if (row < 0 || row >= this.matrix.length ||
      col < 0 || col >= this.matrix[0].length ||
      this.seen[row][col] || this.matrix[row][col] == 0) {
        return 0;
      }

    this.seen[row][col] = true;   // mark as seen so we don't revisit

    // return 1 for itself, added with the calculations of
    // the cells to the 4 directions around it
    return (
      1 + this.area(row+1, col) + this.area(row-1, col)
        + this.area(row, col-1) + this.area(row, col+1)
    );
  }

  // main interface
  max() {
    // initializing a boolean matrix of all falses
    for (let i = 0; i < matrix.length; i++) {
      this.seen.push([]);

      for (let j = 0; j < matrix[i].length; j++) {
        this.seen[i].push(false);
      };
    };

    // looping through each "cell" and storing the greater of
    // the current max and the newly calculated area
    let result = 0;
    for (let row = 0; row < this.matrix.length; row++) {
      for (let col = 0; col < this.matrix[0].length; col++) {
          result = Math.max(result, this.area(row, col));
      }
    }
    return result;
  };
};
```

Let's make sure we test this:

```js
const matrix = [
  [1, 1, 0, 0, 0],
  [0, 1, 1, 0, 0],
  [0, 1, 0, 1, 0],
  [1, 0, 0, 0, 0]
];

const mco = new MostConnectedOnes(matrix);
mco.max();

const matrix2 = [
  [1, 1, 0, 0],
  [0, 0, 1, 0],
  [0, 1, 1, 0],
  [1, 0, 0, 0]
];

const mco2 = new MostConnectedOnes(matrix2);
mco2.max();
```

Time and space complexity is O(m*n) (or rows * columns) since we visit all the nodes.