The most obvious brute force solution would be to check the sum of every possible subset. If it equals zero, we're golden. However, this approach has a time complexity of O( n^2 ).

There's a much faster way. Let's take an example array:

<pre>
<code>[1,2,0,2,-2]</code>
</pre>

Look at the cumulative sums, beginning at 0, up to index 3. And then up to index 5. 

They are both cumulative sums of 3. That means that the total addition to the sum since index 3 was 0. 

Thus we can conclude that the subset from 4 to 5 is 0. (2 + -2 = 0). Following this pattern, we can use the cumulative sums by iterating through the array elements with these rules:

1. If it's equal to 0, it means that the range from 0 to that index sums to zero.

2. If it's equal to a previous currentSum in the hash, that means there was a point in the past where it's since gone unchanged. Unchanged means it'll sum to zero.

3. Otherwise, set currentSum as a key in the hash, with its index as its value.

<pre>
<code>
function findSumZeroSubsets(arr) {
    let hash = {};
    let currSum = 0;

    for (let i = 0; i < arr.length; i++) {
        currSum += arr[i];
 
        if (currSum == 0) {
            console.log(`From 0 to ${i}`);
        }
        if (hash.hasOwnProperty(currSum)) {
            console.log(`From ${hash[currSum]+1} to ${i}`);
        }
        hash[currSum] = i;
    }
}
</code>
</pre>

The time complexity is O(n) as we iterate through each element in the array/set.