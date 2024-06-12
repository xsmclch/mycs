// 继承是面向对象编程中讨论最多的话题。很多面向对象语言都支持两种继承：接口继承和实现继承。
// 前者只继承方法签名，后者继承实际的方法。接口继承在ECMAScript中是不可能的，因为函数没有签
// 名。实现继承是ECMAScript唯一支持的继承方式，而这主要是通过原型链实现的。

// 原型链
function SuperType() {
    this.property = true;
    this.ppt = 'super';
}

SuperType.prototype.getSuperValue = function () {
    return this.property;
};

SuperType.prototype.getppt = function () {
    return this.ppt;
};

function SubType() {
    this.subproperty = false;
    this.ppt = 'sub';
}

SubType.prototype = new SuperType();

SubType.prototype.getSubValue = function () {
    return this.subproperty;
};

let instance = new SubType();
console.log(instance.getSubValue());
console.log(instance.getSuperValue());
console.log(instance.getppt());

// 2. 原型与继承关系 
// 原型与实例的关系可以通过两种方式来确定。第一种方式是使用instanceof操作符，如果一个实
// 例的原型链中出现过相应的构造函数，则instanceof返回true。如下例所示： 
console.log(instance instanceof Object);     // true 
console.log(instance instanceof SuperType);  // true 
console.log(instance instanceof SubType);    // true 
// 从技术上讲，instance 是Object、SuperType 和SubType 的实例，因为instance 的原型链
// 中包含这些构造函数的原型。结果就是instanceof对所有这些构造函数都返回true。 

// 确定这种关系的第二种方式是使用isPrototypeOf()方法。原型链中的每个原型都可以调用这个
// 方法，如下例所示，只要原型链中包含这个原型，这个方法就返回true： 
console.log(Object.prototype.isPrototypeOf(instance));     // true 
console.log(SuperType.prototype.isPrototypeOf(instance));  // true 
console.log(SubType.prototype.isPrototypeOf(instance));    // true 

// 原型链问题
function st() {
    this.colors = ['red', 'blue', 'green'];
}

function sbt1() { }

// 继承st
sbt1.prototype = new st();

let instance1 = new sbt1();
instance1.colors.push('black');
console.log(instance1.colors);

// colors是共享的，通过一个修改另一个也会被改
let instance2 = new sbt1();
console.log(instance2.colors);

console.log(sbt1.prototype instanceof st);

// 盗用构造函数
function sbt2() {
    // 继承st
    st.call(this);
}

instance1 = new sbt2();
instance1.colors.push('black');
console.log(instance1.colors);

instance2 = new sbt2();
console.log(instance2.colors);

console.log(sbt2);
console.log(typeof sbt2, sbt2.prototype instanceof st)

// 传递参数
function ST(name) {
    this.name = name;
}

function SbT() {
    // 继承ST并传参
    ST.call(this, 'kisara');

    // 实例属性
    this.age = 17;
}

instance = new SbT();
console.log(instance.name, instance.age);

// 组合继承
// 组合继承（有时候也叫伪经典继承）综合了原型链和盗用构造函数，将两者的优点集中了起来。基
// 本的思路是使用原型链继承原型上的属性和方法，而通过盗用构造函数继承实例属性。这样既可以把方
// 法定义在原型上以实现重用，又可以让每个实例都有自己的属性。来看下面的例子： 
function ST1(name) {
    this.name = name;
    this.colors = ['red', 'blue', 'green'];
}

ST1.prototype.sayName = function () {
    console.log(this.name);
};

function SbT1(name, age) {
    // 继承属性
    ST1.call(this, name);

    this.age = age;
}

// 继承方法
SbT1.prototype = new ST1();

SbT1.prototype.sayAge = function () {
    console.log(this.age);
};

instance1 = new SbT1('kisara', 16);
instance1.colors.push('black');
console.log(instance1.colors);
instance1.sayName();
instance1.sayAge();

instance2 = new SbT1('emilia', 17);
console.log(instance2.colors);
instance2.sayName();
instance2.sayAge();

// 原型式继承
function obj(o) {
    function F() { }
    F.prototype = o;
    return new F();
}

let person = {
    name: 'Nicholas',
    friends: ['Shelby', 'Court', 'Van']
};

let anotherPerson = obj(person);
anotherPerson.name = 'Greg';
anotherPerson.friends.push('Rob');

let yetAnotherPerson = obj(person);
yetAnotherPerson.name = 'Linda';
yetAnotherPerson.friends.push('Barbie');

console.log(person.friends);

person = {
    name: 'Nicholas',
    friends: ['Shelby', 'Court', 'Van']
};

anotherPerson = Object.create(person);
anotherPerson.name = 'Greg';
anotherPerson.friends.push('Rob');

yetAnotherPerson = Object.create(person);
yetAnotherPerson.name = 'Linda';
yetAnotherPerson.friends.push('Barbie');

console.log(person.friends);
console.log(person, anotherPerson, yetAnotherPerson);

// let anotherPerson = Object.create(person, {
//     name: {
//         value: 'Greg'
//     }
// });
// console.log(anotherPerson.name);

// 寄生式继承
function createAnother(original) {
    let clone = obj(original);
    clone.sayHi = function () {
        console.log('hi');
    };
    return clone;
}

person = {
    name: 'Nicholas',
    friends: ['Shelby', 'Court', 'Van']
};

anotherPerson = createAnother(person);
anotherPerson.sayHi();

// 寄生式组合继承

// function SuperType(name) {
//     this.name = name;
//     this.colors = ["red", "blue", "green"];
// }
// SuperType.prototype.sayName = function () {
//     console.log(this.name);
// };
// function SubType(name, age) {
//     SuperType.call(this, name);   // 第二次调用SuperType() 
//     this.age = age;
// }
// SubType.prototype = new SuperType();   // 第一次调用SuperType() 
// SubType.prototype.constructor = SubType;
// SubType.prototype.sayAge = function () {
//     console.log(this.age);
// }; 

function inheritPrototype(subType, superType) {
    let prototype = obj(superType.prototype);
    prototype.constructor = subType;
    subType.prototype = prototype;
}

function spt(name) {
    this.name = name;
    this.colors = ['red', 'blue', 'green'];
}

spt.prototype.sayName = function () {
    console.log(this.name);
};

function sbt(name, age) {
    spt.call(this, name);
    this.age = age;
}

inheritPrototype(sbt, spt);

sbt.prototype.sayAge = function () {
    console.log(this.age);
};