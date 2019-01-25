The graph data structure can be represented in two common ways: 1) `an adjacency matrix`, or 2) an `adjacency list`. The matrix is typically used for denser graphs with larger-scale numbers of vertices. The intuition there is that the matrix already has a representation of specific edges between two vertices in memory.

However, an adjacency list makes sense when vertices are more scarce, since they require less space. On the other hand, searching takes longer as you'll need to identify and look through the proper list.

For the purposes of this week's exercises, we'll work with an `adjacency list` implentation of the graph. As always, have fun and take it slow. Let's get started!