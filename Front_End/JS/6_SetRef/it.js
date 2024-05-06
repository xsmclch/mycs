let iterableThings = [
    Array.of(1, 2),
    typedArr = Int16Array.of(3, 4),
    new Map([[5, 6], [7, 8]]),
    new Set([9, 10])
]

console.log(iterableThings);
for (let pair of iterableThings.entries()) {
    console.log(pair[0], '->', pair[1]);
}

for (const iterableThing of iterableThings) {
    for (const x of iterableThing) {
        console.log(x);
    }
}

let arr1 = [1, 2, 3];
let arr2 = [...arr1];

console.log(arr1, arr2, arr1 === arr2);

// 对于期待可迭代对象的构造函数，只要传入一个可迭代对象就可以实现复制：
let map1 = new Map([[1, 2], [3, 4]]); 
let map2 = new Map(map1); 
console.log(map1); // Map {1 => 2, 3 => 4} 
console.log(map2); // Map {1 => 2, 3 => 4} 
// 当然，也可以构建数组的部分元素：
arr1 = [1, 2, 3]; 
arr2 = [0, ...arr1, 4, 5]; 
console.log(arr2); // [0, 1, 2, 3, 4, 5]

console.log(map1 === map2);

// 浅复制意味着只会复制对象引用：
arr1 = [{}]; 
arr2 = [...arr1]; 
arr1[0].foo = 'bar'; 
console.log(arr2[0]); // { foo: 'bar' } 

arr1 = [1, 2, 3];

let typedArr1 = Int16Array.of(...arr1);
let typedArr2 = Int16Array.from(arr1);
console.log(typedArr1,typedArr2, typedArr1 === typedArr2);

let map = new Map(arr1.map((x) => [x, 'val ' + x]));
console.log(map);

let set = new Set(typedArr2);
console.log(set);

arr2 = [...set];
console.log(arr1);