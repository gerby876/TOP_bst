class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }

  insert = function (value) {
    if (value == this.data) {
      return;
    }
    if (value > this.data) {
      if (this.right == null) {
        this.right = new Node(value);
        return;
      }
      this.right.insert(value);
      return;
    }
    if (value < this.data) {
      if (this.left == null) {
        this.left = new Node(value);
        return;
      }
      this.left.insert(value);
      return;
    }
  };

  remove = function (value) {
    if (this.left !== null && this.left.data == value) {
      if (this.left.left == null && this.left.right == null) {
        this.left = null;
        return;
      }
      if (this.left.left == null || this.left.right == null) {
        if (this.left.left !== null) {
          this.left = this.left.left;
          return;
        } else {
          this.left = this.left.right;
          return;
        }
      }
      if (this.left.left !== null && this.left.right !== null) {
        let parent = this.left;
        let tmp = this.left.right;
        while (tmp.left !== null) {
          parent = tmp;
          tmp = tmp.left;
        }
        this.left.data = tmp.data;
        parent.remove(tmp.data);

        return;
      }
    }
    if (this.right !== null && this.right.data == value) {
      if (this.right.left == null && this.right.right == null) {
        this.right = null;
        return;
      }
      if (this.right.left == null || this.right.right == null) {
        if (this.right.left !== null) {
          this.right = this.right.left;
          return;
        } else {
          this.right = this.right.right;
          return;
        }
      }
      if (this.right.left !== null && this.right.right !== null) {
        let parent = this.right;
        let tmp = this.right.right;
        while (tmp.left !== null) {
          parent = tmp;
          tmp = tmp.left;
        }
        this.right.data = tmp.data;
        parent.remove(tmp.data);
        return;
      }
    }
    if (value > this.data) {
      if (this.right == null) {
        return console.log(`${value} not found.`);
      }
      this.right.remove(value);
      return;
    }
    if (value < this.data) {
      if (this.left == null) {
        return console.log(`${value} not found.`);
      }
      this.left.remove(value);
      return;
    }
    if (value == this.data) {
      let tmp = this.right;
      while (tmp.left !== null) {
        tmp = tmp.left;
      }
      this.remove(tmp.data);
      this.data = tmp.data;
      return;
    }
  };

  find = function (value) {
    if (value == this.data) {
      return this;
    }
    if (value < this.data) {
      if (this.left == null) {
        return console.log(`${value} not found.`);
      }
      return this.left.find(value);
    }
    if (value > this.data) {
      if (this.right == null) {
        return console.log(`${value} not found.`);
      }
      return this.right.find(value);
    }
  };

  levelOrder = function (callback) {
    if (callback == undefined || callback == null) {
      return alert("Please provide a callback");
    }
    let queue = [];
    queue.push(this);
    while (queue.length > 0) {
      callback(queue[0]);
      if (queue[0].left !== null) {
        queue.push(queue[0].left);
      }
      if (queue[0].right !== null) {
        queue.push(queue[0].right);
      }
      queue.shift();
    }
  };

  preOrder = function (callback) {
    if (callback == undefined || callback == null) {
      return alert("Please provide a callback");
    }
    callback(this);
    if (this.left !== null) {
      this.left.preOrder(callback);
    }
    if (this.right !== null) {
      this.right.preOrder(callback);
    }
  };

  inOrder = function (callback) {
    if (callback == undefined || callback == null) {
      return alert("Please provide a callback");
    }
    if (this.left !== null) {
      this.left.inOrder(callback);
    }
    callback(this);
    if (this.right !== null) {
      this.right.inOrder(callback);
    }
  };

  postOrder = function (callback) {
    if (callback == undefined || callback == null) {
      return alert("Please provide a callback");
    }
    if (this.left !== null) {
      this.left.postOrder(callback);
    }
    if (this.right !== null) {
      this.right.postOrder(callback);
    }
    callback(this);
  };

  height = function (value, x, y) {
    let tmp;
    if (typeof value === "number") {
      tmp = this.find(value);
      if (tmp == undefined) {
        return null;
      }
    } else {
      tmp = value;
    }

    if (tmp.left == null && tmp.right == null) {
      return 1;
    }
    if (tmp.left !== null || tmp.right !== null) {
      if (tmp.left !== null) {
        x = tmp.left.height(tmp.left.data) + 1;
      } else if (x == undefined) {
        x = 0;
      }
      if (tmp.right !== null) {
        y = tmp.right.height(tmp.right.data) + 1;
      } else if (y == undefined) {
        y = 0;
      }
      if (y > x) {
        return y;
      } else {
        return x;
      }
    }
  };

  depth = function (value) {
    if (value == this.data) {
      return 0;
    }
    if (value < this.data) {
      let x = 1 + this.left.depth(value);
      return x;
    }
    if (value > this.data) {
      let x = 1 + this.right.depth(value);
      return x;
    }
    return null;
  };

  isBalanced = function (tmpheight) {
    let x;
    let y;
    if (tmpheight == undefined) {
      tmpheight = this.height(this.data);
    }
    let balance;
    if (this.left !== null && this.right !== null) {
      x = this.right.height(this.right);
      y = this.left.height(this.left);
      if (x - y > 1 || y - x > 1) {
        console.log("Unbalanced");
        return false;
      } else {
        this.left.isBalanced(tmpheight);
        if (this.left.isBalanced(tmpheight) == false) {
          return console.log("Unbalanced");
        } else {
          this.right.isBalanced(tmpheight);
          if (this.right.isBalanced(tmpheight) == false) {
            return console.log("Unbalanced");
          }
          balance = true;
        }
      }
    }
    if (this.left == null || this.right == null) {
      if (this.left !== null) {
        y = this.left.height(this.left);
        x = 0;
      }
      if (this.right !== null) {
        x = this.right.height(this.right);
        y = 0;
      }
      if (x - y > 1 || y - x > 1) {
        return (balance = false);
      } else {
        return (balance = true);
      }
    }

    if (this.height(this.data) == tmpheight && balance == true) {
      console.log("Balanced");
    }
  };

  rebalance = function () {
    let array = [];
    let queue = [];
    queue.push(this);
    while (queue.length > 0) {
      array.push(queue[0].data);
      if (queue[0].left !== null) {
        queue.push(queue[0].left);
      }
      if (queue[0].right !== null) {
        queue.push(queue[0].right);
      }
      queue.shift();
    }
    this.right = null;
    this.left = null;
    let mid = 0 + Math.floor((array.length - 1 - 0) / 2);
    this.data = array[mid];
    this.left = buildTree(array, 0, mid - 1, true);
    this.right = buildTree(array, mid + 1, array.length - 1, true);
  };
}

class Tree {
  constructor(array, start, end, loop) {
    this.root = buildTree(array, start, end, loop);
  }
}

mergeSort = function (array, left, right) {
  if (left === undefined) {
    left = 0;
  }
  if (right === undefined) {
    right = array.length - 1;
  }
  if (left >= right) return;

  const mid = Math.floor(left + (right - left) / 2);
  mergeSort(array, left, mid);
  mergeSort(array, mid + 1, right);
  merge(array, left, mid, right);
  return array;
};

merge = function (array, left, mid, right) {
  const leftarray = [];
  const rightarray = [];

  for (let i = 0; i < mid - left + 1; i++) {
    leftarray[i] = array[left + i];
  }

  for (let j = 0; j < right - mid; j++) {
    rightarray[j] = array[mid + j + 1];
  }
  let i = 0;
  let j = 0;
  let k = left;

  while (i < mid - left + 1 && j < right - mid) {
    if (leftarray[i] < rightarray[j]) {
      array[k] = leftarray[i];
      i++;
    } else {
      array[k] = rightarray[j];
      j++;
    }
    k++;
  }
  while (i < mid - left + 1) {
    array[k] = leftarray[i];
    i++;
    k++;
  }
  while (j < right - mid) {
    array[k] = rightarray[j];
    j++;
    k++;
  }
};

remove = function (array) {
  mergeSort(array);
  for (let x = 0; x < array.length; x++) {
    if (array[x] == array[x + 1]) {
      array.splice([x + 1], 1);
      x--;
    }
  }
  return array;
};

buildTree = function (array, start, end, loop) {
  if (start > end) {
    return null;
  }
  if (loop == undefined) {
    array = remove(array);
    loop = true;
  }
  if (start == undefined) {
    start = 0;
  }
  if (end == undefined) {
    end = array.length - 1;
  }
  let mid = start + Math.floor((end - start) / 2);
  let root = new Node(array[mid]);
  root.left = buildTree(array, start, mid - 1, loop);
  root.right = buildTree(array, mid + 1, end, loop);
  return root;
};

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

function lognode(node) {
  console.log(node.data);
}

newarray = function () {
  let array = [];
  while (array.length < 15) {
    array.push(Math.floor(Math.random() * 100));
  }
  return array;
};

let newtest = newarray();

let newtree = new Tree(newtest);

prettyPrint(newtree.root);

newtree.root.isBalanced();

newtree.root.insert(200);
newtree.root.insert(300);
newtree.root.insert(400);
newtree.root.insert(250);
newtree.root.insert(220);
newtree.root.insert(350);
newtree.root.insert(325);
newtree.root.insert(201);

newtree.root.isBalanced();

newtree.root.rebalance();

prettyPrint(newtree.root);

newtree.root.isBalanced();
