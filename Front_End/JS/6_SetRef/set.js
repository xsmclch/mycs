let s = new Set([
    1, 2, 3, 2, 1
]);
console.log(s, s.size);

const functionVal = function () { };
s.add(functionVal);
console.log(s, s.has(functionVal));
s.clear();

console.log(s);
console.log(s.add(1).add(2), s);
console.log(s.delete(2), s);

// 顺序和迭代
s.clear();
s.add('val1')
    .add('val2')
    .add('val3');
console.log(s);

console.log(s.values === s[Symbol.iterator]);
console.log(s.keys === s[Symbol.iterator]);

for (let val of s.values()) {
    console.log(val);
}

for (let value of s[Symbol.iterator]()) {
    console.log(value);
}

console.log([...s]);

s.clear();

s = new Set([1, 2, 3]);
let s1 = new Set([3, 4, 5]);
console.log([...s, ...s1], new Set([...s, ...s1]))

s.clear(); s1.clear();

s = new Set([1, 2, 3]);

for (let pair of s.entries()) {
    console.log(pair);
}

s.forEach((val, dupVal) => console.log(`${val} -> ${dupVal}`));

// WeakSet
let ws = new WeakSet();
ws.add({});
let none = {};
console.log(ws, ws.has({}));
ws.add(none);
console.log(ws, ws.has(none));