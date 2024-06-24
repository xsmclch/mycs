// 1st of ch11
// setTimeout(console.log, 1000, 'Hello', 'world!');

// Promise期约
let p = new Promise(() => { });
// setTimeout(console.log, 0, p);
console.log(p)


// 由于期约的状态是私有的，所以只能在内部进行操作。内部操作在期约的执行器函数中完成。执行
// 器函数主要有两项职责：初始化期约的异步行为和控制状态的最终转换。其中，控制期约状态的转换是
// 通过调用它的两个函数参数实现的。这两个函数参数通常都命名为 resolve()和 reject()。调用
// resolve()会把状态切换为兑现，调用reject()会把状态切换为拒绝。另外，调用reject()也会抛
// 出错误（后面会讨论这个错误）。
let p1 = new Promise((resolve, reject) => resolve());
// setTimeout(console.log, 0, p1);

// let p2 = new Promise((resolve, reject) => reject());
// setTimeout(console.log, 0, p2);

// 在浏览器中运行
// clear()
p1 = new Promise((resolve, reject) => resolve());
// setTimeout(console.log, 0, p1);

p = new Promise((resolve, reject) => setTimeout(resolve, 1000));

// setTimeout(console.log, 0, p);

// 无论resolve()和reject()中的哪个被调用，状态转换都不可撤销了。于是继续修改状态会静默
// 失败，如下所示：
p = new Promise((resolve, reject) => {
    resolve();
    reject();   // 没有效果
});

// setTimeout(console.log, 0, p);

p = new Promise((resolve, reject) => {
    setTimeout(resolve, 1000);
});

// setTimeout(console.log, 0, p);
// setTimeout(console.log, 2000, p);

// Promise.resolve()
// setTimeout(console.log, 0, Promise.resolve(3));
console.log(Promise.resolve(3));

// 多余的参数会被忽略
console.log(Promise.resolve(1, 2, 3));

// 对这个静态方法而言，如果传入的参数本身是一个期约，那它的行为就类似于一个空包装。因此，
// Promise.resolve()可以说是一个幂等方法，如下所示
p = Promise.resolve(7);

console.log(p === Promise.resolve(p));
console.log(p === Promise.resolve(Promise.resolve(p)));

// 这个幂等性会保留传入期约的状态
p = new Promise(() => { });

console.log(p)
console.log(Promise.resolve(p));
console.log(p === Promise.resolve(p));
console.log(Promise.resolve());

// console.log(Promise.resolve(new Error('foo')));

// Promise.reject()
// 下面的两个期约实例实际上是一样的： 
// let p1 = new Promise((resolve, reject) => reject()); 
// let p2 = Promise.reject(); 

// 这个拒绝的期约的理由就是传给 Promise.reject()的第一个参数。这个参数也会传给后续的拒
// 绝处理程序：
// console.log(Promise.reject(3));
p = Promise.reject(3);
p.then(null, (e) => console.log(e));
// 关键在于，Promise.reject()并没有照搬Promise.resolve()的幂等逻辑。如果给它传一个期
// 约对象，则这个期约会成为它返回的拒绝期约的理由：

// 同步/异步执行的二元性 
// Promise 的设计很大程度上会导致一种完全不同于JavaScript的计算模式。下面的例子完美地展示
// 了这一点，其中包含了两种模式下抛出错误的情形：
try {
    throw new Error('foo');
} catch (e) {
    // console.log(e);
}

// 代码一旦开始以异步模式执行，则唯一与之交互
// 的方式就是使用异步结构——更具体地说，就是期约的方法。
try {
    // Promise.reject(new Error('bar'));
} catch (e) {
    // 无法捕获
    console.log(e);
}

// 期约的实例方法
// 期约实例的方法是连接外部同步代码与内部异步代码之间的桥梁。这些方法可以访问异步操作返回
// 的数据，处理期约成功和失败的结果，连续对期约求值，或者添加只有期约进入终止状态时才会执行的
// 代码。 
// Promise.prototype.then()是为期约实例添加处理程序的主要方法
// then()方法接受两个参数then(onResolved, onRejected)onResolve和onRejected分别处理
// 期约进入"resolved"和"rejected"状态时执行
function onResolved(id) {
    setTimeout(console.log, 0, id, 'resolved');
}
function onRejected(id) {
    setTimeout(console.log, 0, id, 'rejected');
}

// p1 = new Promise((resolve, reject) => setTimeout(resolve, 3000));
// let p2 = new Promise((resolve, reject) => setTimeout(reject, 3000));

// 使用箭头函数传递id参数
// p1.then(() => onResolved('p1'),
//         () => onRejected('p1'));
// p2.then(() => onResolved('p2'),
//         () => onRejected('p2'));

// 如前所述，两个处理程序参数都是可选的。而且，传给then()的任何非函数类型的参数都会被静
// 默忽略。如果想只提供onRejected参数，那就要在onResolved参数的位置上传入undefined。这
// 样有助于避免在内存中创建多余的对象，对期待函数参数的类型系统也是一个交代。
// p1 = new Promise((resolve, reject) => setTimeout(resolve, 3000));
// p2 = new Promise((resolve, reject) => setTimeout(reject, 3000));

// p1.then('Ignore');

// 不传onResolved的规范写法
// p2.then(null, () => onRejected('p2'));

// Promise.prototype.then()方法返回一个新的期约实例
p1 = new Promise(() => { });
p2 = p1.then();
console.log(p1, p2, p1 === p2);
// 这个新期约实例基于onResovled处理程序的返回值构建。换句话说，该处理程序的返回值会通过
// Promise.resolve()包装来生成新期约。如果没有提供这个处理程序，则 Promise.resolve()就会
// 包装上一个期约解决之后的值。如果没有显式的返回语句，则Promise.resolve()会包装默认的返回
// 值undefined。 
p1 = Promise.reject('foo');
// p2 = p1.then(); Uncaught

// 这些都一样
let p3 = p1.then(null, () => undefined);
let p4 = p1.then(null, () => { });
let p5 = p1.then(null, () => Promise.resolve());

// 一下两个一样
let p6 = p1.then(null, () => 'bar');
let p7 = p1.then(null, () => Promise.resolve('bar'));

let p8 = p1.then(null, () => new Promise(() => { })); // Promise { <pending> }
// let p9 = p1.then(null, () => Promise.reject());   // Promise { <rejected> }: undefined

let p10 = p1.then(null, () => { throw 'bar'; });    // 抛出异常
p10.then(null, (e) => console.log(e));

let p11 = p1.then(null, () => Error('qux'));        // 返回一个Error对象
setTimeout(console.log, 0, p11);    // Promise <resolved>: Error: qux

// Promise.prototype.catch()
p = Promise.reject();

p.then(null, () => setTimeout(console.log, 0, 'rejected'));
p.catch(() => setTimeout(console.log, 0, 'rejected'));
// 在返回新期约实例方面Promise.prototype.catch()行为和Promise.prototype.then()的onRejected处理程序是一样的
p1 = p.catch(() => { });
setTimeout(console.log, 3, p1); // Promise <resolved>: undefined 调用了Promise.resolve()

// Promise.prototype.finally参照python里面的finally但不知道时resolved还是rejected
p1 = Promise.resolve();
// p2 = Promise.reject();

function onFinally() {
    setTimeout(console.log, 3, 'Finally');
}

p1.finally(onFinally);
// p2.finally(onFinally);

p1 = new Promise(() => { });
p2 = p1.finally();
setTimeout(console.log, 4, p1, p2, p1 === p2);

// 这个新期约实例不同于then()或catch()方式返回的实例。因为onFinally 被设计为一个状态
// 无关的方法，所以在大多数情况下它将表现为父期约的传递。对于已解决状态和被拒绝状态都是如此。 
p1 = Promise.resolve('foo');

p2 = p1.finally();
p3 = p1.finally(() => undefined);
p4 = p1.finally(() => { });
p5 = p1.finally(() => Promise.resolve());
p6 = p1.finally(() => 'bar');
p7 = p1.finally(() => Promise.resolve('bar'));
p8 = p1.finally(() => Error('qux'));

setTimeout(console.log, 5, p2);
setTimeout(console.log, 5, p3);
setTimeout(console.log, 5, p4);
setTimeout(console.log, 5, p5);
setTimeout(console.log, 5, p6);
setTimeout(console.log, 5, p7);
setTimeout(console.log, 5, p8);

// 非重入期约方法
p = Promise.resolve();

p.then(() => console.log('onResolved handler'));

console.log('then() returns');
// 输出顺序
// then() returns
// onResolved handler

let synchronousResolve;

p = new Promise((resolve) => {
    synchronousResolve = function () {
        console.log('1: invoking resolve()');
        resolve();
        console.log('2: resolve() returns');
    };
});

p.then(() => console.log('4: then() handler executes'));

synchronousResolve();
console.log('3: synchronousResolve() returns');

p1 = Promise.resolve();
p1.then(() => console.log('p1.then() onResolved'));
console.log('p1.then() returns');
p2 = Promise.reject();
p2.then(null, () => console.log('p2.then() onRejected'));
console.log('p2.then() returns');
p3 = Promise.reject();
p3.catch(() => console.log('p3.catch() onRejected'));
console.log('p3.catch() returns');
p4 = Promise.resolve();
p4.finally(() => console.log('p4.finally() onFinally'));
console.log('p4.finally() returns');
// p1.then() returns 
// p2.then() returns 
// p3.catch() returns 
// p4.finally() returns 
// p1.then() onResolved 
// p2.then() onRejected 
// p3.catch() onRejected 
// p4.finally() onFinally 

// 如果给期约添加了多个处理程序，当期约状态变化时，相关处理程序会按照添加它们的顺序依次执
// 行。无论是then()、catch()还是finally()添加的处理程序都是如此。

// 传递解决值和拒绝理由
p1 = new Promise((resolve, reject) => resolve('foo'));
p1.then((value) => console.log(value));

p2 = new Promise((resolve, reject) => reject('bar'));
p2.catch((reason) => console.log(reason));


// 拒绝期约类似于throw()表达式，因为它们都代表一种程序状态，即需要中断或者特殊处理。在期
// 约的执行函数或处理程序中抛出错误会导致拒绝，对应的错误对象会成为拒绝的理由。因此以下这些期
// 约都会以一个错误对象为由被拒绝：
// let p1 = new Promise((resolve, reject) => reject(Error('foo'))); 
// let p2 = new Promise((resolve, reject) => { throw Error('foo'); }); 
// let p3 = Promise.resolve().then(() => { throw Error('foo'); }); 
// let p4 = Promise.reject(Error('foo')); 
// setTimeout(console.log, 0, p1);  // Promise <rejected>: Error: foo 
// setTimeout(console.log, 0, p2);  // Promise <rejected>: Error: foo 
// setTimeout(console.log, 0, p3);  // Promise <rejected>: Error: foo 
// setTimeout(console.log, 0, p4);  // Promise <rejected>: Error: foo 
// // 也会抛出4个未捕获错误 

// 期约可以以任何理由拒绝，包括 undefined，但最好统一使用错误对象。这样做主要是因为创建
// 错误对象可以让浏览器捕获错误对象中的栈追踪信息，而这些信息对调试是非常关键的。例如，前面例
// 子中抛出的4个错误的栈追踪信息如下： 
// Uncaught (in promise) Error: foo 
//     at Promise (test.html:5)  
//     at new Promise (<anonymous>) 
//     at test.html:5 
// Uncaught (in promise) Error: foo 
//     at Promise (test.html:6) 
//     at new Promise (<anonymous>) 
//     at test.html:6 
// Uncaught (in promise) Error: foo 
//     at test.html:8 
// Uncaught (in promise) Error: foo 
//     at Promise.resolve.then (test.html:7)

// 这个例子同样揭示了异步错误有意思的副作用。正常情况下，在通过throw()关键字抛出错误时，
// JavaScript 运行时的错误处理机制会停止执行抛出错误之后的任何指令： 

// 但是，在期约中抛出错误时，因为错误实际上是从消息队列中异步抛出的，所以并不会阻止运行时
// 继续执行同步指令：

console.log('begin synchronous execution');
try {
    throw Error('foo');
} catch (e) {
    console.log('caught error', e);
}
console.log('continue synchronous execution');
// begin synchronous execution 
// caught error Error: foo 
// continue synchronous execution 
new Promise((resolve, reject) => {
    console.log('begin asynchronous execution');
    reject(Error('bar'));
}).catch((e) => {
    console.log('caught error', e);
}).then(() => {
    console.log('continue asynchronous execution');
});
// begin asynchronous execution
// caught error Error: bar
// continue asynchronous execution 