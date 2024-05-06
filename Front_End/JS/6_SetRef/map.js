// Basic API
let m = new Map([
    ['key1', 'value1'],
    ['key2', 'value2'],
    ['key3', 'value3'],
])

console.log(m);

m = new Map({
    [Symbol.iterator]: function* () {
        yield ['key1', 'value1'];
        yield ['key2', 'value2'];
        yield ['key3', 'value3']
    }
})

console.log(m.size, m)
m = new Map([[]])
console.log(m, m.has(undefined));
console.log(m, m.get(undefined));

m = new Map();
console.log(m);

m.set('firstName', 'Chen')
    .set('lastName', 'Zui');

console.log(m);
if (m.has('firstName')) {
    console.log("m's firstName is", m.get('firstName'));
}
console.log("m's size is", m.size);

m.delete('firstName');
console.log(m.has('firstName'), m.size);

m.clear();
console.log(m)

// set()方法返回映射实例，因此可以把多个操作连缀起来，包括初始化声明：
m = new Map().set("key1", "val1");
m.set("key2", "val2")
    .set("key3", "val3");
console.log(m.size); // 3

// 与 Object 只能使用数值、字符串或符号作为键不同，Map 可以使用任何 JavaScript 数据类型作为
// 键。Map 内部使用 SameValueZero 比较操作（ECMAScript 规范内部定义，语言中不能使用），基本上相
// 当于使用严格对象相等的标准来检查键的匹配性。与 Object 类似，映射的值是没有限制的。
m = new Map();

const functionKey = function () { };
const symbolKey = Symbol();
const objectKey = new Object();

m.set(functionKey, 'functionValue')
    .set(symbolKey, 'symbolValue')
    .set(objectKey, 'objectValue');

console.log(m);

console.log(m.has(function () { }));

m = new Map();

const objKey = {},
    objVal = {},
    arrKey = [],
    arrVal = [];

m.set(objKey, objVal)
    .set(arrKey, arrVal);

console.log(m);

objKey.foo = 'foo';
objVal.bar = 'bar';
arrKey.push('foo');
arrVal.push('bar');

console.log(m);
console.log(m.get(objKey));
console.log(m.get(arrKey));

m = new Map();
const a = 0 / '',
    b = 0 / '',
    pz = +0,
    nz = -0;

console.log(`a === b : ${a === b}, pz === nz : ${pz === nz}`);

m.set(a, 'foo');
m.set(pz, 'bar');

console.log(m.get(b), m.get(nz));

// 顺序和迭代

m = new Map([
    ['key1', 'value1'],
    ['key2', 'value2'],
    ['key3', 'value3'],
])

console.log(m.entries === m[Symbol.iterator]);

for (let pair of m.entries()) {
    console.log(pair);
}

for (let pair of m[Symbol.iterator]()) {
    console.log(pair);
}

console.log([...m]);

m.forEach((val, key) => console.log(`${key} => ${val}`));

for (let key of m.keys()) {
    console.log(key);
}

let m1 = new Map([
    ['key1', 'val1']
]);

for (let key of m1.keys()) {
    key = 'newKey';
    console.log(key);
    console.log(m1.get('key1'));
}

const keyObj = { id: 1 };

m = new Map([
    [keyObj, 'val1']
]);

for (let key of m.keys()) {
    key.id = 'newKey';
    console.log(key);
    console.log(m.get(keyObj));
}
console.log('keyObj', keyObj);
console.log('m', m);

// WeakMap
// 可以使用 new 关键字实例化一个空的 WeakMap：
// 弱映射中的键只能是 Object 或者继承自 Object 的类型，尝试使用非对象设置键会抛出
// TypeError。值的类型没有限制。
// 如果想在初始化时填充弱映射，则构造函数可以接收一个可迭代对象，其中需要包含键 / 值对数组。
// 可迭代对象中的每个键 / 值都会按照迭代顺序插入新实例中：
const key1 = { id: 1 },
    key2 = { id: 2 },
    key3 = { id: 3 };

const wm1 = new WeakMap([
    [key1, 'val1'],
    [key2, 'val2'],
    [key3, 'val3']
]);

console.log(wm1.get(key1));
console.log(wm1.get(key2));
console.log(wm1.get(key3));

// const wm2 = new WeakMap([
//     [key1, 'val1'],
//     ['BADKEY', 'val2'],
//     [key3, 'val3']
// ])

let wm = new WeakMap();

console.log(wm.has(key1));
console.log(wm.get(key1));

wm.set(key1, 'Matt')
    .set(key2, 'Frisbie');

console.log(wm.has(key1), wm.has({ id: 1 }));
console.log(wm.get(key1));

wm.delete(key1);

console.log(wm.has(key1), wm.has(key2));

// 弱键
let key = {};
wm = new WeakMap().set({}, 'val');
console.log(wm); // nothing
console.log(wm.get(key)); // undefined
wm.set(key, 'val');
console.log(wm);
console.log(wm.get(key)); // val
wm.delete(key);

// usage
class User {
    constructor(id) {
        this.idProperty = Symbol('id');
        this.setId(id);
    }
    setPrivate(property, value) {
        const privateMembers = wm.get(this) || {};
        privateMembers[property] = value;
        wm.set(this, privateMembers);
    }
    getPrivate(property) {
        return wm.get(this)[property];
    }
    setId(id) {
        this.setPrivate(this.idProperty, id);
    }
    getId() {
        return this.getPrivate(this.idProperty);
    }
}

const user = new User(123);
console.log(user.getId());
user.setId(456);
console.log(user.getId());

// 2. DOM 节点元数据
// 因为 WeakMap 实例不会妨碍垃圾回收，所以非常适合保存关联元数据。来看下面这个例子，其中
// 使用了常规的 Map：
// const m = new Map(); 
// const loginButton = document.querySelector('#login'); 
// // 给这个节点关联一些元数据
// m.set(loginButton, {disabled: true}); 
// 假设在上面的代码执行后，页面被 JavaScript 改变了，原来的登录按钮从 DOM 树中被删掉了。但
// 由于映射中还保存着按钮的引用，所以对应的 DOM 节点仍然会逗留在内存中，除非明确将其从映射中
// 删除或者等到映射本身被销毁。
// 如果这里使用的是弱映射，如以下代码所示，那么当节点从 DOM 树中被删除后，垃圾回收程序就
// 可以立即释放其内存（假设没有其他地方引用这个对象）：
// const wm = new WeakMap(); 
// const loginButton = document.querySelector('#login'); 
// // 给这个节点关联一些元数据
// wm.set(loginButton, {disabled: true});