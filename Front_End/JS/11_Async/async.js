// 3rd of ch11
// 异步函数，也称为“async/await”（语法关键字），是 ES6期约模式在 ECMAScript函数中的应用。
// async/await 是 ES8 规范新增的。这个特性从行为和语法上都增强了 JavaScript，让以同步方式写的代码
// 能够异步执行。下面来看一个最简单的例子，这个期约在超时之后会解决为一个值：

// ES8 async/await

// async
// 使用 async 关键字可以让函数具有异步特征，但总体上其代码仍然是同步求值的。而在参数或闭
// 包方面，异步函数仍然具有普通 JavaScript 函数的正常行为。正如下面的例子所示，foo()函数仍然会
// 在后面的指令之前被求值： 
let foo = async function () {
    console.log(1);
}

foo();
console.log(2);

// 1
// 2

// 不过，异步函数如果使用return关键字返回了值（如果没有return则会返回undefined），这
// 个值会被Promise.resolve()包装成一个期约对象。异步函数始终返回期约对象。在函数外部调用这
// 个函数可以得到它返回的期约：
foo = async function () {
    console.log(1);
    return 3;
}

foo().then(console.log);

console.log(2)

// 1
// 2
// -----同步异步分界线-----
// 3

// 异步函数的返回值期待（但实际上并不要求）一个实现thenable接口的对象，但常规的值也可以。
// 如果返回的是实现thenable接口的对象，则这个对象可以由提供给then()的处理程序“解包”。如果
// 不是，则返回值就被当作已经解决的期约。下面的代码演示了这些情况：
// 返回一个原始值
foo = async function () {
    return 'foo';
}
foo().then(console.log);

// 返回一个没有实现thenable接口的对象
let bar = async function () {
    return ['bar'];
}
bar().then(console.log)

// 返回了一个实现了thenable接口的非期约对象
let baz = async function () {
    const thenable = {
        then(callback) { callback('baz') }
    };
    return thenable;
}
baz().then(console.log);

// 返回一个期约
let qux = async function () {
    return Promise.resolve('qux');
}
qux().then(console.log);

// 在异步函数中抛出错误就会返回拒绝的期约
foo = async function () {
    console.log(1);
    throw 3;
}

// 给返回的期约添加一个拒绝处理程序
foo().catch(console.log);

// 不过，拒绝期约的错误不会被异步函数捕获
// foo = async function() {
//     console.log(1);
//     Promise.reject(3);
// }

// await
// 因为异步函数主要针对不会马上完成的任务，所以自然需要一种暂停和恢复执行的能力。使用await
// 关键字可以暂停异步函数代码的执行，等待期约解决。来看下面这个本章开始就出现过的例子： 
// let p = new Promise((resolve, reject) => setTimeout(resolve, 1000, 3)); 
// p.then((x) => console.log(x)); // 3 

// 使用async/await可以写成这样：
foo = async function () {
    let p = new Promise((resolve, reject) => setTimeout(resolve, 1000, 3));
    console.log(await p);
}

// foo();

// await 关键字的用法与JavaScript的一元操作一样。它可以单独使用，也可以在表达式中使用
// 异步打印'foo'
foo = async function () {
    console.log(await Promise.resolve('await foo-await-Promise'));
}

foo();

// 异步打印'bar'
bar = async function () {
    return await Promise.resolve('await bar-return-await');
}

bar().then(console.log);

// 1000ms后异步打印'baz'
baz = async function () {
    await new Promise((resolve, reject) => setTimeout(resolve, 1000));
    console.log('await baz-Promise-1000ms');
}

baz();

// await关键字期待一个实现thenable接口的对象
// 原始值
foo = async function () {
    console.log(await 'await foo'); // "await" 对此表达式的类型没有影响
}
foo();

// 等待一个没有实现thenable接口的对象
bar = async function () {
    console.log(await ['await - ["bar"]']);
}
bar();

// 等待一个实现了thenable接口的对象
baz = async function () {
    const thenable = {
        then(callback) { callback('await thenable-baz'); }
    };
    console.log(await thenable)
}
baz();

// 等待一个期约
qux = async function () {
    console.log(await Promise.resolve('await Promise-qux'));
}
qux();

// 等待会抛出错误的同步操作，会返回拒绝的期约
foo = async function () {
    console.log(1, 'from await throw');
    await (() => { throw 'await throw - 3'; })();
}

foo().catch(console.log);
console.log(2, 'from await throw');

// 对拒绝期约使用await会释放unwrap错误值，将拒绝期约返回
foo = async function () {
    console.log('B4 await Promsie.reject');
    await Promise.reject('await Promise.rejct 3');
    console.log("This line won't be logged");
}

foo().catch(console.log);
console.log('After await Promsie.rejct');


// await的限制
// 此外，异步函数的特质不会扩展到嵌套函数。因此，await关键字也只能直接出现在异步函数的定
// 义中。在同步函数内部使用await会抛出SyntaxError。 
// 下面展示了一些会出错的例子： 
// 不允许：await 出现在了箭头函数中 
// function foo() {
//     const syncFn = () => {
//         return await Promise.resolve('foo');
//     };
//     console.log(syncFn());
// }

// // 不允许：await 出现在了同步函数声明中 
// function bar() {
//     function syncFn() {
//         return await Promise.resolve('bar');
//     }
//     console.log(syncFn());
// }
// // 不允许：await 出现在了同步函数表达式中 
// function baz() {
//     const syncFn = function () {
//         return await Promise.resolve('baz');
//     };
//     console.log(syncFn());
// }
// // 不允许：IIFE 使用同步函数表达式或箭头函数 
// function qux() {
//     (function () { console.log(await Promise.resolve('qux')); })();
//     (() => console.log(await Promise.resolve('qux')))();
// }

console.log('---------------分界线---------------')