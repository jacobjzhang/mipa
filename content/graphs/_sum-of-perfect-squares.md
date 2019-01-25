A perfect square is a number made by squaring a whole number (ex: 1, 4, 9, 16, ...). Given some positive integer _n_, write a method to return the fewest number of perfect square numbers which sum to n.

**Examples**

```js
n = 28
howManySquares(n);
=> 4
// 16 + 4 + 4 + 4 = 28, so 4 numbers are required
```

```js
n = 16
howManySquares(n);
=> 1
// 16 itself is a perfect square
// so only 1 perfect square is required
```

_Hint: How can we turn this into a shortest path problem? How might we construct a graph to help us work backwards from a sum to perfect squares?_