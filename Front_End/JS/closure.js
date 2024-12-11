// 一个很好的例子深刻认识闭包
// 写个可以返回函数的函数，返回的那个函数应该具有记忆功能
// 也就是说，根据这个函数生成的函数，在连续输入相同给的参数调用的时候应该返回严格相等的量
// 我们就以坐标[x, y]作为变化量
// f: (x, y) => [f(x), f(y)];
function memF(f) {
    // 这是正解，但是这是个不好的操作，这里会导致内存泄漏，不要试图在实际生产中使用
    let res, par = [];
    return (x, y) => {
        if (par[0] === x && par[1] === y) return res;
        else {
            par = [x, y];
            res = f(x, y);
            return res;
        }
    }
}

let f = (x, y) => [x * y, y ** x];
let mf = memF(f);

console.log(mf(2, 3), f(2, 3));     // [ 6, 9 ] [ 6, 9 ] 
console.log(mf(2, 3), mf(2, 5));    // [ 6, 9 ] [ 10, 25 ]
console.log(f(2, 5) === f(2, 5));   // false
console.log(mf(2, 5) === mf(2, 5)); // true
