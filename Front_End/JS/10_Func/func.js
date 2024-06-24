// 四种定义方式，语法上可以想象为函数是对象，函数名是指针
// 1.函数声明，函数名是eg1
function eg1(...nums) {
    return nums.reduce((accumulator, current) => accumulator + current, 0);
}

// 2.函数表达式，没有函数名，但其实eg2相当于函数的指针
let eg2 = function (...nums) {
    return nums.reduce((ac, cur) => ac + cur);
}

// 3.箭头函数arrow function，同理
let eg3 = (...nums) => {
    return nums.reduce((ac, cur) => ac + cur);
}

// 4.Function构造函数，不推荐
let eg4 = new Function('...nums', 'return nums.reduce((ac, cur) => ac + cur)');

console.log(eg1(1, 2, 3), eg2(1, 3, 2), eg3(3, 1, 2), eg4(2, 1, 3));

// Arrow Function!!! ES6
// 如果只有一个参数可以不用括号，没有或者多个参数才用括号
let double = (x) => { return 2 * x };
let triple = x => { return 3 * x };

let getRandom = () => { return Math.random(); };
//箭头函数也可以不用大括号，但这样会改变函数的行为。使用大括号就说明包含“函数体”，可以
// 在一个函数中包含多条语句，跟常规的函数一样。如果不使用大括号，那么箭头后面就只能有一行代码，
// 比如一个赋值操作，或者一个表达式。而且，省略大括号会隐式返回这行代码的值：

// 可以赋值
let value = {};
let setName = (x) => x.name = 'Kisara';
setName(value);
console.log(value.name);

// 省大括号直接返回这个值
let sum = (a, b) => a + b;
console.log(sum(1, 2));
// sum = (a, b) => return a + b; Wrong!

// 函数名相当于函数的指针
console.log(sum(10, 10));

let anotherSum = sum;
console.log(anotherSum(10, 10));

sum = null;
console.log(anotherSum(10, 10));
// ECMAScript 6 的所有函数对象都会暴露一个只读的name属性，其中包含关于函数的信息。多数情
// 况下，这个属性中保存的就是一个函数标识符，或者说是一个字符串化的变量名。即使函数没有名称，
// 也会如实显示成空字符串。如果它是使用Function构造函数创建的，则会标识成"anonymous"：
function foo() { }
let bar = function () { };
let baz = () => { };

console.log(foo.name);
console.log(bar.name);
console.log(baz.name);
console.log((() => { }).name);
console.log((new Function()).name);

function foo() { }

console.log(foo.bind(null).name);

let dog = {
    years: 1,
    get age() {
        return this.years;
    },
    set age(newAge) {
        this.years = newAgel
    }
}

let propertyDescriptor = Object.getOwnPropertyDescriptor(dog, 'age');
console.log(propertyDescriptor.get.name);
console.log(propertyDescriptor.set.name);

// ECMAScript函数的参数跟大多数其他语言不同。ECMAScript函数既不关心传入的参数个数，也不
// 关心这些参数的数据类型。定义函数时要接收两个参数，并不意味着调用时就传两个参数。你可以传一
// 个、三个，甚至一个也不传，解释器都不会报错。
// 之所以会这样，主要是因为ECMAScript函数的参数在内部表现为一个数组。函数被调用时总会接
// 收一个数组，但函数并不关心这个数组中包含什么。如果数组中什么也没有，那没问题；如果数组的元
// 素超出了要求，那也没问题。事实上，在使用function关键字定义（非箭头）函数时，可以在函数内
// 部访问arguments 对象，从中取得传进来的每个参数值。
sum = (a, b) => a + b;
console.log(sum(1, 2, 3, 4, 5));

function log(...args) {
    console.log(this, ...args);
}
// arguments 对象是一个类数组对象（但不是Array的实例），因此可以使用中括号语法访问其中的
// 元素（第一个参数是arguments[0]，第二个参数是arguments[1]）。而要确定传进来多少个参数，
// 可以访问arguments.length 属性。
function sayHi(name, message) {
    console.log(`Hello ${name}, ${message}`);
}
sayHi('Kisara', 'my waifu!');

sayHi = function () {
    console.log(`Hello ${arguments[0]}, ${arguments[1]}`);
}
sayHi('Kisara', 'my waifu!');
// 参照
// int main(int argc, char *argv[]){}

// 如果函数是使用箭头语法定义的，那么传给函数的参数将不能使用arguments关键字访问，而只
// 能通过定义的命名参数访问。 
// ECMAScript 中的所有参数都按值传递的。不可能按引用传递参数。如果把对象作
// 为参数传递，那么传递的值就是这个对象的引用。

// 没有重载!!!
function addSomeNumber() {
    return arguments[0] + 100;
}

function addSomeNumber() {
    return arguments[0] + 200;
}

console.log(addSomeNumber(100))
// 参数参数默认值
function makeWaifu(name = 'kirasa') {
    return `Waifu ${name}`;
}

console.log(makeWaifu());
console.log(makeWaifu('Chino'));
// 函数的默认参数只有在函数被调用时才会求值，不会在函数定义时求值。而且，计算默认值的函数
// 只有在调用函数但未传相应参数时才会被调用。 

// 参数初始化顺序遵循“暂时性死区”规则，即前面定义的参数不能引用后面定义的。像这样就会抛
// 出错误： 
// 调用时不传第一个参数会报错 
function makeKing(name = numerals, numerals = 'VIII') {
    return `King ${name} ${numerals}`;
}
// 参数也存在于自己的作用域中，它们不能引用函数体的作用域：
// 调用时不传第二个参数会报错 
function makeKing(name = 'Henry', numerals = defaultNumeral) {
    let defaultNumeral = 'VIII';
    return `King ${name} ${numerals}`;
}

// 扩展参数
let values = [1, 2, 3, 4];

function getSum() {
    let sum = 0;
    for (let i = 0; i < arguments.length; ++i) {
        sum += arguments[i];
    }
    return sum;
}

console.log(getSum.apply(null, values));
// ES6后支持扩展
console.log(getSum(...values));

// 收集参数，收集成为一个Array，只能收集剩余参数，不能在收集之后再传单个参数
// function getProduct(...values, lastValue) {} 不可以
function ignoreFirst(_, ...values) {
    console.log(values);
}
ignoreFirst(...[1, 2, 3, 4]);

// 函数声明与函数表达式
// 函数声明提升
console.log(Sum(10, 10))
function Sum(num1, num2) {
    return num1 + num2;
}

// 报错
// console.log(Sum(10, 10));
// let Sum = function(num1, num2) {
//     return num1 + num2;
// }
// 用var一样报因为读到表达式才会有定义，但是声明会直接提升到源代码树顶端

// 函数作为值
function callSomeFunction(someFunction, someArguments) {
    return someFunction(someArguments);
}

function add10(num) {
    return num + 10;
}

console.log(callSomeFunction(add10, 10));

// 返回函数
function createComparisonFunction(propertyName) {
    return function (object1, object2) {
        let value1 = object1[propertyName];
        let value2 = object2[propertyName];

        return value1 < value2 ? -1 : value1 > value2 ? 1 : 0;
    }
}

let waifu = [
    { name: 'Megumin', age: 13 },
    { name: 'Kisara', age: 17 },
    { name: 'Chino', age: 14 }
]

waifu.sort(createComparisonFunction('age'));
console.log(waifu);
waifu.sort(createComparisonFunction('name'));
console.log(waifu);

// 回顾一下sort()
console.log([1, 2, 3].sort((a, b) => a > b ? -1 : a < b ? 1 : 0));

// 函数内部
// ES5中，函数内部存在两个特殊对象arguments和this，ES6新增了new.target
// arguments
// arguments 对象前面讨论过多次了，它是一个类数组对象，包含调用函数时传入的所有参数。这
// 个对象只有以function关键字定义函数（相对于使用箭头语法创建函数）时才会有。虽然主要用于包
// 含函数参数，但arguments对象其实还有一个callee属性，是一个指向arguments对象所在函数的
// 指针。来看下面这个经典的阶乘函数：
function factorial(num) {
    num = Math.floor(num);
    if (num <= 1) {
        return 1;
    } else {
        return num * factorial(num - 1);
    }
}
console.log(factorial(5.1));

function factorial(num) {
    num = Math.floor(num);
    if (num <= 1) {
        return 1;
    } else {
        return num * arguments.callee(num - 1);
    }
}
console.log(factorial(5.3));
// 这个重写之后的factorial()函数已经用arguments.callee代替了之前硬编码的factorial。
// 这意味着无论函数叫什么名称，都可以引用正确的函数。考虑下面的情况：
let trueFactorial = factorial;

factorial = function () {
    return 0;
};

console.log(factorial(5));
console.log(trueFactorial(5));


// this
// 另一个特殊的对象是this，它在标准函数和箭头函数中有不同的行为。 
// 在标准函数中，this引用的是把函数当成方法调用的上下文对象，这时候通常称其为this值（在
// 网页的全局上下文中调用函数时，this指向windows）。来看下面的例子：
// window.color = 'red';
// let o = {
//     color: 'blue'
// }

// function sayColor() {
//     console.log(this.color);
// }

// sayColor(); // red

// sayColor.call(o); // blue

// o.sayColor = sayColor;
// o.sayColor(); // blue

// 在箭头函数中，this引用的是定义箭头函数的上下文。下面的例子演示了这一点。在对sayColor()
// 的两次调用中，this引用的都是window对象，因为这个箭头函数是在window上下文中定义的
// 在事件回调或定时回调中调用某个函数时，this 值指向的并非想要的对象。此时将
// 回调函数写成箭头函数就可以解决问题。这是因为箭头函数中的this会保留定义该函数时的上下文：
function King() {
    this.royaltyName = 'Henry';
    // this引用king实例，时间单位为ms，即1000ms
    // setTimeout(() => console.log(this.royaltyName), 1000);
}

function Queen() {
    this.royaltyName = 'Elizabeth';
    // this引用window对象
    // setTimeout(function () { console.log(this.royaltyName); }, 1000);
}

new King();
new Queen();

// caller
function outer() {
    inner();
}

function inner() {
    console.log(arguments.callee.caller);
}

outer();
// 在严格模式下访问arguments.callee会报错。ECMAScript 5也定义了arguments.caller，但
// 在严格模式下访问它会报错，在非严格模式下则始终是undefined。这是为了分清arguments.caller
// 和函数的caller而故意为之的。而作为对这门语言的安全防护，这些改动也让第三方代码无法检测同
// 一上下文中运行的其他代码。 
// 严格模式下还有一个限制，就是不能给函数的caller属性赋值，否则会导致错误。

// new.target
// ECMAScript 中的函数始终可以作为构造函数实例化一个新对象，也可以作为普通函数被调用。
// ECMAScript 6 新增了检测函数是否使用new关键字调用的new.target属性。如果函数是正常调用的，
// 则new.target 的值是undefined；如果是使用new关键字调用的，则new.target将引用被调用的
// 构造函数。
function testNew() {
    if (!new.target) {
        console.log('testNew() is called without new');
        return;
    }
    console.log('testNew() is called by new, and new.target =', new.target);
}

testNew();
new testNew();

// 函数的属性和方法
// length保存函数定义的命名参数_不算
function sayName(name) {
    console.log(name);
}

function Sum(num1, num2) {
    return num1 + num2;
}

function sayHi(_, _) {
    console.log('hi');
}

console.log(sayName.length);    // 1
console.log(Sum.length);        // 2
console.log(sayHi.length);      // 

// prototype 属性也许是 ECMAScript核心中最有趣的部分。prototype 是保存引用类型所有实例
// 方法的地方，这意味着toString()、valueOf()等方法实际上都保存在 prototype 上，进而由所有实
// 例共享。这个属性在自定义类型时特别重要。（相关内容已经在第 8章详细介绍过了。）在 ECMAScript 5
// 中，prototype 属性是不可枚举的，因此使用for-in循环不会返回这个属性。
console.log(valueOf in sayName.prototype);
console.log(sayName.prototype.valueOf);

// in是找key
console.log('name' in { name: 'test' });
console.log('test' in { name: 'test' });
console.log(2 in [1, 2, 3]);
console.log(3 in [1, 2, 3]);

// 函数还有两个方法：apply()和 call()。这两个方法都会以指定的 this 值来调用函数，即会设
// 置调用函数时函数体内this对象的值。apply()方法接收两个参数：函数内this的值和一个参数数
// 组。第二个参数可以是Array的实例，但也可以是arguments对象。来看下面的例子：
// apply
function Sum(num1, num2) {
    return num1 + num2;
}
function callSum1(num1, num2) {
    return Sum.apply(this, arguments); // 传入 arguments 对象 
}
function callSum2(num1, num2) {
    return Sum.apply(this, [num1, num2]); // 传入数组 
}
console.log(callSum1(10, 10));  // 20 
console.log(callSum2(10, 10));  // 20 

// call()
function callSum(num1, num2) {
    return Sum.call(this, num1, num2);
}
console.log(callSum(10, 10)); // 20
// 在严格模式下，调用函数时如果没有指定上下文对象，则this值不会指向window。
// 除非使用apply()或call()把函数指定给一个对象，否则this的值会变成undefined。


// ECMAScript 5 出于同样的目的定义了一个新方法：bind()。bind()方法会创建一个新的函数实例，
// 其this 值会被绑定到传给bind()的对象。比如： 
// window.color = 'red';
// var o = {
//     color: 'blue'
// };
// function sayColor() {
//     console.log(this.color);
// }
// let objectSayColor = sayColor.bind(o);
// objectSayColor();  // blue 

// 理解函数声明与函数表达式之间的区别，关键是理解提升。比如，以下代码的执行结果可能会出乎
// 意料： 
// 千万别这样做！ 
// if (condition) {
//     function sayHi() {
//         console.log('Hi!');
//     }
// } else {
//     function sayHi() {
//         console.log('Yo!');
//     }
// }
// 这段代码看起来很正常，就是如果condition 为true，则使用第一个sayHi()定义；否则，就
// 使用第二个。事实上，这种写法在ECAMScript中不是有效的语法。JavaScript引擎会尝试将其纠正为适
// 当的声明。问题在于浏览器纠正这个问题的方式并不一致。多数浏览器会忽略condition直接返回第
// 二个声明。Firefox会在condition 为true 时返回第一个声明。这种写法很危险，不要使用。不过，
// 如果把上面的函数声明换成函数表达式就没问题了：
// 没问题  
let condition;
let sayHi1;
if (condition) {
    sayHi1 = function () {
        console.log("Hi!");
    };
} else {
    sayHi1 = function () {
        console.log("Yo!");
    };
}

// 递归，回到上面那个阶乘的例子，"use strict"下不能使用arguments.callee那应该如何
// 实现类似目的？
// 像这里加粗的这一行一样，把函数名称替换成 arguments.callee，可以确保无论通过什么变量
// 调用这个函数都不会出问题。因此在编写递归函数时，arguments.callee是引用当前函数的首选。 
// 不过，在严格模式下运行的代码是不能访问arguments.callee 的，因为访问会出错。此时，可
// 以使用命名函数表达式（named function expression）达到目的。比如：
const fct = (function f(num) {
    if (num <= 1) {
        return 1;
    } else {
        return num * f(num - 1);
    }
});

console.log(fct(5));

// 尾调用优化
// ECMAScript 6规范新增了一项内存管理优化机制，让JavaScript引擎在满足条件时可以重用栈帧。
// 具体来说，这项优化非常适合“尾调用”，即外部函数的返回值是一个内部函数的返回值。比如： 
// function outerFunction() { 
//   return innerFunction(); // 尾调用 
// }  
// 在ES6优化之前，执行这个例子会在内存中发生如下操作。 
// (1) 执行到 outerFunction 函数体，第一个栈帧被推到栈上。 
// (2) 执行 outerFunction 函数体，到return 语句。计算返回值必须先计算innerFunction。 
// (3) 执行到innerFunction 函数体，第二个栈帧被推到栈上。 
// (4) 执行 innerFunction 函数体，计算其返回值。 
// (5) 将返回值传回outerFunction，然后outerFunction 再返回值。 
// (6) 将栈帧弹出栈外。 
// 在ES6优化之后，执行这个例子会在内存中发生如下操作。 
// (1) 执行到 outerFunction 函数体，第一个栈帧被推到栈上。 
// (2) 执行 outerFunction 函数体，到达return 语句。为求值返回语句，必须先求值innerFunction。 
// (3) 引擎发现把第一个栈帧弹出栈外也没问题，因为innerFunction的返回值也是outerFunction
// 的返回值。 
// (4) 弹出 outerFunction 的栈帧。 
// (5) 执行到 innerFunction 函数体，栈帧被推到栈上。 
// (6) 执行 innerFunction 函数体，计算其返回值。 
// (7) 将 innerFunction 的栈帧弹出栈外。 
// 很明显，第一种情况下每多调用一次嵌套函数，就会多增加一个栈帧。而第二种情况下无论调用多
// 少次嵌套函数，都只有一个栈帧。这就是ES6尾调用优化的关键：如果函数的逻辑允许基于尾调用将其
// 销毁，则引擎就会那么做。

// 尾调用优化的条件就是确定外部栈帧真的没有必要存在了。涉及的条件如下： 
//  代码在严格模式下执行； 
//  外部函数的返回值是对尾调用函数的调用；
//  尾调用函数返回后不需要执行额外的逻辑； 
//  尾调用函数不是引用外部函数作用域中自由变量的闭包。 
// 下面展示了几个违反上述条件的函数，因此都不符合尾调用优化的要求：

"use strict";
// 无优化：尾调用没有返回  
function outerFunction() {
    innerFunction();
}
// 无优化：尾调用没有直接返回 
function outerFunction() {
    let innerFunctionResult = innerFunction();
    return innerFunctionResult;
}
// 无优化：尾调用返回后必须转型为字符串 
function outerFunction() {
    return innerFunction().toString();
}
// 无优化：尾调用是一个闭包 
function outerFunction() {
    let foo = 'bar';
    function innerFunction() { return foo; }
    return innerFunction();
}
// 下面是几个符合尾调用优化条件的例子：
"use strict";
// 有优化：栈帧销毁前执行参数计算 
function outerFunction(a, b) {
    return innerFunction(a + b);
}
// 有优化：初始返回值不涉及栈帧 
function outerFunction(a, b) {
    if (a < b) {
        return a;
    }
    return innerFunction(a + b);
}
// 有优化：两个内部函数都在尾部 
function outerFunction(condition) {
    return condition ? innerFunctionA() : innerFunctionB();
}


// 之所以要求严格模式，主要因为在非严格模式下函数调用中允许使用 f.arguments
// 和f.caller，而它们都会引用外部函数的栈帧。显然，这意味着不能应用优化了。因此
// 尾调用优化要求必须在严格模式下有效，以防止引用这些属性。

// 尾调用优化的代码，如何优化fib()?
// function fib(n) {
//     if (n < 2) {
//         return n;
//     }

//     return fib(n - 1) + fib(n - 2);
// }
// console.log(fib(1000));
// 不符合尾调用优化，因为有相加操作
"use strict";
function fib(n) {
    return fibImpl(0, 1, n);
}

function fibImpl(a, b, n) {
    if (n === 0) {
        return a;
    }
    return fibImpl(b, a + b, n - 1);
}

console.log(fib(1000));

// 闭包
// 闭包指的是那些引用了另一个函数作用域中变量的函数，通常是在嵌套函数中实现的。
// 另一个有意思的副作用就是，createComparisonFunction()的
// 活动对象并不能在它执行完毕后销毁，因为匿名函数的作用域链中仍然有对它的引用。在 create- 
// ComparisonFunction()执行完毕后，其执行上下文的作用域链会销毁，但它的活动对象仍然会保留
// 在内存中，直到匿名函数被销毁后才会被销毁

// 闭包中的this
// window.identity = 'The window';

// object = {
//     identity: 'The object',
//     getIdentityFunc() {
//         return function () {
//             return this.identity;
//         };
//     }
// };

// console.log(object.getIdentityFunc()());	//The window

object = {
    identity: 'The object',
    getIdentityFunc() {
        let that = this;
        return function () {
            return that.identity;
        };
    }
};

console.log(object.getIdentityFunc()());	// The object

// this和arguments都不能直接从内部函数中访问，如果要在闭包中使用
// 必须先将它们保存到闭包能够访问的另一个变量中

object = {
    identity: 'The object',
    getIdentity() {
        return this.identity;
    }
};

console.log();
console.log(object.getIdentity());
console.log((object.getIdentity)());
console.log((object.getIdentity = object.getIdentity)());

// 内存泄露
// function assignHandler() {
//     let element = document.getElementById('someElement');
//     element.onclick = () => console.log(element.id);
// }
// 循环引用，引起内存泄漏，所以需要稍加修改
function assignHandler() {
    let element = document.getElementById('someElement');
    let id = element.id;

    element.onclick = () => console.log(id);

    element = null;
}

// 立即调用的函数表达式
// 立即调用的匿名函数又被称作立即调用的函数表达式（IIFE，Immediately Invoked Function 
// Expression）。它类似于函数声明，但由于被包含在括号中，所以会被解释为函数表达式。紧跟在第一组
// 括号后面的第二组括号会立即调用前面的函数表达式。
(function () {
    console.log('This is an IIFE');
})();

// IIFE
// (function() {
//     for(var i = 0; i < 3; i++) {
//         console.log(i);
//     }
// })();

// console.log(i)

// 私有变量
// 使用function，在其内部创建变量就是‘私有’
function Person(name) {
    this.getName = function () {
        return name;
    };

    this.setName = function (value) {
        name = value;
    };
}

let person = new Person('Nicholas');
console.log(person.name);// undefined
console.log(person.getName());
person.setName('Greg');
console.log(person.getName());

// 静态私有变量
(function () {
    let name = '';

    Person = function (value) {
        name = value;
    };

    Person.prototype.getName = function () {
        return name;
    };

    Person.prototype.setName = function (value) {
        name = value;
    };
})();

console.log();
let person1 = new Person('Nicholas');
console.log(person1.getName());
person1.setName('Matt');
console.log(person1.getName());

let person2 = new Person('Michael');
console.log(person1.getName());
console.log(person2.getName());

// 模块模式
let application = function () {
    let components = new Array();

    components.push(1, 2, 3);

    return {
        getComponentCount() {
            return components.length;
        },
        registerComponent(component) {
            if (typeof component == 'object') {
                components.push(component);
            }
        }
    }
}();