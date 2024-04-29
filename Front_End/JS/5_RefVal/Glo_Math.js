// uri
let uri = "http://www.wrox.com/illegal value.js#start";
// "http://www.wrox.com/illegal%20value.js#start" 
console.log(encodeURI(uri));
// "http%3A%2F%2Fwww.wrox.com%2Fillegal%20value.js%23start" 
console.log(encodeURIComponent(uri));

uri = "http%3A%2F%2Fwww.wrox.com%2Fillegal%20value.js%23start";
// http%3A%2F%2Fwww.wrox.com%2Fillegal value.js%23start 
console.log(decodeURI(uri));
// http:// www.wrox.com/illegal value.js#start 
console.log(decodeURIComponent(uri));

// eval()
eval("console.log('hi')");
let msg = 'Hello world!';
eval('console.log(msg)');

eval('function sayHi() {console.log("hi");}');
sayHi();

// window
// var color = 'red';

// function sayColor() {
//     console.log(window.color);
// }

// window.sayColor;
if (typeof window !== 'undefined') {
    // 在浏览器环境中，可以使用 window 对象
    console.log('You are on the browser');
    console.log(window.innerWidth);
    window.addEventListener('mousemove', () => {
        console.log('Mouse moved');
    });
} else {
    // 在非浏览器环境中，无法使用 window 对象
    console.log('You are on the server');
}

let global = function () {
    return this;
}();
console.log(global);

// Math
let max = Math.max(3, 54, 32, 16);
console.log(max);

let min = Math.min(3, 54, 32, 16);
console.log(min);

let values = [1, 2, 3, 4, 5, 6, 7, 8];
max = Math.max(...values);
console.log(max);

console.log(Math.ceil(25.9));
console.log(Math.ceil(25.5));
console.log(Math.ceil(25.1));

console.log(Math.floor(25.9));
console.log(Math.floor(25.5));
console.log(Math.floor(25.1));

console.log(Math.round(25.9));
console.log(Math.round(25.5));
console.log(Math.round(25.1));

console.log(Math.fround(25.9));
console.log(Math.fround(25.5));
console.log(Math.fround(25.1));

num = Math.floor(Math.random() * 10 + 1);
// 这样就有 10 个可能的值（1~10），其中最小的值是 1。如果想选择一个 2~10 范围内的值，则代码就
// 要写成这样：
num = Math.floor(Math.random() * 9 + 2);
// 2~10 只有 9 个数，所以可选总数（total_number_of_choices）是 9，而最小可能的值
// （first_possible_value）是 2。很多时候，通过函数来算出可选总数和最小可能的值可能更方便，
// 比如：
function selectFrom(lowerValue, upperValue) {
    let choices = upperValue - lowerValue + 1;
    return Math.floor(Math.random() * choices + lowerValue);
}
num = selectFrom(2, 10);
console.log(num); // 2~10 范围内的值，其中包含 2 和 10

let colors = "red,green,blue,yellow,black,purple,brown".split(/,/g)
console.log(colors);
let color = colors[selectFrom(0, colors.length - 1)];
console.log(color);

// Math.abs(x) 返回 x 的绝对值
// Math.exp(x) 返回 Math.E 的 x 次幂
// Math.expm1(x) 等于 Math.exp(x) - 1
// Math.log(x) 返回 x 的自然对数
// Math.log1p(x) 等于 1 + Math.log(x)
// Math.pow(x, power) 返回 x 的 power 次幂
// Math.hypot(...nums) 返回 nums 中每个数平方和的平方根
// Math.clz32(x) 返回 32 位整数 x 的前置零的数量
// Math.sign(x) 返回表示 x 符号的 1、0、-0 或-1
// Math.trunc(x) 返回 x 的整数部分，删除所有小数
// Math.sqrt(x) 返回 x 的平方根
// Math.cbrt(x) 返回 x 的立方根
// Math.acos(x) 返回 x 的反余弦
// Math.acosh(x) 返回 x 的反双曲余弦
// Math.asin(x) 返回 x 的反正弦
// Math.asinh(x) 返回 x 的反双曲正弦
// Math.atan(x) 返回 x 的反正切
// Math.atanh(x) 返回 x 的反双曲正切
// Math.atan2(y, x) 返回 y/x 的反正切
// Math.cos(x) 返回 x 的余弦
// Math.sin(x) 返回 x 的正弦
// Math.tan(x) 返回 x 的正切

console.log(Math.sin(Math.PI / 2));
console.log(Math.atan(1) / Math.PI);
console.log(Math.abs(-10.01));