// Data
let start = Date.now();
console.log(start);
let stop = Date.now();
console.log(`${stop - start}ms passed...`)

// 本地时间2024/4/6 14:59:00
// UTC 2024/4/6 06:59:00
let now = new Date(2024, 3, 6, 14, 59, 0);
console.log(now);
console.log(now.toLocaleString());

let date1 = new Date(2019, 0, 1);
let date2 = new Date(2019, 1, 1);
console.log(date1 > date2);
console.log(date1 < date2);

// 一些很好的用法
// eg 给定一个日期，如何计算一亿秒后的年月日时分秒？
let d = new Date(Date.UTC(1949, 10, 1));
console.log(d);
// 有个方法是getTime
// 看起来是个相对时间差，注意，单位是毫秒
console.log(d.getTime());

// 一亿是1e9，但是要乘以1e3
function gigaseconds(date) {
    return new Date(date.getTime() + 1e12);
}

console.log(gigaseconds(d));