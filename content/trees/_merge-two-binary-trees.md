Let's say we're given two binary trees like the ones below:

```
      1st Tree                   2nd Tree                  
          3                         1                             
         / \                       / \                            
        1   4                     3   5                        
       / \                             \                      
      8   3                             7         
```

We are then asked to merge them, one over the other, following these rules:

1. For a specific node, if only one of the trees has a node in that position, the lone node will remain in the merged tree.
2. If both trees have nodes in the same position that are not null, return their sum for that position.

With the above two trees, we should end up with:

```
      Merged Tree  
          4      
         / \      
        4   9    
       / \   \  
      8   3   7
```

Write a method that takes two tree roots and returns the merged tree.

As always, you can view [the solution here](/merge-two-binary-trees.html) when ready.