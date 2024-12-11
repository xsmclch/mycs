// 再探Array的各种方法
// 改变自身的数组方法
// 这些方法会修改原数组并返回修改后的数组或其他值：
// push: 在数组末尾添加一个或多个元素，返回新的长度。
// pop: 移除数组末尾的元素，返回移除的元素。
// shift: 移除数组开头的元素，返回移除的元素。
// unshift: 在数组开头添加一个或多个元素，返回新的长度。
// splice: 从数组中添加或移除元素，并返回被删除的元素。
// reverse: 反转数组中的元素顺序，返回反转后的数组。
// sort: 对数组进行排序，返回排序后的数组。
// fill: 用一个固定值填充数组中的所有元素，返回修改后的数组。
// copyWithin: 将数组的一部分复制到同一数组中的另一个位置，返回修改后的数组。

// 返回新数组的数组方法
// 这些方法不修改原数组，而是返回一个新数组：
// map: 对数组中的每个元素进行处理，并返回一个新数组。
// filter: 返回一个符合条件的新数组。
// slice: 返回数组的一部分，不修改原数组。
// concat: 合并两个或多个数组，返回一个新数组。
// reduce: 返回单个累积值，不返回数组。
// reduceRight: 类似于 reduce，但从右向左进行计算。
// flat: 将嵌套数组展平成一个新数组。
// flatMap: 对数组中的每个元素进行处理，并将结果展平到一个新数组中。

// 不改变数组也不返回数组的方法
// 这些方法会返回一个值或者对数组进行某种计算，但不改变原数组：
// forEach: 对数组中的每个元素执行一次提供的函数。
// includes: 判断数组是否包含某个值，返回布尔值。
// indexOf: 查找元素在数组中的索引，返回索引或-1。
// lastIndexOf: 从后向前查找元素在数组中的索引，返回索引或-1。
// find: 返回第一个符合条件的元素。
// findIndex: 返回第一个符合条件的元素索引。
// every: 判断数组中的每个元素是否都满足条件，返回布尔值。
// some: 判断数组中是否至少有一个元素满足条件，返回布尔值。

let arr = [1, 2, 3, 4, 5, 6, 7];
let outcome = arr.reduce((acc, cur) => {
    if (cur % 2 == 0)
        acc.push(cur, cur);
    else
        acc.push(cur);
    // 这个不能漏
    return acc;
}, []);
console.log(outcome);

// 分离奇偶
outcome = arr.reduce((acc, cur) => {
    if (cur % 2 == 0)
        acc.even.push(cur);
    else
        acc.odd.push(cur);
    return acc;
}, { even: [], odd: [] });
console.log(outcome);

// 取出一头一尾反转插在中间
// 复制一个，不是同一个
let x = Array.of(...arr, 8);
let temp = x.splice(1, x.length - 2);
console.log(`temp = ${temp}\nx = ${x}`);
temp.splice(temp.length / 2, 0, ...x.reverse());
console.log(temp)

// Array的sort是默认按照字符串的字典序排，并不是默认数字！！！！
// 记得指定比较规则，非正数不交换。
console.log([6, 10, 1].sort());
console.log([6, 10, 1].sort((a, b) => a - b));