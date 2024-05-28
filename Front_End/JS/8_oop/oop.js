// 对象

// let person = new Object();
// person.name = 'Nicholas';
// person.age = 29;
// person.job = 'Software Engineer';
// person.sayName = function() {
//     console.log(this.name);
// };

let person = {
    name: 'Nicholas',
    age: 29,
    job: 'Software Engineer',
    sayName() {
        console.log(this.name);
    }
};
person.sayName();

// 属性的类型
// 数据属性
person = {};
Object.defineProperty(person, 'name', {
    writable: false,
    value: 'Nicholas'
});
console.log(person.name);
person.name = 'Greg';
console.log(person.name);

Object.defineProperty(person, 'age', {

});
console.log(person.name, person.age)

person = {};
Object.defineProperty(person, 'name', {
    configurable: false,
    value: 'Nicholas'
})

console.log(person, person.name);

try {
    Object.defineProperty(person, 'name', {
        configurable: true,
        value: 'Nicholas'
    })
} catch (e) {
    console.log('configurable: false')
}
// 访问器属性
let book = {
    year_: 2017,
    edition: 1,
};

console.log(book);

Object.defineProperty(book, 'year', {
    get() {
        return this.year_;
    },
    set(newValue) {
        if (newValue > 2017) {
            this.year_ = newValue;
            this.edition += newValue - 2017;
        }
    }
});

book.year = 2018;
console.log(book)

// 定义多个属性
book = {};
Object.defineProperties(book, {
    year_: {
        value: 2017,
        writable: true // 默认是false的
    },
    edition: {
        value: 1,
        // writable: true
        // 默认唯一的区别是所有属性都是同时定义的，并且数据属性的
        // configurable、enumerable 和 writable 特性值都是false。
    },
    year: {
        get() {
            return this.year_;
        },
        set(newValue) {
            if (newValue > 2017) {
                this.year_ = newValue;
                this.edition += newValue - 2017;
            }
        }
    }
});

console.log(book);
console.log(book.year, book.edition);
book.year = 2020;
console.log(book.year, book.edition);

// 读取属性的特性
book = {};
Object.defineProperties(book, {
    year_: {
        value: 2017
    },
    edition: {
        value: 1
    },
    year: {
        get: function () {
            return this.year_;
        },
        set: function (newValue) {
            if (newValue > 2017) {
                this.year_ = newValue;
                this.edition += newValue - 2017;
            }
        }
    }
});

let descriptor = Object.getOwnPropertyDescriptor(book, "year_");
console.log(descriptor.value);          // 2017 
console.log(descriptor.configurable);   // false 
console.log(typeof descriptor.get);     // "undefined" 
descriptor = Object.getOwnPropertyDescriptor(book, "year");
console.log(descriptor.value);          // undefined 
console.log(descriptor.enumerable);     // false 
console.log(typeof descriptor.get);     // "function" 

console.log(Object.getOwnPropertyDescriptors(book));

// 合并对象
// ECMAScript 6 专门为合并对象提供了Object.assign()方法。这个方法接收一个目标对象和一个
// 或多个源对象作为参数，然后将每个源对象中可枚举（Object.propertyIsEnumerable()返回true）
// 和自有（Object.hasOwnProperty()返回 true）属性复制到目标对象。以字符串和符号为键的属性
// 会被复制。对每个符合条件的属性，这个方法会使用源对象上的[[Get]]取得属性的值，然后使用目标
// 对象上的[[Set]]设置属性的值。
let dest, src, result;

dest = { test: 1 };
src = {
    id: Symbol('src'),
    test: 2
};

result = Object.assign(dest, src);

console.log(result, '\n', dest, '\n', src);
console.log(dest === result);
console.log(dest !== src);

dest = {};

result = Object.assign(dest, { a: 'foo' }, { b: 'bar' });

console.log(result);

dest = {
    set a(val) {
        console.log(`Invoked dest setter with param ${val}`);
    }
};

src = {
    get a() {
        console.log('Invoked src getter');
        return 'foo';
    }
};

Object.assign(dest, src);
console.log(dest);

// Object.assign()实际上对每个源对象执行的是浅复制。如果多个源对象都有相同的属性，则使
// 用最后一个复制的值。此外，从源对象访问器属性取得的值，比如获取函数，会作为一个静态值赋给目
// 标对象。换句话说，不能在两个对象间转移获取函数和设置函数。

dest = src = result = {};
console.log(dest, src, result);

dest = { id: 'dest' };

result = Object.assign(dest, { id: 'src1', a: 'foo' }, { id: 'src2', b: 'bar' })

console.log(result);

// 对象引用
dest = {};
src = { a: {} };

Object.assign(dest, src);

console.log(dest);
console.log(dest.a === src.a);

// 如果赋值期间出错，则操作会中止并退出，同时抛出错误。Object.assign()没有“回滚”之前
// 赋值的概念，因此它是一个尽力而为、可能只会完成部分复制的方法。 
dest = src = result = {};
/**  
 * 错误处理 
 */
src = {
    a: 'foo',
    get b() {
        throw new Error();
    },
    c: 'bar'
};
try {
    Object.assign(dest, src);
} catch (e) { }

console.log(dest);
// Object.assign()没办法回滚已经完成的修改 
// 因此在抛出错误之前，目标对象上已经完成的修改会继续存在： 

// 对象标识及相等判定
console.log(true === 1);
// console.log({} === {}); // false
console.log('2' === 2);

console.log(+0 === -0);
console.log(+0 === 0);
console.log(-0 === 0);

console.log(NaN === NaN);
console.log(isNaN(NaN));

// 为改善这类情况，ECMAScript 6规范新增了 Object.is()，这个方法与===很像，但同时也考虑
// 到了上述边界情形。这个方法必须接收两个参数：
console.log(Object.is(true, 1));
console.log(Object.is({}, {}));
console.log(Object.is('2', 2));

// 正确的NaN相等判定
console.log(Object.is(NaN, NaN));

function recursivelyCheckEqual(x, ...rest) {
    return Object.is(x, rest[0]) &&
        (rest.length < 2 || recursivelyCheckEqual(...rest));
}

console.log(recursivelyCheckEqual(1, ...[1, 1, 1, 1, 1]));

// 增强的对象语法
// 属性值简写
// let name = 'kisara';
// let age = 17

// person = {
//     name,
//     age
// };

// console.log(person) // { name: 'kisara', age: 17 }

function makePerson(a) {
    return {
        name: a
    };
}

person = makePerson('kisara');

console.log(person.name);

// 可计算属性
const nameKey = 'name';
const ageKey = 'age';
const jobKey = 'job';

person = {};
person[nameKey] = 'kisara';
person.ageKey = 17;
person[ageKey] = 17;
person[jobKey] = 'myWaifu';

console.log(person);

// 可计算属性表达式中抛出任何错误都会中断对象创建。如果计算属性的表达式有副
// 作用，那就要小心了，因为如果表达式抛出错误，那么之前完成的计算是不能回滚的。

// person = {
//     sayName: function(name) {
//         console.log(`My name is ${name}`);
//     }
// };

person = {
    sayName(name) {
        if (name) { console.log(`My name is ${name}`); }
        else { console.log(`My name is ${this.name}`); }
    }
};

person.sayName('Kisara');

Object.defineProperties(person, {
    name_: {
        value: '',
        writable: true,
    },
    get name() {
        return this.name_;
    },
    set name(name) {
        this.name_ = name;
    },
    sayName() {
        console.log(`My name is ${this.name_}`);
    }
});

person.name = 'Kisara';
person.sayName();

console.log()

person = {};
person = {
    name_: '',
    get name() {
        return this.name_;
    },
    set name(name) {
        this.name_ = name;
    },
    sayName() {
        console.log(`My name is ${this.name_}`);
    }
};

person.name = 'kisara';
person.sayName();

const methodKey = 'repeatName';

person[methodKey] = function (name) {
    console.log(`name: ${this.name_}`);
}


person.repeatName('kisara');
console.log(person);

// 对象解构
// 不使用对象解构
person = {
    name: 'kisara',
    age: 17
};

let person_Name = person.name,
    person_Age = person.age;

console.log(person_Name, person_Age);

// 使用对象解构
let { name: personName, age: personAge } = person;

console.log(personName, personAge);

let { name, age } = person;
console.log(name, age);

// 嵌套解构
person = {
    name: 'kisara',
    age: 27,
    job: {
        title: 'Software engineer'
    }
};
let personCopy = {};

({
    name: personCopy.name,
    age: personCopy.age,
    job: personCopy.job
} = person);

// job 复制的是引用，浅复制
person.job.title = 'Hacker';

console.log(person);
console.log(personCopy);


// 声明title 变量并将person.job.title 的值赋给它 
let { job: { title } } = person;
console.log(title); // Hacker
person.job.title = 'Software engineer';
console.log(title); // Hacker

function printPerson(foo, { name, age }, bar) {
    console.log(arguments);
    console.log(name, age);
}

printPerson('1st', person, '2nd');

// 8.2创建对象
// 工厂模式
function createPerson(name, age, job) {
    let o = new Object();
    o.name = name;
    o.age = age;
    o.job = job;
    o.sayName = function () {
        console.log(this.name);
    };
    return o;
}

// 这种工厂模式虽
// 然可以解决创建多个类似对象的问题，但没有解决对象标识问题（即新创建的对象是什么类型）。 

// 构造函数模式
function Person(name = 'kisara', age, job) {
    this.name = name;
    this.age = age;
    this.job = job;
    this.sayName = function () {
        console.log(this.name);
    };
}
let person1 = new Person("Nicholas", 29, "Software Engineer");
let person2 = new Person("Greg", 27, "Doctor");
person1.sayName();  // Nicholas 
person2.sayName();  // Greg 

console.log(person1.constructor == Person);
console.log(person2.constructor == Person);

console.log(person1 instanceof Object, person1 instanceof Person);
console.log(person2 instanceof Object, person2 instanceof Person);

// 原型模式
let Person1 = function () { }

console.log(typeof Person1.prototype);
console.log(Person1.prototype);
console.log(Person1.prototype.constructor === Person1); // true 

console.log(Person1.prototype.__proto__ === Object.prototype);   // true 
console.log(Person1.prototype.__proto__.constructor === Object); // true 
console.log(Person1.prototype.__proto__.__proto__ === null);     // true 

console.log(Person1.prototype.__proto__);

person1 = new Person('kisara');
console.log(person1);
console.log(Object.getPrototypeOf(person1) == Person.prototype);
console.log(Object.getPrototypeOf(person1).name);

// Object.create()]
let biped = {
    numLegs: 2
};
person = Object.create(biped);
person.name = 'kisara';

console.log(person.name);
console.log(person.numLegs);
console.log(Object.getPrototypeOf(person) === biped);

// 层级原型
console.log(Person)
Person.prototype.name = 'Kisara';
Person.prototype.age = 17;
Person.prototype.job = 'MyWaifu';
Person.prototype.sayName = function () {
    console.log(this.name);
};

person1 = new Person();
person2 = new Person();

console.log(Person)
console.log(Person.prototype);

person1.name = 'Emilia';
console.log(person1.name); // 'Emilia'来自原型
console.log(person2.name); // 'kisaral'来自原型

// 只要给对象实例添加一个属性，这个属性就会遮蔽（shadow）原型对象上的同名属性，也就是虽然
// 不会修改它，但会屏蔽对它的访问。即使在实例上把这个属性设置为 null，也不会恢复它和原型的联
// 系。不过，使用delete操作符可以完全删除实例上的这个属性，从而让标识符解析过程能够继续搜索
// 原型对象。 

console.log('Before deleting person1.name\n', person1.name);
person1.name = null;
console.log(`person1.name = null, than
person1.name = ${person1.name}`);
delete person1.name;
console.log('After deleting person1.name\n', person1.name);

// hasOwnProperty()方法用于确定某个属性是在实例上还是在原型对象上。这个方法是继承自Object
// 的，会在属性存在于调用它的对象实例上时返回true，如下面的例子所示： 
function Waifu() { }

Waifu.prototype = {
    name: 'kisara',
    age: '17',
    sayName: function () {
        console.log(this.name);
    }
};

let waifu1 = new Waifu();
let waifu2 = new Waifu();
console.log(waifu1.hasOwnProperty('name'));

waifu1.name = 'tsino'
console.log(waifu1.name);
console.log(waifu1.hasOwnProperty('name'));

console.log(waifu2.name);
console.log(waifu1.hasOwnProperty('name'));

delete waifu1.name;
console.log(waifu1.name);
console.log(waifu1.hasOwnProperty('name'));

// 原型和in操作符
console.log(waifu1.hasOwnProperty('name'));
console.log('name' in waifu1);

console.log('name' in waifu2);

// 属性枚举顺序
let k1 = Symbol('k1'),
    k2 = Symbol('k2');

let o = {
    1: 1,
    first: 'first',
    [k1]: 'sym2',
    second: 'second',
    0: 0
};

o[k2] = 'sym2';
o[3] = 3;
o.third = 'third';
o[2] = 2;

console.log(Object.getOwnPropertyNames(o));

console.log(Object.getOwnPropertySymbols(o));

// 对象迭代

o = {
    foo: 'bar',
    baz: 1,
    qux: {},
    test: 'test'
};

delete o.test;
console.log(o);

console.log(Object.values(o));
// let map = new Map(Object.entries(o));
console.log(Object.entries(o));

console.log(Object.values(o)[2] === o.qux);
console.log(Object.entries(o)[2][1] === o.qux);

// 符号属性会被省略
const sym = Symbol();
o[sym] = 'foo';
console.log(Object.values(o));
console.log(Object.entries(o));

// function Waifu() { }

// Waifu.prototype = {
//     name: 'kisara',
//     age: '17',
//     sayName: function () {
//         console.log(this.name);
//     }
// };

let wf = new Waifu();

console.log(waifu1 instanceof Object);
console.log(waifu1 instanceof Waifu);

console.log(waifu1.constructor == Waifu);   // false
console.log(waifu1.constructor == Object);  // true

console.log("----------------------");

Person = function () { }

Person.prototype.name = 'Nicholas';
Person.prototype.age = 29;
Person.prototype.job = 'Software Engineer';
// Person.prototype.sayName = function() {
//     console.log(this.name);
// };

let friend = new Person();
console.log(friend instanceof Object);      // true 
console.log(friend instanceof Person);      // true 

console.log(friend.constructor == Person);  // true 
console.log(friend.constructor == Object);  // false

console.log("----------------------");

// Waifu.prototype = {
//     constructor: Waifu,
//     name: 'kisara',
//     age: '17',
//     sayName: function () {
//         console.log(this.name);
//     }
// };

// console.log(waifu1.constructor == Waifu);   // true
// console.log(waifu1.constructor == Object);  // false

// 虽然随时能给原型添加属性和方法，并能够立即反映在所有对象实例上，但这跟重写整个原型是两
// 回事。实例的[[Prototype]]指针是在调用构造函数时自动赋值的，这个指针即使把原型修改为不同
// 的对象也不会变。重写整个原型会切断最初原型与构造函数的联系，但实例引用的仍然是最初的原型。
// 记住，实例只有指向原型的指针，没有指向构造函数的指针。

Person.prototype = {
    name: 'Nicholas',
    sayName() {
        console.log(this.name);
    }
}

// friend.sayName(); NO!

// 3. 原生对象原型 
// 原型模式之所以重要，不仅体现在自定义类型上，而且还因为它也是实现所有原生引用类型的模式。
// 所有原生引用类型的构造函数（包括Object、Array、String等）都在原型上定义了实例方法。比如，
// 数组实例的sort()方法就是Array.prototype上定义的，而字符串包装对象的substring()方法也
// 是在String.prototype 上定义的，如下所示： 
console.log(typeof Array.prototype.sort);       // "function" 
console.log(typeof String.prototype.substring); // "function" 
// 通过原生对象的原型可以取得所有默认方法的引用，也可以给原生类型的实例定义新的方法。可以
// 像修改自定义对象原型一样修改原生对象原型，因此随时可以添加方法。比如，下面的代码就给String
// 原始值包装类型的实例添加了一个startsWith()方法： 
String.prototype.startsWith = function (text) {
    return this.indexOf(text) === 0;
};
let msg = "Hello world!";
console.log(msg.startsWith("Hello"));  // true 

// let test = [1, 2, 3];
// console.log(test.shift(), test);
// test.push('test');
// console.log(test);
// console.log(test.shift(), test);
// console.log(test.pop(), test);