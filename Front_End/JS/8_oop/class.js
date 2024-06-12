// class
// 类声明
// class Person {}

// 类表达式
// const Animal = new class {};

// 与函数表达式类似，类表达式在它们被求值前也不能引用。不过，与函数定义不同的是，虽然函数
// 声明可以提升，但类定义不能：
// console.log(FunctionExpression);   // undefined 
// var FunctionExpression = function () { };
// console.log(FunctionExpression);   // function() {} 

// console.log(FunctionDeclaration);  // FunctionDeclaration() {} 
// function FunctionDeclaration() { }
// console.log(FunctionDeclaration);  // FunctionDeclaration() {} 

// console.log(ClassExpression);      // undefined 
// var ClassExpression = class { };
// console.log(ClassExpression);      // class {} 

// console.log(ClassDeclaration);
// class ClassDeclaration { }
// // ReferenceError: ClassDeclaration is not defined 
// console.log(ClassDeclaration);     // class ClassDeclaration {} 

// 另一个跟函数声明不同的地方是，函数受函数作用域限制，而类受块作用域限制：

// 类的构成

let Person = class PersonName {
    identify() {
        console.log(Person.name, PersonName.name)
    }
}

let p = new Person();

p.identify(); // PersonName PersonName

// 类构造函数

class Animal { }

Person = class {
    constructor() {
        console.log('person ctor');
    }
}

class Vegetable {
    constructor() {
        this.color = 'orange';
    }
}

let a = new Animal();

p = new Person();

let v = new Vegetable();
console.log(v.color);


// constructor 返回其他对象就不会返回this，instanceof返回false

Person = class {
    constructor(override = false) {
        this.foo = 'foo';
        if (override) {
            return {
                bar: 'bar'
            };
        }
    }
}

let p1 = new Person(),
    p2 = new Person(true);

console.log(p1, typeof p1);
console.log(p1 instanceof Person);

console.log(p2, typeof p2);
console.log(p2 instanceof Person);

console.log(typeof Person);
console.log(Person.prototype);

p1 = new Person();

console.log(p1.constructor === Person);
console.log(p1 instanceof Person);
console.log(p1 instanceof Person.constructor);

p2 = new Person.constructor();

console.log(p2.constructor === Person);
console.log(p2 instanceof Person);
console.log(p2 instanceof Person.constructor);

// 原型方法和访问器,静态方法

Person = class {
    constructor(sym) {
        console.log('Person constructor');
        if (sym) {
            console.log('sym is true');
            this.sym_ = Symbol(sym);
        }
    }

    locate() {
        console.log('function locate()', this);
    }

    static locate() {
        console.log('class', this);
    }

    // 静态方法适合作为实例工厂
    static create() {
        return new Person(Math.floor(Math.random() * 100));
    }

    set name(newName) {
        this.name_ = newName;
    }

    get name() {
        return this.name_;
    }

    get sym() {
        return this.sym_;
    }

    test = 'Var test';
}

p = new Person();

p.locate();
Person.prototype.locate();

p.name = 'kisara';
console.log(p.name);

p.locate();
Person.locate();
console.log(p.test, p.sym);

let pt = Person.create();
console.log(pt.sym);

// 类成员
Person = class {
    sayName() {
        // 使用this先从自己实例上找，找不到就会往prototype上找
        console.log(`Using 'this' ${this.greeting} ${this.name}`);
        // 使用Person会调用原型上定义的数据成员
        console.log(`Using 'Person' ${Person.greeting} ${this.name}`);
    }
    greeting = 'My name is';
    name = 'kisara';
}

p = new Person();

// Person.greeting是undefined,其他就是My name is kisara
p.sayName();
p.name = 'Emilia';
console.log();
// p.name被更改为Emilia
p.sayName();

console.log();
// 在Person原型上定义了Person.greeting = 'My dear'但不影响p.greeting
Person.greeting = 'My dear';
// 在Person.prototype中定义了name
Person.prototype.name = 'Kisara_';
// delete掉了在实例p上的name
delete p.name;
// 所以会到prototype上面去找name
p.sayName();

// 检查一下其他实例是否受到影响
console.log('\ncheck pt = new Person()');
pt = new Person();
pt.sayName();
// 显然，没有，但是定义在Person和Person.prototype上面的内容不会变
console.log('\nPerson.greeting and Person.prototype.name are deleted!');
delete Person.greeting;
delete Person.prototype.name;
pt.sayName();
// Person.greeting变回了undefined
delete pt.name;
pt.sayName();
// 这里pt.name也变成了undefined

// 迭代器与生成器

Person = class {
    constructor() {
        this.type = ['Yandere', 'Akuma'];
    }

    // 在原型上定义生成器方法
    *nickNameIt() {
        yield* ['梗小姐', '木更'];
    }

    *jobIt() {
        yield 'Do not call this.jobIt()';
    }

    // 在类上定义生成器方法
    static *jobIt() {
        yield* ['Waifu', 'Maid'];
    }

    // 迭代器
    *[Symbol.iterator]() {
        yield* this.type.entries();
    }
}

let jb = Person.jobIt();
console.log(jb.next().value);
console.log(jb.next().value);

p = new Person();
for (const n of p.nickNameIt()) {
    console.log(n);
}
console.log(p.jobIt().next().value)
for (let [_, type] of p) {
    console.log(type);
}

Person = class {
    constructor() {
        this.nickName = ['Jack', 'Jake', 'J-Dog'];
    }

    // 也可以直接返回迭代器实例
    [Symbol.iterator]() {
        return this.nickName.entries();
    }
}

p = new Person();
for (let [_, nickName] of p) {
    console.log(nickName);
};

// 继承，只要拥有[[Constructor]]和原型的对象都可以被继承
class Vehicle { }

// 继承类
class Bus extends Vehicle { }

let b = new Bus();
console.log(b instanceof Bus);
console.log(b instanceof Vehicle);
console.log(typeof b);

Person = function () { }

// 继承普通构造函数
class Engineer extends Person { };

let e = new Engineer();
console.log(e instanceof Engineer);
console.log(e instanceof Person);

// 构造函数、HomeObject和super()
// super()只能用于派生类中，而且仅限于类构造函数，实例方法和静态方法
// 类构造函数中使用super可以调用父类构造函数

Vehicle = class {
    constructor() {
        this.hasEngine = true;
    }

    test() {
        console.log('Vehicle test');
    }

    static identify() {
        console.log('vehicle');
    }
}

Bus = class extends Vehicle {
    constructor() {
        // 不要在调用super()之前引用this，否则会抛出ReferenceError
        // 只要定义constructor()就必须调用super()
        // 或者,返回一个对象!!!!!!!

        super(); // == super.constructor()

        console.log('this instanceof Vehicle =', this instanceof Vehicle);
        console.log('this =', this)
    }

    test() {
        console.log('Bus test');
    }

    static identify() {
        super.identify();
    }
}

new Bus();
Bus.identify();
v = new Vehicle();
b = new Bus();
v.test();
b.test();

// 返回一个对象
class Van extends Vehicle {
    constructor() {
        return {};
    }
}

console.log();
console.log(new Vehicle());
console.log(new Bus());
console.log(new Van());

// 抽象基类
Vehicle = class {
    constructor() {
        console.log(new.target);
        if (new.target === Vehicle) {
            throw new Error('Vehicle cannot be directly instantiated');
        }
    }
}

try {
    new Vehicle();
} catch { }

Bus = class extends Vehicle { }
console.log(new Bus)

// 继承内置类型
class SuperArray extends Array {
    shuffle() {
        // 洗牌算法
        for (let i = this.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this[i], this[j]] = [this[j], this[i]];
        }
    }
}

a = SuperArray.from([1, 2, 3, 4, 5]);

console.log(a instanceof Array);
console.log(a instanceof SuperArray);
console.log(a);
a.shuffle();
console.log(a);

// 有些内置类型的方法会返回新的实例，默认情况下返回的实例与原始实例的类型是一样的
let a1 = new SuperArray(1, 2, 3, 4, 5);
let a2 = a1.filter(x => !!(x % 2));

console.log(a1, a2);
console.log(a1 instanceof SuperArray);
console.log(a2 instanceof SuperArray);

// 如果想要覆盖这个行为，要修改Symbol.species
SuperArray = class extends Array {
    static get [Symbol.species]() {
        return Array;
    }
}

a1 = new SuperArray(1, 2, 3, 4, 5);
a2 = a1.filter(x => !!(x % 2));

console.log(a1, a2);
console.log(a1 instanceof SuperArray);
console.log(a2 instanceof SuperArray);

// 类混入
// 一个策略是定义一组“可嵌套”的函数，每个函数分别接收一个超类作为参数，而将混入类定义为
// 这个参数的子类，并返回这个类。这些组合函数可以连缀调用，最终组合成超类表达式： 
Vehicle = class { }

let FooMixin = (Superclass) => class extends Superclass {
    foo() {
        console.log('foo');
    }
};

let BarMixin = (Superclass) => class extends Superclass {
    bar() {
        console.log('bar');
    }
};

let BazMixin = (Superclass) => class extends Superclass {
    baz() {
        console.log('baz');
    }
};

Bus = class extends FooMixin(BarMixin(BazMixin(Vehicle))) { };

b = new Bus();
b.foo();
b.bar();
b.baz();

function mix(BaseClass, ...Mixins) {
    return Mixins.reduce((accumulator, current) => current(accumulator), BaseClass);
}

Bus = class extends mix(Vehicle, FooMixin, BarMixin, BazMixin) { }

b = new Bus();
b.foo();
b.bar();
b.baz();
b.baz();

// 复习一下reduce,=>后面第二个参数是初始值!!!
// function test(...arr) {
//     return arr.reduce((accumulator, current) => accumulator + current, 10);
// }

// console.log(test(1, 2, 3, 4, 5));