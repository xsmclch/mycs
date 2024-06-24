// 创建空代理
let target = {
    id: 'target',
};

let handler = {};

let proxy = new Proxy(target, handler);

console.log(target.id);
console.log(proxy.id);

target.id = 'foo';
console.log(target.id);
console.log(proxy.id);

proxy.id = 'bar';
console.log(target.id);
console.log(proxy.id);

console.log(target.hasOwnProperty('id'));
console.log(proxy.hasOwnProperty('id'));

// 以下报错Proxy.prototype是undefined
// console.log(target instanceof Proxy);
// console.log(proxy instanceof Proxy);

console.log();
console.log(target == proxy);
console.log(target === proxy);

proxy = new Proxy(target, {
    get() {
        return 'handler override';
    }
});
// 这样，当通过代理对象执行 get()操作时，就会触发定义的 get()捕获器。

console.log(target.id, target['id']);
console.log(proxy.id, proxy['id']);

console.log(Object.create(target)['id']);
console.log(Object.create(proxy)['id']);

// 所有捕获器都可以访问相应的参数，基于这些参数可以重建被捕获方法的原始行为。比如，get()
// 捕获器会接收到目标对象、要查询的属性和代理对象三个参数。 
target = {
    foo: 'bar',
};

handler = {
    get(trapTarget, property, receiver) {
        console.log(trapTarget === target);
        console.log(property);
        console.log(receiver === proxy);
        return trapTarget[property];
    }
};

proxy = new Proxy(target, handler);

console.log(proxy.foo); // handler.get is called

// Reflect

handler = {
    get() {
        return Reflect.get(...arguments);
        // 更简洁的写法
        // return Reflect.get;
    }
};

proxy = new Proxy(target, handler);
// 甚至
proxy = new Proxy(target, Reflect);

console.log(proxy.foo);
console.log(target.foo);

// eg
target = {
    foo: 'bar',
    baz: 'qux'
};

handler = {
    get(trapTarget, property, receiver) {
        let decoration = '';
        if (property === 'foo') {
            decoration = '!!!';
        }

        return Reflect.get(...arguments) + decoration;
    }
};

proxy = new Proxy(target, handler);

console.log(proxy.foo);
console.log(target.foo);

console.log(proxy.baz);
console.log(proxy.baz);

// 可撤销代理
console.log('可撤销代理');

target = {
    foo: 'bar'
};

handler = {
    get() {
        return 'intercepted';
    }
}

let revoke;

({ proxy, revoke } = Proxy.revocable(target, handler));

console.log(proxy.foo);
console.log(target.foo);
console.log(Proxy.revocable(target, handler));

revoke();

try {
    console.log(proxy.foo);
} catch (error) {
    console.log('TypeError');
}

// 实用反射API
// 在使用反射API时，要记住： 
// (1) 反射 API并不限于捕获处理程序； 
// (2) 大多数反射API方法在Object类型上有对应的方法。 
// 初始代码
let o = {};

try {
    Object.defineProperty(o, 'foo', 'bar');
    console.log('success');
} catch (e) {
    console.log('failure');
}

// 重构
if (Reflect.defineProperty(o, 'foo', { value: 'bar' })) {
    console.log('success');
} else {
    console.log('failure');
}

// 以下反射方法都会提供状态标记： 
//  Reflect.defineProperty() 
//  Reflect.preventExtensions() 
//  Reflect.setPrototypeOf() 
//  Reflect.set() 
//  Reflect.deleteProperty() 
// 3. 用一等函数替代操作符 
// 以下反射方法提供只有通过操作符才能完成的操作。 
//  Reflect.get()：可以替代对象属性访问操作符。 
//  Reflect.set()：可以替代=赋值操作符。 
//  Reflect.has()：可以替代in操作符或with()。 
//  Reflect.deleteProperty()：可以替代delete 操作符。 
//  Reflect.construct()：可以替代new 操作符。

// 4. 安全地应用函数 
// 在通过apply方法调用函数时，被调用的函数可能也定义了自己的apply属性（虽然可能性极小）。
// 为绕过这个问题，可以使用定义在Function原型上的apply方法，比如： 
// Function.prototype.apply.call(myFunc, thisVal, argumentList); 
// 这种可怕的代码完全可以使用Reflect.apply来避免：
// Reflect.apply(myFunc, thisVal, argumentsList);

// 代理可以拦截反射API的操作，而这意味着完全可以创建一个代理，通过它去代理另一个代理。这
// 样就可以在一个目标对象之上构建多层拦截网： 
console.log();
target = {
    foo: 'bar'
};
const firstProxy = new Proxy(target, {
    get() {
        console.log('first proxy');
        return Reflect.get(...arguments);
    }
});
const secondProxy = new Proxy(firstProxy, {
    get() {
        console.log('second proxy');
        return Reflect.get(...arguments);
    }
});
console.log(secondProxy.foo);
// second proxy
// first proxy
// bar

// 代理的问题与不足
// this
target = {
    thisValEqualsProxy() {
        return this === proxy;
    }
}

proxy = new Proxy(target, {});

console.log(target.thisValEqualsProxy());
console.log(proxy.thisValEqualsProxy());

// 从直觉上讲，这样完全没有问题：调用代理上的任何方法，比如 proxy.outerMethod()，而这个
// 方法进而又会调用另一个方法，如this.innerMethod()，实际上都会调用proxy.innerMethod()。
// 多数情况下，这是符合预期的行为。可是，如果目标对象依赖于对象标识，那就可能碰到意料之外的
// 问题。
// 还记得第6章中通过WeakMap保存私有变量的例子吧，以下是它的简化版：
const wm = new WeakMap();

class User {
    constructor(userId) {
        wm.set(this, userId);
    }

    set id(userId) {
        wm.set(this, userId);
    }

    get id() {
        return wm.get(this);
    }
}

const user = new User(123);
console.log(user.id); // 123

const userInstanceProxy = new Proxy(user, {});
console.log(userInstanceProxy.id); // undefined

// 一个典型的例子就是Date类型。根据ECMAScript规范，Date类型方法的执行依赖this值上的
// 内部槽位[[NumberDate]]。代理对象上不存在这个内部槽位，而且这个内部槽位的值也不能通过普通
// 的get()和set()操作访问到，于是代理拦截后本应转发给目标对象的方法会抛出TypeError： 
target = new Date();
proxy = new Proxy(target, {});
console.log(proxy instanceof Date);  // true 
// proxy.getDate();  // TypeError: 'this' is not a Date object

// 代理捕获器与反射方法
// get()捕获器会在获取属性值的操作中被调用。对应的反射API方法为Reflect.get()。
// const myTarget = {};
// const proxy = new Proxy(myTarget, {
//   get(target, property, receiver) {
//     console.log('get()');
//     return Reflect.get(...arguments)
//   }
// });
// proxy.foo;
// // get()

// set()捕获器会在设置属性值的操作中被调用。对应的反射API方法为Reflect.set()。
// const myTarget = {};
// const proxy = new Proxy(myTarget, {
//   set(target, property, value, receiver) {
//     console.log('set()');
//     return Reflect.set(...arguments)
//   }
// });
// proxy.foo = 'bar';
// // set()

// has()捕获器会在in操作符中被调用。对应的反射API方法为Reflect.has()。
// const myTarget = {};
// const proxy = new Proxy(myTarget, {
//   has(target, property) {
//     console.log('has()');
//     return Reflect.has(...arguments)
//   }
// });
// 'foo' in proxy;
// // has()

// defineProperty()捕获器会在 Object.defineProperty()中被调用。对应的反射 API 方法为
// Reflect.defineProperty()。
// const myTarget = {};
// const proxy = new Proxy(myTarget, {
//   defineProperty(target, property, descriptor) {
//     console.log('defineProperty()');
//     return Reflect.defineProperty(...arguments)
//   }
// });
// Object.defineProperty(proxy, 'foo', { value: 'bar' });
// // defineProperty()

// getOwnPropertyDescriptor()
// getOwnPropertyDescriptor()捕获器会在 Object.getOwnPropertyDescriptor()中被调
// 用。对应的反射API方法为Reflect.getOwnPropertyDescriptor()。
// const myTarget = {};
// const proxy = new Proxy(myTarget, {
//   getOwnPropertyDescriptor(target, property) {
//     console.log('getOwnPropertyDescriptor()');
//     return Reflect.getOwnPropertyDescriptor(...arguments)
//   }
// });
// Object.getOwnPropertyDescriptor(proxy, 'foo');
// // getOwnPropertyDescriptor()

// deleteProperty()捕获器会在 delete 操作符中被调用。对应的反射 API 方法为 Reflect.
// deleteProperty()。
// const myTarget = {};
// const proxy = new Proxy(myTarget, {
//   deleteProperty(target, property) {
//     console.log('deleteProperty()');
//     return Reflect.deleteProperty(...arguments)
//   }
// });
// delete proxy.foo
// // deleteProperty()

// ownKeys()捕获器会在 Object.keys()及类似方法中被调用。对应的反射 API方法为Reflect.
// ownKeys()。
// const myTarget = {};
// const proxy = new Proxy(myTarget, {
//   ownKeys(target) {
//     console.log('ownKeys()');
//     return Reflect.ownKeys(...arguments)
//   }
// });
// Object.keys(proxy);
// // ownKeys()

// getPrototypeOf()捕获器会在 Object.getPrototypeOf()中被调用。对应的反射 API 方法为
// Reflect.getPrototypeOf()。
// const myTarget = {};
// const proxy = new Proxy(myTarget, {
//   getPrototypeOf(target) {
//     console.log('getPrototypeOf()');
//     return Reflect.getPrototypeOf(...arguments)
//   }
// });
// Object.getPrototypeOf(proxy);
// // getPrototypeOf()

// setPrototypeOf()捕获器会在 Object.setPrototypeOf()中被调用。对应的反射 API 方法为
// Reflect.setPrototypeOf()。
// const myTarget = {};
// const proxy = new Proxy(myTarget, {
//   setPrototypeOf(target, prototype) {
//     console.log('setPrototypeOf()');
//     return Reflect.setPrototypeOf(...arguments)
//   }
// });
// Object.setPrototypeOf(proxy, Object);
// // setPrototypeOf()

// isExtensible()捕获器会在 Object.isExtensible()中被调用。对应的反射 API 方法为
// Reflect.isExtensible()。
// const myTarget = {};
// const proxy = new Proxy(myTarget, {
//   isExtensible(target) {
//     console.log('isExtensible()');
// 图灵社区会员 aSINKz(1561821892@qq.com) 专享 尊重版权
// 9.2 代理捕获器与反射方法  281
//     return Reflect.isExtensible(...arguments)
//   }
// });
// Object.isExtensible(proxy);
// // isExtensible()

// preventExtensions()捕获器会在 Object.preventExtensions()中被调用。对应的反射 API
// 方法为Reflect.preventExtensions()。
// const myTarget = {};
// const proxy = new Proxy(myTarget, {
//   preventExtensions(target) {
//     console.log('preventExtensions()');
//     return Reflect.preventExtensions(...arguments)
//   }
// });
// Object.preventExtensions(proxy);
// // preventExtensions()

// apply()捕获器会在调用函数时中被调用。对应的反射API方法为Reflect.apply()。
// const myTarget = () => {};
// const proxy = new Proxy(myTarget, {
//   apply(target, thisArg, ...argumentsList) {
//     console.log('apply()');
//     return Reflect.apply(...arguments)
//   }
// });
// proxy();
// // apply()

// construct()捕获器会在new 操作符中被调用。对应的反射API方法为Reflect.construct()。
// const myTarget = function() {};
// const proxy = new Proxy(myTarget, {
//   construct(target, argumentsList, newTarget) {
//     console.log('construct()');
//     return Reflect.construct(...arguments)
//   }
// });
// new proxy;
// // construct() 

// 代理模式
// 跟踪属性访问

let waifu = {
    name: 'Kisara'
};

proxy = new Proxy(waifu, {
    get(target, property, receiver) {
        console.log(`Getting ${property}`);

        return Reflect.get(...arguments);
    },

    set(target, property, value, receiver) {
        if (!Reflect.hasOwnProperty(property)) {
            console.log(`There is no such key: ${property}`);

            return
        }
        console.log(`Setting ${property} = ${value}`);

        return Reflect.set(...arguments);
    }
});

proxy.name;
proxy.age = 17;

// 隐藏属性
let hiddenProperties = ['foo', 'bar'];
let targetObject = {
    foo: 1,
    bar: 2,
    baz: 3
};
proxy = new Proxy(targetObject, {
    get(target, property) {
        if (hiddenProperties.includes(property)) {
            return undefined;
        } else {
            return Reflect.get(...arguments);
        }
    },
    has(target, property) {
        if (hiddenProperties.includes(property)) {
            return false;
        } else {
            return Reflect.has(...arguments);
        }
    }
});

// get()
console.log(proxy.foo);
console.log(proxy.bar);
console.log(proxy.baz);

// has()
console.log('foo' in proxy);
console.log('bar' in proxy);
console.log('baz' in proxy);

target = {
    onlyNumberGoHere: 0
};

proxy = new Proxy(target, {
    set(target, property, value) {
        if (typeof value !== 'number') {
            // 'number'? typeof (typeof 1) == string!
            return false;
        } else {
            return Reflect.set(...arguments);
        }
    }
});

proxy.onlyNumberGoHere = 1;
console.log(proxy.onlyNumberGoHere);
proxy.onlyNumberGoHere = '2';
console.log(proxy.onlyNumberGoHere);

// 函数与构造函数参数验证
function median(...nums) {
    return nums.sort()[Math.floor(nums.length / 2)];
}

proxy = new Proxy(median, {
    apply(target, thisArg, argumentsList) {
        for (const arg of argumentsList) {
            if (typeof arg !== 'number') {
                throw 'Non-number argument provided';
            }
        }
        return Reflect.apply(...arguments);
    }
});

console.log(proxy(4, 7, 1));
// console.log(proxy(4, '7', 1));
console.log([4, '7', 1, '4'].sort())

// 函数与构造函数参数验证
class Waifu {
    constructor(name) {
        this.name_ = name;
    }
}

proxy = new Proxy(Waifu, {
    construct(target, argumentsList, newTarget) {
        if (argumentsList[0] === undefined) {
            throw 'Waifu cannot be instantiated without name';
        } else {
            return Reflect.construct(...arguments);
        }
    }
});

new proxy('Kisara');

// new proxy();

// 数据绑定与可观察对象
const userList = [];

User = class {
    constructor(name) {
        this.name_ = name;
    }
}

proxy = new Proxy(User, {
    construct() {
        const newUser = Reflect.construct(...arguments);
        userList.push(newUser);
        return newUser;
    }
});

new proxy('John');
new proxy('Jacob');
new proxy('Jingleheimerschmidt');

console.log(userList);

function emit(newValue) {
    console.log(newValue);
}

proxy = new Proxy(userList, {
    set(target, property, value, receiver) {
        const result = Reflect.set(...arguments);
        if (result) {
            emit(Reflect.get(target, property, receiver));
        }
        return result;
    }
});

proxy.push('John');
proxy.push('Jacob');