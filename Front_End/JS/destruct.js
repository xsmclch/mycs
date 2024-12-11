// 在函数接受参数的时候就可以开始解析Array了
// 无用的参数部分直接留空即可
function getFirst([first, ..._]) {
    return first;
}

function getSecond([, second, ..._]) {
    return second;
}

function swapFirstandSecond([first, second, ...rest]) {
    return [second, first, ...rest];
}

function collectPar(first, second, ...rest) {
    console.log(`First parameter is ${first}`);
    console.log(`Second parameter is ${second}`);
    console.log(`The rests of the parameters are ${rest}
        Typeof rest is ${typeof rest}
        rest instanceof Array: ${rest instanceof Array}`);
}

const arr = [1, 2, 3, 4, 5];
console.log(getFirst(arr));
console.log(getSecond(arr));
console.log(swapFirstandSecond(arr));
collectPar('a', 3, 's', [3, 2, 1], { x: 2 });
collectPar(1, 2, 3, 4, 5);