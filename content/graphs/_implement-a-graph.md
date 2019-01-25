Since a `graph` is one of the more difficult data structures to conceptualize in a 2D manner, let's implement it in Javascript! We'll go with an `adjacency list` version.

Here's a skeleton of the implementation. Can you fill the rest in?

```javascript
class Graph {
    constructor(verticesCount)
    {
        this.adjacencyList = {};
    }
 
    addVertex(nodeVal) {
    }
    
    addEdge(src, dest) {
    }

    removeVertex(nodeVal) {
    }
    
    removeEdge(src, dest) {
    }

    printNeighbors() {
      // print each vertex and its neighbors
    }
}
```

<p>Hint: How would adjacency lists work in Javascript?</p>