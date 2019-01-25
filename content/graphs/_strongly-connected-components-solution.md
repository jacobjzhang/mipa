Run DFS on the graph to create a list of the vertices in reverse order of their finishing times.

Generate a transpose of the graph, and then make repeated calls to DFS for vertices in the transposed graph.

We're going to need a directed graph for this one. Here's a simple mplementation of one in JS:

```js
class Graph {
  constructor()
  {
      this.adjacencyList = new Map();
      this.verticesCount = 0;
  }

  addVertex(nodeVal) {
    this.adjacencyList.set(nodeVal, []);
    this.verticesCount++;
  }
  
  addEdge(src, dest) {
    this.adjacencyList.get(src).push(dest);
  }

  adjacencyList() {
    return this.adjacencyList;
  }

  verticesCount() {
    return this.verticesCount;
  }

  reverse() {
    const graph = new Graph;
    for (let [src, dests] of this.adjacencyList) {
      graph.addVertex(src);
    }

    for (let [src, dests] of this.adjacencyList) {
      for (let dest of this.adjacencyList.get(src)) {
        graph.adjacencyList.get(src).push(dest);
      }
    }

    return graph;
  }
}
```

Here's the implementation of our described algorithm above:

```js
class StronglyConnectedComponents {
  constructor(graph) {
    const numOfVertices = graph.verticesCount;
    this.count = 0;
    this.sccVisited = [];
    
    for (let vertex = 0; vertex < numOfVertices; vertex++) {
      this.sccVisited.push(false);   // no visits yet
    }
    
    // get the topological ordering of a transposed graph
    let order = this.topologicalSortOrder(graph.reverse());
  
    for (let i = 0; i < order.length; ++i) {
      let vertex = order[i];

      if (!this.sccVisited[vertex]){
        this.dfs(graph, vertex, this.sccVisited, null);
        this.count++;
      }
    }

    return this.count;
  }

  topologicalSortOrder(graph) {
    this.postOrder = [];
    this.tsoVisited = [];
    this.numOfVertices = graph.verticesCount;

    for (let vertex = 0; vertex < this.numOfVertices; vertex++) {
      this.tsoVisited.push(false);
    }
    
    for (let vertex = 0; vertex < this.numOfVertices; vertex++) {
      if (!this.tsoVisited[vertex]) {
        this.dfs(graph, vertex, this.tsoVisited, this.postOrder);
      }
    }

    return this.postOrder.reverse();
    // vertices in reverse order of finish
    // this means that the first finishers are at the end
  }

  dfs(graph, vertex, visited, postOrder) {
    visited[vertex] = true;
    let adjacentVertices = graph.adjacencyList.get(vertex);

    for (let i = 0; i < adjacentVertices.length; ++i){
      let vertex = adjacentVertices[i];

      if (!visited[vertex]){
        this.dfs(graph, vertex, visited, postOrder);
      }
    }

    if (postOrder) {
      postOrder.push(vertex);
    }
  }
}

const scc = new StronglyConnectedComponents(graph);
console.log(scc);
```