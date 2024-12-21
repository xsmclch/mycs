try {
    new eval();
} catch (e) {
    console.log(e.message);
}

try {
    eval('a ++ b');
} catch (e) {
    console.log(e.message);
    console.log(e instanceof SyntaxError);
} finally {
    console.log('finally');
}

try {
    new Array(-1);
    new Array(Number.MAX_VALUE);
} catch (e) {
    console.log(e.message);
    console.log(e instanceof RangeError);
}

console.log('------throw------');

try {
    throw true;
} catch (e) {
    console.log('throw true')
    console.log(e);
    console.log(e.message); // undefined
}
console.log()

try {
    throw 'Hello world!';
} catch (e) {
    console.log("throw 'Hello world!'")
    console.log(e);
    console.log(e.message); // undefined
}
console.log()

try {
    throw { name: 'JavaScript' };
} catch (e) {
    console.log("throw { name: 'JavaScript' };");
    console.log(e);
    console.log(e.message); // undefined
}
console.log()

try {
    throw new Error('Somethin bad happened');
} catch (e) {
    console.log("throw new Error('Somethin bad happened');");
    // console.log(e);这里就会有详细信息
    console.log(e.message);
}

// js调试器
function pauseExecution() {
    console.log("Will print before breakpoint");
    debugger;
    console.log("Will not print until breakpoint continues");
}

pauseExecution();