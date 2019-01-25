```javascript
class Graph {
  constructor()
  {
      this.adjacencyList = new Map();
      // we can iterate through keys with Map
      // and use objects and functions as keys
  }

  addVertex(nodeVal) {
    this.adjacencyList.set(nodeVal, []);
    // set a key with the node value,
    // and an array to contain neighbors  
  }
  
  addEdge(src, dest) {
    this.adjacencyList.get(src).push(dest);
    this.adjacencyList.get(dest).push(src);
    // push to both adjacency lists   
  }

  removeVertex(val) {
    if (this.adjacencyList.get(val)) {
      this.adjacencyList.delete(val);
    }

    this.adjacencyList.forEach((vertex) => {
      const neighborIdx = vertex.indexOf(val);
      if (neighborIdx >= 0) {
        vertex.splice(neighborIdx, 1);
      }
    })
  }

  removeEdge(src, dest) {
    const srcDestIdx = this.adjacencyList.get(src).indexOf(dest);
    this.adjacencyList.get(src).splice(srcDestIdx, 1);

    const destSrcIdx = this.adjacencyList.get(dest).indexOf(src);
    this.adjacencyList.get(dest).splice(destSrcIdx, 1);
  }

  printNeighbors() {
    for (let vertex of this.adjacencyList.keys()) {
      const neighbors = [];
      
      neighbors.push(`${vertex}: `)
      
      this.adjacencyList.get(vertex).forEach((neighbor) => {
        neighbors.push(neighbor);
      });

      console.log(neighbors.join(" "));
    };
  }
}
```

Here's how we can test that the graph implementation is correct:

```js
var graph = new Graph(7);
var vertices = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
 
// add vertices
for (var i = 0; i < vertices.length; i++) {
    graph.addVertex(vertices[i]);
}
 
// add edges
graph.addEdge('A', 'G');
graph.addEdge('A', 'E');
graph.addEdge('A', 'C');
graph.addEdge('B', 'C');
graph.addEdge('C', 'D');
graph.addEdge('D', 'E');
graph.addEdge('E', 'F');
graph.addEdge('E', 'C');
graph.addEdge('G', 'D');
graph.printNeighbors();

console.log('-----------');
graph.removeVertex('A')     // should remove all references
graph.printNeighbors();

graph.removeEdge('C', 'B')
// should remove from both adjacency lists
console.log('-----------')
graph.printNeighbors();
```