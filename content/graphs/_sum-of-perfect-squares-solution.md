```js
function howManySquares(n) {
  // limit our number of perfect squares to just the ones that
  // are less than our n, since larger ones wouldn't make sense
  let perfectSqNumsLength = 1;
  while (perfectSqNumsLength * perfectSqNumsLength < n) {
    perfectSqNumsLength++;
  }
  
  if (perfectSqNumsLength * perfectSqNumsLength > n) {
    perfectSqNumsLength--;
  }
  
  const perfectSqNums = [];
  
  // Fill the array backwards so we get the numbers to work wtih
  for (let i = perfectSqNumsLength - 1; i >= 0; i--) {
    perfectSqNums[perfectSqNumsLength - i - 1] = (i+1) * (i+1);
  }
  
  // instantiate a hashmap of possible paths
  const paths = {};
  paths[1] = 1; // 1 = 1
  paths[0] = 0; // 0 means you need 0 number to get 0
  
  return numSquares(paths, perfectSqNums, n);
}
  
function numSquares(paths, perfectSqNums, n) {
  if (paths.hasOwnProperty(n)) {
    // we already knew the paths to add up to n.
    return paths[n];
  };

  let min = Number.MAX_SAFE_INTEGER;
  let thisPath = 0;

  for(let i = 0; i < perfectSqNums.length; i++) {
    if (n - perfectSqNums[i] >= 0) {
      const difference = n - perfectSqNums[i];
      // here's the key - recursively solve for the next perfect square
      // that could sum to n by traversing a graph of possible perfect square sums
      thisPath = numSquares(paths, perfectSqNums, difference);

      // compare the number of nodes required in this path
      // to the current minimum
      min = Math.min(min, thisPath);
    }
  }
  
  min++;  // increment the number of nodes seen
  paths[n] = min; // set the difference for this number to be the min so far

  return min;
}

howManySquares(12);
=> 4

howManySquares(1);
=> 1
```