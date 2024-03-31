// 尽量不用var，var可以多次定义，全局作用域，定义提前
// let 作用域

let name = "myname";
let age = 17;

if (typeof name === "undefined") {
    let name;
}

name = "Matt";

try {
    console.log(age);
}
catch (error) {
    let age;
}

age = 26;

// for中let var
for (var i = 0; i < 5; ++i) {
}
console.log(i);

for (let j = 0; j < 5; ++j) {
}
try {
    console.log(j);
}
catch (error) {
    console.log("ReferenceError!");
}

// const
for (const key in { a: 1, b: 2 }) {
    console.log(key);
}

// data type basic
// undefined boolean string number object function symbol
let message = "some string";
let nothing;
console.log(typeof message);
console.log(typeof (message));
console.log(typeof 11);
console.log(nothing === undefined);

let cat = null;
console.log(typeof cat);

// boolean
// Toboolean
// Boolean      true    false
// String       noempty empty
// Number       not0    0 NaN
// Object       any     null
// undefined    N/A     undefined

let messagebool = "Hello world!";
if (messagebool) {
    console.log(messagebool);
    console.log(Boolean(messagebool));
}

// number
let intNum = 55;
let octalNum = 0o70;
let hexNum = 0xA; // The same as 0xa
console.log(hexNum);
let binNum = 0b0110;
console.log(binNum);

let floatNum = 3.124e7;
let floatNum1 = 3124e-7;
console.log(floatNum, floatNum1);

// range
console.log(Number.MAX_VALUE);
let result = Number.MAX_VALUE + Number.MAX_VALUE;
console.log(typeof result);
console.log(result);
// NaN
console.log(0 / 0);
console.log("5 / 0 =", 5 / -0);
console.log(NaN === NaN); // 只要出现NaN就false

console.log(isNaN(NaN), isNaN(10), isNaN("10"), isNaN("blue"), isNaN(true));

// toNum
let toNum1 = Number("Hello"); // NaN
let toNum2 = Number(""); // 0
let toNum3 = Number("000011"); // 11
let toNum4 = Number("true"); // 1
let toNum5 = Number("0xA"); // 10
// console.log(toNum5);
// Number(<Object>) 调用valueOf() 方法

// 需要转化而int时优先使用 parseInt()
let toInt1 = parseInt("1234blue"); // 1234
let toInt2 = parseInt(""); // NaN
let toInt3 = parseInt("0xA"); // 10
let toInt4 = parseInt("12.34"); // 12
let toInt5 = parseInt("0b1010"); // 10
console.log(toInt1, toInt2, toInt3, toInt4, toInt5);

// 第二个参数指定进制
let toInt6 = parseInt("1010", 2); // 10
let toInt7 = parseInt("1010", 8); // 520
let toInt8 = parseInt("1010", 16); // 4112 
console.log(toInt6, toInt7, toInt8);

// String
let text = "This is a letter sigma: \u03A3.";
console.log(text, "Text length:", text.length);
// toString can's apply to null and undefined
let ageAsString = age.toString();
console.log(ageAsString);
let found = true;
let foundAsString = found.toString();
// String() can convert any type to string
// String(null) // "null"
// String(undefined) // "undefined"

// template literals and string interpolation
let name1 = "Matt";
let age1 = 26;
let message1 = `My name is ${name1} and I am ${age1} years old.`;
console.log(message1);
let multiLineMessage = `This is the first line.
This is the second line.
This is the third line.`;
console.log(multiLineMessage);

let value = 5;
let exponent = 'second';
// Any Non-String value can call toString() method
let interpolatedString = value + ' to the ' + exponent + ' power is ' + value ** 2;
console.log(interpolatedString);

let foo = { toString : () => "bar" };
console.log(`The value of foo is ${foo}`); // "The value of foo is bar"

let value1 = '';
function append() {
    value1 = `${value1}abc`;
    console.log(value1);
}

append(); // "abc"
append(); // "abcabc"
append(); // "abcabcabc"

// tag function
let a = 6;
let b = 9;
// function simpleTag(strings, aValExp, bValExp) {
//     console.log(strings);
//     console.log(aValExp);
//     console.log(bValExp);

//     return 'foobar';
// }
function simpleTag(strings, ...exps) {
    console.log(strings);
    for (const exp of exps) {
        console.log(exp)
    }

    return 'foobar';
}

function zipTag(strings, ...exps)  {
    return strings[0] +
        exps.map((exp, i) => `${exp}${strings[i + 1]}`)
        .join('');
}

let untaggedResult = `${a} + ${b} = ${a + b}`;
let taggedResult = simpleTag`${a} + ${b} = ${a + b}`;
let zippedResult = zipTag`${a} + ${b} = ${a + b}`;

console.log(untaggedResult); // "6 + 9 = 15"
console.log(taggedResult); // "foobar"
console.log(zippedResult); // "6 + 9 = 15"
