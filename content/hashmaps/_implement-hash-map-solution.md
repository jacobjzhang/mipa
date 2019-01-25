We need to implement a `Hashmap` class with just two methods: `get` and `set`. Before diving into those functions, we should think through how we'll store the values. Let's use an Array to act as a data store.

```js
class Hashmap {
  constructor() {
    this._storage = [];
    this._count = 0;    // for later
  }
}
```

Now, recall that we were given the following `hashStr` method that we'll use to get indexes in `this._storage`.

```js
function hashStr(str) {
    let finalHash = 0;
    for (let i = 0; i < str.length; i++) {
        const charCode = str.charCodeAt(i);
        finalHash += charCode;
    }
    return finalHash;
}
```

We'll feed `hashStr` the key and string values we want to store, and use `this._storage` to hold these values. Then, we can proceed to a very simple implementation of the `get` and `set` methods.

```js
class Hashmap {
  constructor() {
    this._storage = [];
    this._count = 0;    // for later
  }

  hashStr(str) {
    let finalHash = 0;
    for (let i = 0; i < str.length; i++) {
        const charCode = str.charCodeAt(i);
        finalHash += charCode;
    }
    return finalHash;
  }

  set(key, val) {
    let idx = this.hashStr(key);

    if (!this._storage[idx]) {
      this._storage[idx] = [];
    }

    this._storage[idx].push([key, val]);
  }

  get(key) {
    let idx = this.hashStr(key);

    if (!this._storage[idx]) {
      return undefined;
    };

    for (let keyVal of this._storage[idx]) {
      if (keyVal[0] === key) {
        return keyVal[1];
      }
    };
  }
}
```

Both `get` and `set` should have a time complexity of O(1), but with the Javascript implementation, may be closer to O(n).

```js
const hashmap = new Hashmap
hashmap.set('aadvark', 'this is an animal');
hashmap.set('aaron', 'this is a singer');
console.log(hashmap.get('aaron'));     // 'this is a singer'
console.log(hashmap.get('joe'))
```