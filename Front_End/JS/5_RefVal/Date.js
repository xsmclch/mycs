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