// 2nd of ch11
// 期约连锁与期约合成、
// 期约连锁
// 因为每个期约实例方法都会返回一个新的期约对象
let p = new Promise((resolve, reject) => {
    console.log('first');   // sync 1st
    resolve();
});
p.then(() => console.log('second')) // async L1 1st
    .then(() => console.log('third'))   // async L2 1st
    .then(() => console.log('fourth')); // async L3 1st

// 这个实现最终执行了一连串同步任务

// 串行化异步任务
let p1 = new Promise((resolve, reject) => {
    console.log('p1 executor'); // sync 2nd
    setTimeout(resolve, 1000);
});

p1.then(() => new Promise((resolve, reject) => {
    console.log('p2 executor');
    setTimeout(resolve, 1000);
}))
    .then(() => new Promise((resolve, reject) => {
        console.log('p3 executor');
        setTimeout(resolve, 1000);
    }))
    .then(() => new Promise((resolve, reject) => {
        console.log('p4 executor');
        setTimeout(resolve, 1000);
    }));

// then() catch() finally()串联
p = new Promise((resolve, reject) => {
    console.log('initial promise rejects'); // sync 3rd
    reject();
})

p.catch(() => console.log('reject handler')) // async L1 2nd
    .then(() => console.log('resolve handler')) // async L2 2nd
    .finally(() => console.log('finally handler')); // async L3 2nd

// 期约图，有向二叉树，层序遍历!!!!!!!

// Promise.all()和Promise.race()

// Promise.all() Promise.race()
// 将多个期约组合成一个期约的静态方法Promise.all()和Promise.race()
p1 = Promise.all([
    Promise.resolve(),
    Promise.resolve()
]);
console.log(p1)

// 可迭代元素会通过Promise.resolve()转换为期约
p = Promise.all([
    Promise.resolve(),
    new Promise((resolve, reject) => setTimeout(resolve, 1000))
]);
setTimeout(console.log, 0, p);
p.then(() => setTimeout(console.log, 0, 'all() resolved!'));

// 如果至少有一个包含的期约待定，则合成的期约也会待定。
// 如果有一个包含的期约拒绝，则合成的期约也会拒绝： 
p1 = Promise.all([new Promise(() => { })]);
setTimeout(console.log, 0, p1);

// let p2 = Promise.all([
//   Promise.resolve(),
//   Promise.reject(),
//   Promise.resolve()
// ]);
// setTimeout(console.log, 0, p2);
// 如果所有期约都成功解决，则合成期约的解决值就是
// 所有包含期约解决值的数组，按照迭代器顺序
p = Promise.all([
    Promise.resolve(3),
    Promise.resolve(),
    Promise.resolve(4)
]);

p.then((values) => setTimeout(console.log, 0, values));

// 如果有期约拒绝，则第一个拒绝的期约会将自己的理由作为合成期约的拒绝理由。之后再拒绝的期
// 约不会影响最终期约的拒绝理由。不过，这并不影响所有包含期约正常的拒绝操作。合成的期约会静默
// 处理所有包含期约的拒绝操作，如下所示：
p = Promise.all([
    Promise.reject(3),
    new Promise((resolve, reject) => setTimeout(reject, 1000))
]);

p.catch((reason) => setTimeout(console.log, 0, reason));

// Promise.race()静态方法返回一个包装期约，是一组集合中最先解决或拒绝的期约的镜像。这个
// 方法接收一个可迭代对象，返回一个新期约：

// Promise.race() 不会对解决或拒绝的期约区别对待。 无论是解决还是拒绝， 只要是第一个落定的
// 期约， Promise.race() 就会包装其解决值或拒绝理由并返回新期约：
// 解决先发生，超时后的拒绝被忽略 
p1 = Promise.race([
    Promise.resolve(3),
    new Promise((resolve, reject) => setTimeout(reject, 1000))
]);
setTimeout(console.log, 0, p1); // Promise <resolved>: 3 
// 拒绝先发生，超时后的解决被忽略 
p2 = Promise.race([
    Promise.reject(4),
    new Promise((resolve, reject) => setTimeout(resolve, 1000))
]);
p2.catch(() => { })
setTimeout(console.log, 0, p2); // Promise <rejected>: 4 

// 迭代顺序决定了落定顺序
let p3 = Promise.race([
    Promise.resolve(5),
    Promise.resolve(6),
    Promise.resolve(7)
])
setTimeout(console.log, 0, p3)
p3.catch(() => {
    console.log('p3 catch?')
})
// 第一个拒绝理由成为合成期约拒绝理由，后续的静默
p = Promise.race([
    Promise.reject(3),
    new Promise((resolve, reject) => setTimeout(reject, 1000))
])

p.catch((reason) => setTimeout(console.log, 0, reason))
    .finally(() => setTimeout(console.log, 1000, 'finally()'));

// 串行期约的合成
// 这种模式可以提炼出一个通用函数，可以把任意多个函数作为处理程序合成一个连续传值的期约连
// 锁。这个通用的合成函数可以这样实现： 
function addTwo(x) { return x + 2; }
function addThree(x) { return x + 3; }
function addFive(x) { return x + 5 }

function compose(...fns) {
    return (x) => fns.reduce((promise, fn) => promise.then(fn), Promise.resolve(x));
}

let addTen = compose(addTwo, addThree, addFive);

addTen(8).then(console.log);

// ES6期约实现是很可靠的，但它也有不足之处。比如，很多第三方期约库实现中具备而ECMAScript
// 规范却未涉及的两个特性：期约取消和进度追踪。
// 实际上，可以在现有实现基础上提供一种临时性的封装，以实现取消期约的功能。这可以用到Kevin 
// Smith 提到的“取消令牌”（cancel token）。生成的令牌实例提供了一个接口，利用这个接口可以
// 取消期约；同时也提供了一个期约的实例，可以用来触发取消后的操作并求值取消状态。
class CancelToken {
    constructor(cancelFn) {
        this.promise = new Promise((resolve, reject) => {
            cancelFn(resolve);
        });
    }
}

// 期约进度通知
// 执行中的期约可能会有不少离散的“阶段”，在最终解决之前必须依次经过。某些情况下，监控期
// 约的执行进度会很有用。ECMAScript 6期约并不支持进度追踪，但是可以通过扩展来实现。 
// 一种实现方式是扩展Promise类，为它添加notify()方法，如下所示：
class TrackablePromise extends Promise {
    constructor(executor) {
        const notifyHandlers = [];

        super((resolve, reject) => {
            return executor(resolve, reject, (status) => {
                notifyHandlers.map((handler) => handler(status));
            });
        });

        this.notifyHandlers = notifyHandlers;
    }

    notify(notifyHandler) {
        this.notifyHandlers.push(notifyHandler);
        return this;
    }
}

// 利用eg
p = new TrackablePromise((resolve, reject, notify) => {
    function countdown(x) {
        if (x > 0) {
            notify(`${20 * x}% remaining`);
            setTimeout(() => countdown(x -  1), 1000);
        } else {
            resolve();
        }
    }

    countdown(5);
})

p.notify((x) => setTimeout(console.log, 0, 'progress:', x));

p.then(() => setTimeout(console.log, 0, 'completed'));

console.log('---------------同步异步分界线---------------') // sync last