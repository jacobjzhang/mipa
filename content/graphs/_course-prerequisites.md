You're a university student currently trying to plan their schedule for the following semester. There are _n_ number of courses that you'll need to take to stay on track.

However, of the _n_ courses, several have prerequisite courses that you'll need to take beforehand. A prerequisite pair such as `[4, 3]` means that you need to take course 3 before course 4.

```js
let n = 3;
let preReqs = [[1, 0], [2, 1]]

// true
// You need to take course 0 before 1, and 1 before 2, 
// but that is an appropriate order.
```

However, sometimes the prerequisite pairings are not possible-- this may prevent you from staying on track! As an example, if we add an additional prerequisite requirement that you need to finish 2 before 0:

```js
let n = 3;
let preReqs = [[1, 0], [2, 1], [0, 2]]

// false
// This is impossible because you can't finish 2 before 0,
// since you need to finish 1 before 2, and 0 before 1.
```

Given _n_ and a list of prerequisite pairs, would it be possible for you to take all the courses?

_Hint: what are the conditions under which a prerequisite setup is impossible?_