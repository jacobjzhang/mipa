Can you implement Java's Hashmap class in Javascript? Only two methods are necessary-- `get` and `set`.

`get` should be given a key and return the value for that key. `set` should take a key and a value as parameters, and store the pair.

<pre>
<code>
let dict = new HashMap
dict.set('james', '123-456-7890')      // undefined
dict.set('jess', '213-559-6840')       // undefined
dict.get('james')                      // 123-456-7890
dict.get('jake')                       // undefined
</code>
</pre>

You are free to use Arrays, but may not use Objects ({}) or Maps.

We've supplied the below hashing function `hashStr`. It tries to avoid collision, but is not perfect. It takes a String value and returns an Integer.

<pre>
<code>
function hashStr(str) {
    let finalHash = 0;
    for (let i = 0; i < str.length; i++) {
        const charCode = str.charCodeAt(i);
        finalHash += charCode;
    }
    return finalHash;
}
</code>
</pre>

<p>Hint: How could we use Arrays to address collisions?</p>