let colors = new Array(20);
colors[0] = 1;
colors[1] = 2;

console.log(colors);
colors = null;
console.log(colors);

colors = Array('red', 'blue', 'green');
console.log(colors);
colors = ['red', 'blue', 'green'];
console.log(colors); ``

let test = 'a,b,c,,,d,e,'.split(/,+/);
console.log(test instanceof Array, test);

console.log(Array.from('Matt'));
const m = new Map().set(1, 2).set(3, 4);
console.log(m, '\n', Array.from(m));
const s = new Set().add(1).add(2).add(3).add(4);
console.log(s, '\n', Array.from(s));

const a1 = [1, 2, 3, 4];
const a2 = Array.from(a1);

console.log(a1);
console.log(`a1 == a2 : ${a1 == a2}`);
if (typeof window !== 'undefined') {
    console.log('You are on the browser'); // 可以使用 alert()
    alert(a1 === a2);
} else {
    console.log('You are on the server'); // 无法使用 alert()
}

const iter = {
    *[Symbol.iterator]() {
        yield 1;
        yield 2;
        yield 3;
        yield 4;
        yield 5;
    }
};

console.log(Array(iter));
console.log(Array.from(iter));

function getArgsArray() {
    return Array.from(arguments);
}
console.log(getArgsArray(1, 2, 3, 4));

const arrayLikeObject = {
    0: 1,
    1: -98,
    2: 10,
    3: 999,
    length: 4
};
console.log(Array.from(arrayLikeObject));

// Array.from()还接收第二个可选的映射函数参数。这个函数可以直接增强新数组的值，而无须像
// 调用 Array.from().map()那样先创建一个中间数组。还可以接收第三个可选参数，用于指定映射函
// 数中 this 的值。但这个重写的 this 值在箭头函数中不适用。
const b1 = [1, 2, 3, 4];
const b2 = Array.from(b1, x => x ** 2);
const b3 = Array.from(b1, function (x) { return x ** this.exponent }, { exponent: 2 });

console.log(b2, '\n', b3);

console.log(Array.of(1, 2, 3, 4));
console.log(Array.of(undefined));

// empty
const options = [, , , , ,];
console.log(options.length);
console.log(options);
const opt2 = [1, , , , 5];
console.log(opt2);
for (const option of opt2) {
    console.log(option == undefined);
}

const a = Array.from([, , ,]);
for (const val of a) {
    console.log(val === undefined);
}

console.log(Array.of(...[, , ,]));

console.log(opt2)

for (const [index, value] of opt2.entries()) {
    console.log(index, value);
}

// map 跳过空位置
console.log(opt2.map(() => 6));

// join视空位置为空字符串
console.log(opt2.join('-'));

let color = ['red', 'blue', 'green'];
console.log(color[0]);
color[2] = 'black';
color[3] = 'brown';

let names = [];

console.log(colors.length, color);
console.log(names.length);

color.length = 2;
console.log(color);

color.length = 4;
console.log(color);

color = [];
color[color.length] = 'red';
console.log(color);
color[99] = 'black';
console.log(color.length, color[98], color[99]);

console.log(Math.PI);

// 检测数组
console.log(typeof color, color instanceof Array);
let value = new Array();
if (value instanceof Array) {
    console.log('value is instanceof Array');
}

if (Array.isArray(value)) {
    console.log('value is Array.isArray()');
}

// 迭代器方法
// 在 ES6 中，Array 的原型上暴露了 3 个用于检索数组内容的方法：keys()、values()和
// entries()。keys()返回数组索引的迭代器，values()返回数组元素的迭代器，而 entries()返回
// 索引/值对的迭代器：
const x = ['foo', 'bar', 'baz', 'qux'];
console.log(x, ...x);
const xKeys = Array.from(x.keys());
const xValues = Array.from(x.values());
const xEntries = Array.from(a.entries());

console.log(xKeys);
console.log(xValues);
console.log(xEntries);

for (const [idx, element] of x.entries()) {
    console.log(`idx: ${idx} element: ${element}`);
}

// 赋值和填充方法
const zeroes = new Array(5);
console.log(zeroes);
zeroes.fill(5);
console.log(zeroes);
zeroes.fill(0);

zeroes.fill(6, 3);
console.log(zeroes);
zeroes.fill(0);

zeroes.fill(7, 1, 3);
console.log(zeroes);
zeroes.fill(0);

zeroes.fill(8, -4, -1);
console.log(zeroes);
zeroes.fill(0);

zeroes.fill(1, -10, -6);
console.log(zeroes);

zeroes.fill(2, 4, 2);
console.log(zeroes);

zeroes.fill(4, 3, 10);
console.log(zeroes);

// copyWithin, 索引规则同fill
let ints,
    reset = () => ints = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
reset();

console.log(ints);
ints.copyWithin(5);
console.log(ints);
ints[6] = 1000;
console.log(ints);

reset();

ints.copyWithin(0, 5);
console.log(ints);

// 转换方法
console.log(colors);
console.log(colors.toString());
// alert(colors.valueOf()); // red,blue,green
console.log(colors.valueOf());
// alert(colors.valueOf()); // red,blue,green
console.log(colors);

let person1 = {
    toLocaleString() {
        return 'Nikolaos';
    },

    toString() {
        return 'Nicholas';
    }
};

console.log(`typeof person1: ${typeof person1}`);

let person2 = {
    toLocaleString() {
        return 'Grigorios';
    },

    toString() {
        return 'Greg';
    }
};

let people = [person1, person2];
// alert(people);
// alert(people.toString());
// alert(people.toLocaleString());

// alert(colors.join('.'));
// alert(colors.join('||'));

// 栈方法 LIFO push&pop
let colors2 = new Array('red', 'green', 'black');
let count = colors2.push('red', 'green');
console.log(count);

count = colors2.push('black');
console.log(count);

console.log(colors2);
let item = colors2.pop();
console.log(colors2);
console.log(item);
console.log(colors2.length);

// 队列方法 FIFO push&shift
console.log('FIFO: \n')
colors2.length = 0;
count = colors2.push('red', 'green');
console.log(count);

console.log(`colors2 = ${colors2}`);
count = colors2.push('black');
console.log(`count = ${count}, colors2 = ${colors2}`);

// item = colors.shift();
console.log(`colors2.shift = ${colors2.shift()}, colors2 = ${colors2}`)

// sort
let values = Array.of(1, 2, 3, 4, 5);
values.reverse();
console.log(values);

values = Array.of(3, 2, 5, 1, 4);
values.sort();
console.log(values);

function ascending(lhs, rhs) {
    if (lhs < rhs) {
        return -1;
    } else if (lhs > rhs) {
        return 1;
    } else {
        return 0;
    }
}

let resetv = () => values = [3, 2, 5, 1, 4];
resetv();
values.sort(ascending);
console.log(values);

function descending(lhs, rhs) {
    if (lhs < rhs) {
        return 1;
    } else if (lhs > rhs) {
        return -1;
    } else {
        return 0;
    }
}

resetv();
values.sort(descending);
console.log(values);

resetv();
values.sort((a, b) => a < b ? 1 : a > b ? -1 : 0);
console.log(values);


// 搜索和位置方法
let numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];

// replace console.log with alert
// ...indexOf 没有找到就返回-1,即最后一个索引
console.log(numbers.indexOf(4));
console.log(numbers.lastIndexOf(4));
console.log(numbers.includes(4));

console.log(numbers.indexOf(4, 4)); // 从4往后搜索第一个
console.log(numbers.lastIndexOf(4, 4)); // 从4往前搜索第一个
console.log(numbers.includes(4, 7));

let person = { name: 'Nicholas' };
people = [{ name: 'Nicholas' }];
let morePeople = [person];

// 采用的匹配模式是严格相等'==='
console.log(people.indexOf(person));
console.log(morePeople.indexOf(person));
console.log(people.includes(person));
console.log(morePeople.includes(person));

// 断言函数
const pp = [
    {
        name: 'Matt',
        age: 27
    },
    {
        name: 'Nicholas',
        age: 29
    }
];

console.log('typeof pp:', typeof pp, pp instanceof Array);

// 断言函数接受三个参数element元素，index索引和array本身
console.log(pp.find((element, index, array) => element.age < 28));

console.log(pp.findIndex((element, index, array) => element.age < 28));

const evens = [2, 4, 6];

evens.find((e, id, arr) => {
    console.log(e);
    console.log(id);
    console.log(arr);
    // 找到匹配项后不会继续查找
    return e === 4;
}
)

// 迭代方法
// every(), filter(), forEach(), map(), some()
numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];
let everyResult = numbers.every((item, index, array) => item > 2);
console.log(everyResult);

let someResult = numbers.some((item, index, array) => item > 2);
console.log(someResult);

let filterResult = numbers.filter((item, index, array) => item > 2);
console.log(filterResult);

let mapResult = numbers.map((item, index, array) => item * 2);
console.log(mapResult);

numbers.forEach((item, index, array) => {
    if (item >= 4) {
        console.log(item);
    }
})

// 归并方法 python reduce
// console.log(`values = ${values}`);
// values.sort((a, b) => Math.abs(a) < Math.abs(b) ? -1 :
//     Math.abs(a) > Math.abs(b) ? 1 : 0);
// console.log(`values = ${values}`);
values.length = 5;
// item为基本数据类型按值传递，所以只能获取不能修改
// values.forEach((item, index, array) => {
//     item = index;
// });
values = values.map((item, index, array) => index + 1);
console.log(values);
let sum = values.reduce((prev, cur, index, array) => prev + cur);

console.log(sum);

//reduceRight即反方向
let outcome = values.reduceRight((prev, cur, index, array) => prev - cur);

console.log(outcome);

