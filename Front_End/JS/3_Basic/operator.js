let myList = [1, 2, 3, 3, 1, 6, 7, 6, 2];

let myList2 = myList.concat([10, 10])

console.log(myList2)

let outcome = 0;

for (const i of myList) {
    outcome ^= i;
}

console.log(outcome);

let num = -18;
console.log(num.toString(2), num);
console.log((~num).toString(2), ~num)
console.log((num >> 2).toString(2), num >> 2);
console.log((num >>> 2).toString(2), num >>> 2);
console.log(Number.MAX_VALUE)
let x = 1 << 31;
console.log(x);

console.log(`null == undefined: ${null == undefined}`);
console.log(`null === undefined: ${null === undefined}`);

let a = 1, b = 2;
c = a > b ? a : b;
console.log(c)