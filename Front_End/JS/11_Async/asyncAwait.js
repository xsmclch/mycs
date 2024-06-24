// 4th of ch11
// async/await 中真正起作用的是await。async 关键字，无论从哪方面来看，都不过是一个标识符。
// 毕竟，异步函数如果不包含await关键字，其执行基本上跟普通函数没有什么区别：
let foo = async function () {
    console.log('2st log');
}

console.log('1nd log');
foo();
console.log('3rd log');

// 要完全理解await 关键字，必须知道它并非只是等待一个值可用那么简单。JavaScript运行时在碰
// 到await 关键字时，会记录在哪里暂停执行。等到await右边的值可用了，JavaScript运行时会向消息
// 队列中推送一个任务，这个任务会恢复异步函数的执行。 
console.log('-----')
foo = async function () {
    console.log('5th log');
    await null;
    console.log('6th log');
}

console.log('4th log');
foo();
console.log('7th log');

// 如果await 后面是一个期约，则问题会稍微复杂一些。此时，为了执行异步函数，实际上会有两个
// 任务被添加到消息队列并被异步求值。下面的例子虽然看起来很反直觉，但它演示了真正的执行顺序：
console.log('-----')
foo = async function () {
    console.log(2);
    console.log(await Promise.resolve(6));
    console.log(7);
}

let bar = async function () {
    console.log(4);
    console.log(await 8);
    console.log(9);
}

console.log(1);
foo();
console.log(3);
bar();
console.log(5);

// 异步函数策略
// 实现sleep()
console.log('-----')
async function sleep(delay) {
    return new Promise((resolve) => setTimeout(resolve, delay));
}

foo = async function () {
    const t0 = Date.now();
    await sleep(1500);
    console.log(Date.now() - t0);
}
// foo();

// 利用平行执行
// 如果利用await时不留心，很可能错过平行加速的机会，顺序等待了五个随机的超时
console.log('-----');
async function randomDelay(id) {
    const delay = Math.random() * 1000;
    return new Promise((resolve) => setTimeout(() => {
        console.log(`${id} finished`);
        resolve(id);
    }, delay))
}

foo = async function () {
    const t0 = Date.now();
    await randomDelay(0);
    await randomDelay(1);
    await randomDelay(2);
    await randomDelay(3);
    await randomDelay(4);
    console.log(`${Date.now() - t0}ms elapsed`);
}
// foo();

// 用for重写
foo = async function () {
    const t0 = Date.now();
    for (let i = 0; i < 5; ++i) {
        await randomDelay(i);
    }
    console.log(`${Date.now() - t0}ms elapsed`);
}
// foo();

// 如果顺序不是必须保证的，可以一次性初始化所有期约，然后再分别等待它们的结果
// 注意，虽然期约没有按照顺序执行，但await按顺序收到了每个期约的值
foo = async function () {
    const t0 = Date.now();

    const promises = Array(5).fill(null).map((_, i) => randomDelay(i));

    for (const p of promises) {
        console.log(`awaited ${await p}`);
    }

    console.log(`${Date.now() - t0}ms elapse`);
}
// foo();

// 使用async/await，期约连锁会变得很简单
console.log('-----');
let addTwo = x => x + 2;
let addThree = x => x + 3;
let addFive = x => x + 5;

let addTen = async x => {
    // return [addTwo, addThree, addFive].reduce((outcome, cur) => cur(outcome), x);
    for (const fn of [addTwo, addThree, addFive]) {
        x = await fn(x);
    }
    return x;
}

addTen(10).then(console.log);

// 栈追踪和内存管理
// 期约与异步函数的功能有相当程度的重叠，但它们在内存中的表示则差别很大。看看下面的例子，
// 它展示了拒绝期约的栈追踪信息： 
function fooPromiseExecutor(resolve, reject) {
    setTimeout(reject, 1000, 'bar');
}

foo = function () {
    new Promise(fooPromiseExecutor);
}

// foo();
// Uncaught (in promise) bar 
//   setTimeout 
//   setTimeout (async) 
//   fooPromiseExecutor 
//   foo

// 异步函数

foo = async function () {
    await new Promise(fooPromiseExecutor);
}
// foo();
// Uncaught (in promise) bar 
//   foo 
//   async function (async) 
//   foo 

console.log('----------asynchronous----------');