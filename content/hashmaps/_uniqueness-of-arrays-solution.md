Uniqueness of Arrays is a pretty straightforward problem when thought through with a hashmap in mind. The main thing is to use a hashmap to keep track of visited numbers, and only push numbers into a `unique` array on their first appearance.

<pre>
<code>
function uniques(array) {
  let hash = {};
  let uniques = [];

  for(let i = 0; i < array.length; i++) {
    if(!hash.hasOwnProperty(array[i])) {    // skip if already in hash
      hash[array[i]] = 1;   // set it to 1 because 0 is falsey
      uniques.push(array[i]);
    }
  }

  return uniques;
}
</code>
</pre>

Runtime is O(n) because we have to iterate through each element. Space complexity is constant O(1).