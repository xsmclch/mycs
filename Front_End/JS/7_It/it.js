// 可迭代协议
let num = 1, obj = {};
console.log(num[Symbol.iterator], obj[Symbol.iterator]);

let str = 'abc';
let arr = [...str];
let map = arr.map((x, index) => [x, index]);
let set = new Set(arr);
// let els = document.querySelectorAll('div');

console.log(str, arr, map, set);
// 迭代器工厂函数
console.log(str[Symbol.iterator]);
console.log(arr[Symbol.iterator]);
console.log(map[Symbol.iterator]);
console.log(set[Symbol.iterator]);
// 生成迭代器
console.log(str[Symbol.iterator]());
console.log(arr[Symbol.iterator]());
console.log(map[Symbol.iterator]());
console.log(set[Symbol.iterator]());

arr = ['foo', 'bar', 'baz'];

for (let el of arr) {
    console.log(el);
}

// 解构
let [a, b, c] = arr;
console.log(a, b, c);

// 扩展操作符
let arr2 = [...arr];
console.log(arr2, arr2.length);

// Array.from
let arr3 = Array.from(arr);
console.log(arr3);

// Set constructor
set = new Set(arr);

// Map 构造
let pairs = arr.map((value, index) => [value, index]);
console.log(pairs);
map = new Map(pairs);
console.log(map);

// 自定义迭代器
class FooArray extends Array { }
let fooArr = new FooArray('foo', 'bar', 'baz');

for (let el of fooArr) {
    console.log(el);
}

class Counter {
    constructor(limit) {
        this.limit = limit;
    }
    [Symbol.iterator]() {
        let count = 1,
            limit = this.limit;
        return {
            next() {
                if (count <= limit) {
                    return { done: false, value: count++ };
                } else {
                    return { done: true };
                }
            },
            return() {
                console.log('Exiting early');
                return { done: true };
            }
        };
    }
}

let counter = new Counter(3);

for (let i of counter) {
    console.log(i);
}

arr = ['foo', 'bar', 'baz'];
let iter1 = arr[Symbol.iterator]();

console.log(iter1[Symbol.iterator]);

let iter2 = iter1[Symbol.iterator]();

console.log(iter1 == iter2);

// class Counter {
//     constructor(limit) {
//         this.limit = limit;
//     }
//     [Symbol.iterator]() {
//         let count = 1,
//             limit = this.limit;
//         return {
//             next() {
//                 if (count <= limit) {
//                     return { done: false, value: count++ };
//                 } else {
//                     return { done: true };
//                 }
//             },
//             return() {
//                 console.log('Exiting early');
//                 return { done: true };
//             }
//         };
//     }
// }
let counter1 = new Counter(5);
for (let i of counter1) {
    if (i > 2) {
        break;
    }
    console.log(i);
}

let counter2 = new Counter(5);

try {
    for (let i of counter2) {
        if (i > 2) {
            throw 'err';
        }
        console.log(i);
    }
} catch (e) { }

let counter3 = new Counter(5);

a = [1, 2, 3, 4, 5];
let iter = a[Symbol.iterator]();

for (let i of iter) {
    console.log(i);
    if (i > 2) {
        break;
    }
} // 1 2 3

for (let i of iter) {
    console.log(i);
} // 4 5

// 生成器
function* generatorFn() { }

console.log(generatorFn);
console.log(generatorFn()[Symbol.iterator]);
console.log(generatorFn());
console.log(generatorFn()[Symbol.iterator]());

const g = generatorFn();

console.log(g === g[Symbol.iterator]());

// yield
function* genFn() {
    yield 'foo';
    yield 'bar';
    return 'baz';
}

let generatorObject = genFn();
let generatorObject1 = genFn();
console.log(typeof generatorObject);
console.log(generatorObject.next());
console.log(generatorObject.next());
console.log(generatorObject.next());

console.log(generatorObject1.next());

function* gen123() {
    yield 1;
    yield 2;
    yield 3;
}

for (const x of gen123()) {
    console.log(x);
}

function* nTimes(n) {
    while (n--) {
        yield;
    }
}

console.log(typeof nTimes(3));

for (let _ of nTimes(3)) {
    console.log('foo');
}

// 用生成器实现范围和填充数组

function* range(start, end, step = 1) {
    if (end >= start) {
        while (end > start) {
            yield start;
            start += step;
        }
    }
    else {
        while (end < start) {
            yield start;
            start += step;
        }
    }
}

console.log(Array.from(range(1, 10, 2)));
console.log(Array.from(range(0, -9, -2)));

function* generatorFn() {
    yield* [1, 2, 3];
}

console.log(Array.from(generatorFn()));

// recursion
function* nt(n) {
    if (n > 0) {
        yield* nt(n - 1);
        yield n - 1;
    }
}

for (const x of nt(3)) {
    console.log(x);
}

// 使用生成器实现一个简洁的深度优先搜索
class Node {
    constructor(id) {
        this.id = id;
        this.neighbors = new Set();
    }

    connect(node) {
        if (node != this) {
            this.neighbors.add(node);
            node.neighbors.add(this);
        }
    }
}

class RandomGraph {
    constructor(size) {
        this.nodes = new Set();

        // 创建节点
        for (let i = 0; i < size; ++i) {
            this.nodes.add(new Node(i));
        }

        // 随机连接节点
        const threshold = 1 / size;
        for (const x of this.nodes) {
            for (const y of this.nodes) {
                if (Math.random() < threshold) {
                    x.connect(y);
                }
            }
        }
    }

    // 测试
    print() {
        for (const node of this.nodes) {
            const ids = [...node.neighbors]
                .map((n) => n.id)
                .join(',');

            console.log(`${node.id} : ${ids}`);
        }
    }

    // 生成器递归DFS

    isConnected() {
        const visitedNodes = new Set();

        function* traverse(nodes) {
            for (const node of nodes) {
                if (!visitedNodes.has(node)) {
                    yield node;
                    yield* traverse(node.neighbors);
                }
            }
        }

        // 取得集合中的第一个节点
        const firstNode = this.nodes[Symbol.iterator]().next().value;

        // 使用递归生成器迭代每个节点
        for (const node of traverse([firstNode])) {
            visitedNodes.add(node);
        }

        return visitedNodes.size === this.nodes.size;
    }
}

const graph = new RandomGraph(6);

graph.print();

console.log(graph.isConnected());

// let test = new Set([1, 2, 3]);
// console.log(test.add(3), test.add(4));

// 提前终止生成器
// return, 提供return值并关闭
function* gf() {
    yield* [1, 2, 3];
}

let gg = gf();

console.log(gg);
console.log(gg.return(4));
console.log(gg);
// throw, 向生成器抛出error，解决了就继续，不能解决就close
function* gf1() {
    yield* [1, 2, 3];
}

gg = gf();
console.log(gg);

gg = gf1();
console.log('here is gf1, gg.next() =', gg.next());
console.log(gg);
try {
    gg.throw('foo');
} catch (e) {
    console.log(e);
}
console.log(gg.next());

function* gf2() {
    try {
        yield* [1, 2, 3];
    } catch (e) { }
}

gg = gf2();
console.log(`here is gf2, gg.next() = ${gg.next()}`);
console.log(gg);
try {
    g.throw('foo');
} catch (e) {
    console.log(e);
}
console.log(gg.next());