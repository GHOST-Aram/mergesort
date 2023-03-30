import quicksort from './quicksort.js'
export class Node{
    constructor(value){
        this.left = null
        this.value = value
        this.right = null
    }
}
export default class Tree{
    constructor() {
        this.root = null
        this.size = 0
    }

    // Build tree from array: Array should be sorted withoud duplicates
    buildTree (array) {
        //Exit if length is equal to size
        if(this.size === array .length )
            return
        
        //Midpoint
        let mid = Math.floor( array.length / 2)
        //Find mid point and insert mid element
        this.insert(this.root, array[mid])

        //Build left
        this.buildTree(array.slice(0, mid))

        //Build right
        this.buildTree(array.slice(mid, array.length))
    }

    //Contains?
    contains(value){
        //Check if value in parent node
        if(this !== null && this.value === value){
            return true
        }
        //If nt found in parent node and child nodes are null
        else if(this.left === null && this.right === null)
            return false

        else{
            //Recursively check right and left
            this.left.contains(value)
            this.right.contains(value)
        }
    }

    find(value){
        //Check in current node
        if(this.value === value)
            return this
        
        //If not found in both left and right nodes and there are no more nodes
        else if (this.left === null && this.right === null){
            return
        }

        //Keep looking left and right
        else{
            this.left.find(value)
            this.right.find(value)
        }
    }

    //get depth of a node: From the given node to the root
    getDepth(node){

        let depth = 0

        leftNode = node.left
        rightNode = node.right

        while(node.left || node.right){
            depth++
            if(this.value === node.value)
                break
            leftNode = leftNode.left
            rightNode = rightNode.right

        }
        return depth
    }

    //getHeight: the number of edges in the path from a given node to the a leaf node.
    getHeight(node){
        let leftHeight = 0
        let rightHeight = 0

        let leftNode = node.left
        let rightNode = node.right

        while(leftNode || rightNode){

            if(leftNode){
                //Increment heigth
                leftHeight ++

                //Advance left node
                leftNode = leftNode.left 
            }
            
            if(rightNode){
                //Increment heigth
                rightHeight++

                //Advance rigth node
                rightNode = rightNode.right
            }

        }
        return Math.max(leftHeight,rightHeight)
    }

    //Traverse tree inorder
    inorder(callback){
        //Do nothing if tree is empty
        if(this.isEmpty())
            return
        //Look left
        if(this.left !== null){
            return this.left.value
        }
        //look right
        if(this.right.value)
            return this.left.value

        //Push values into array
        const array = [[this.left.inorder(callback)].push(this.root.value)].push(right.inorder(callback))

        if(this.size() == array.length){
            //No callback
            if(callback === undefined)
                return array
            else
                return callback(array)
        }
        
    }
    //Insert
    insert(value){
        //If value is already present in the this, do nothing and return false
        if(this.contains(value))
            return false
            
        //Create new node
        const node = new Node(value)

        
        //tree has no node
        if(this === null){
            this = node
            
            // If tree is epmty
            if(this.isEmpty())
                this.root = node

            //Increment size
            this.size ++
            return true    
        }

        //Check left
        if(this.value < value)
            this.left.insert(value)
        
        else //Insert right
            this.right.insert(value)
    }

    isBalanced(){
        return Math.abs(this.getHeight(this.root.left)  -  this.getHeight(this.root.right)) <= 1
    }
    //Check if tree is empty
    isEmpty(){
        return this.root === null
    }


    levelOrder(callback){
        //Break if tree is empty
        if(this.isEmpty())
            return
        
        //Look left 
        if(this.left === null)
            return this.left.value
            
        //Look right
        if(this.right === null)
            return this.right.value
        
        //Push values into array
        const array = [[this.root.value].push(this.left.levelOrder(callback))].push(this.right.levelOrder(callback))
        
        //Break if all values have been added inot the array
        if(array.left === this.size()){

            //If no fundtion is provided as argument
            if(callback === undefined)
                return array

            //Otherwise Do something with callback
            else 
                return callback(array)  
        }
    }


    // Traverse Postorder
    postorder(callback){
        //Do nothing if tree is empty
        if(this.isEmpty())
            return
        //Look left
        if(this.left !== null){
            return this.left.value
        }
        //look right
        if(this.right.value)
            return this.left.value

        //Push values into array
        const array = [[this.left.inorder(callback)].push(right.inorder(callback))].push(this.root.value)

        if(this.size() == array.length){
            //No callback
            if(callback === undefined)
                return array
            else
                return callback(array)
        }
    }

    //Traverse preoder
    preorder(callback){
        //Do nothing if tree is empty
        if(this.isEmpty())
            return
        //Look left
        if(this.left !== null){
            return this.left.value
        }
        //look right
        if(this.right.value)
            return this.left.value

        //Push values into array
        const array = [[this.root.value].push(this.left.inorder(callback))].push(right.inorder(callback))

        if(this.size() == array.length){
            //No callback
            if(callback === undefined)
                return array
            else
                return callback(array)
        }
    }
    //Pretty print
    prettyPrint(prefix = '', isLeft = true){
        if (this === null) {
            return;
        }
        if (this.right !== null) {
            prettyPrint(this.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
        }
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${this.data}`);
        if (this.left !== null) {
            prettyPrint(this.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
        }
            
    }

    //Rebalance
    rebalance(){
        //Get values
        this.buildTree(quicksort(this.inorder()))
        
    }

    //Remove node
    remove(node){
        if(!this.contains(node.value)){
            return false
        }
        // Obliterate value if its leaf
        if(this.value === node.value){
            node = null
            return true
        }


        
    }
    //Number of nodes in the tree
    size(){
        return this.size
    }
}


