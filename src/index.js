class Node {
  constructor(data, left, right) {
    this.data = data;
    this.left = left;
    this.right = right;
  }

  //   loopNodes = function () {
  //     console.log(this.data);
  //     if (this.left !== null) {
  //       this.left.loopNodes();
  //     }
  //     if (this.right !== null) {
  //       this.right.loopNodes();
  //     }
  //   };

  insertNode = function (value) {
    if (value == this.data) {
      return;
    }
    if (this.left == null) {
      this.left = new Node(value);
      return this.left;
    }
    if (value < this.data) {
      this.left.insertNode(value);
    }
    if (value > this.data) {
      this.right.insertNode(value);
    }
    // if (value > this.data && this.right !== null) {
    //   this.right.insertNode(value);
    //   console.log(3);
    //   return;
    // }
  };
}

class Tree {
  constructor(array) {
    this.root = buildTree(array);
  }

  //   loopTree = function () {
  //     console.log(this.root.data);
  //     this.root.left.loopNodes();
  //     this.root.right.loopNodes();
  //   };
  insert = function (value) {
    if (value == this.root.data) {
      return;
    }
    if (value < this.root.data) {
      this.root.left.insertNode(value);
    } else {
      this.root.right.insertNode(value);
    }
  };
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
  if (loop !== true) {
    remove(array);
    loop = true;
  }
  if (start == undefined) {
    start = 0;
  }
  if (end == undefined) {
    end = array.length - 1;
  }
  if (start > end) return null;
  let mid = Math.floor((start + end) / 2);
  let treenode = new Node(array[mid]);
  treenode.left = buildTree(array, start, mid - 1, loop);
  treenode.right = buildTree(array, mid + 1, end, loop);
  return treenode;
};

let test = new Tree([1, 7, 4, 23, 8, 9, 4, 9, 3, 5, 7, 9, 67, 6345, 324]);

test.insert(6);

console.log(test);
