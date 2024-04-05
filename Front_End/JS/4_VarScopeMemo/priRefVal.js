// dynamic attribute

let name1 = 'Nicholas';
let name2 = new String('Matt');
name1.age = 27;
name2.age = 26;
console.log(name1.age);
console.log(name2.age);
console.log(typeof name1);
console.log(typeof name2);

// copy

let num1 = 5; // primitive value
let num2 = num1; // different memories

console.log(num1, num2)
num2 = 10;
console.log(num1, num2)

let obj1 = new Object(); // reference value
let obj2 = obj1; // same memories
obj1.name = 'Nicholas';
console.log(obj1.name, obj2.name);
obj2.name = 'Matt';
console.log(obj1.name, obj2.name);

function setName1(obj) {
    obj.name = "Nicholas";
}
let person1 = new Object();
setName1(person1);
console.log(person1.name); // "Nicholas" 

function setName2(obj) {
    obj.name = "Nicholas";
    //这表明函数中参数的值改变之后，原始的引用仍然没变。当 obj 在函数内部被重写时，它变成了一个指
    // 向本地对象的指针。而那个本地对象在函数执行结束时就被销毁了。
    obj = new Object();
    obj.name = "Greg";
}
let person2 = new Object();
setName2(person2);
console.log(person2.name); // "Nicholas"

const person = new Object();
const colors = [255, 255, 255];
const pattern = "foobarbaz".replace(/bar/, 'qux')

console.log(person instanceof Object); // 变量 person 是 Object 吗？
console.log(colors instanceof Array); // 变量 colors 是 Array 吗？
console.log(pattern instanceof RegExp); // 变量 pattern 是 RegExp 吗？

// extend scope chain
function buildUrl() {
    let qs = '?debug=true';

    with (location) {
        let url = href + qs;
    }

    return url;
}

// statement of var
function add(num1, num2) {
    var sum = num1 + num2;
    return sum;
}

// console.log(add(10, 20), sum); error

function add1(num1, num2) {
    sum1 = num1 + num2;
    return sum1;
}

// console.log(add(10, 20), sum1);

// var name = 'Jake';
// =
// name = 'Jave'; var name;

{ var a = 0 };
console.log(a);
function ok() {
    var b = 3;
}
try {
    console.log(b);
}
catch (error) {
    console.log('error')
}

{ let c = 0 };
try {
    console.log(c);
}
catch (error) {
    console.log('error')
}
function ok() {
    let d = 3;
}
try {
    console.log(b);
}
catch (error) {
    console.log('error')
}

var color = 'blue';
function getColor() {
    let color = 'red';
    return color;
}
console.log(getColor()); // 'red'

var color = 'blue';
function getColor() {
    let color = 'red';
    {
        let color = 'green';
        return color;
    }
}
console.log(getColor()); // 'green'

// 垃圾回收

// let element = document.getElementById("some_element");
// let myObject = new Object();
// myObject.element = element;
// element.someObject = myObject;
// 手动解除循环引用
// myObject.element = null;
// element.someObject = null; 

// 内存管理

function createPerson(name) {
    let localPerson = new Object();
    localPerson.name = name;
    return localPerson;
}
let globalPerson = createPerson("Nicholas");
// 解除 globalPerson 对值的引用
globalPerson = null;


// 隐藏类
function Article() {
    this.title = 'Inauguration Ceremony Features Kazoo Band';
}
// 两对象共享相同隐藏类
let a1 = new Article();
let a2 = new Article();

a2.author = 'Alfred'; // 对应两个不同的隐藏类
// console.log(typeof a1)
// console.log(typeof Article)

// 解决方法

function Article1(opt_author) {
    this.title = 'Inauguration Ceremony Features Kazoo Band';
    this.author = opt_author;
}
let b1 = new Article1();
let b2 = new Article1('Jake'); // 仍然是同一个隐藏类

// 此时，记住——不要delete，置null就可以了

b2.author = null;

// Memory leak!

function leak() {
    leakValue = 'leak';
}

let leakValue2 = 'leak2';
setInterval(() => { console.log(leakValue2); }, 100);

// closure
let outer = function () {
    let leakValue3 = 'leak3';
    return function () {
        return leakValue3;
    };
};

// Do this
function addVector(a, b, resultant) {
    resultant.x = a.x + b.x;
    resultant.y = a.y + b.y;
    return resultant;
}

// Don't do this
function addVector(a, b) {
    let resultant = new Vector(); // 频繁引发垃圾回收
    resultant.x = a.x + b.x;
    resultant.y = a.y + b.y;
    return resultant;
}

// better, only in big project
// Object pool
class ObjectPool {
    constructor() {
        this._pool = [];
    }

    // 创建一个新对象
    createNewObject() {
        return {};
    }

    // 从对象池中获取一个对象
    allocate() {
        if (this._pool.length > 0) {
            return this._pool.pop();
        } else {
            return this.createNewObject();
        }
    }

    // 将对象返回到对象池
    free(obj) {
        this._pool.push(obj);
    }
}

// 使用对象池
// let pool = new ObjectPool();

// let obj1 = pool.allocate();
// let obj2 = pool.allocate();

// console.log(pool._pool.length);  // 输出 0，因为我们已经取出了所有的对象

// pool.free(obj1);
// pool.free(obj2);

// console.log(pool._pool.length);  // 输出 2，因为我们已经将对象返回到了对象池


// vectorPool 是已有的对象池 
// let v1 = vectorPool.allocate();
// let v2 = vectorPool.allocate();
// let v3 = vectorPool.allocate();
// v1.x = 10;
// v1.y = 5;
// v2.x = -3;
// v2.y = -6;
// addVector(v1, v2, v3);
// console.log([v3.x, v3.y]); // [7, -1] 
// ObjectPool.free(v1);
// ObjectPool.free(v2);
// ObjectPool.free(v3);
// 如果对象有属性引用了其他对象
// 则这里也需要把这些属性设置为 null 
// v1 = null;
// v2 = null;
// v3 = null;

// let vectorList = new Array(100); 初始化容量要足够大，
// 否则很快因为动态扩容（两倍）而招来收垃圾 
// let vector = new Vector(); 
// vectorList.push(vector);