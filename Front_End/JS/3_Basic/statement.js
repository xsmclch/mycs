// for-in
// 用于枚举对象中的非符号键属性
// for (const propName in window) {
//     document.write(propName);
// }
let myDict = { 'a': 1, 'b': 2, 'c': 3 };
for (const key in myDict) {
    console.log(`${key}: ${myDict[key]}`);
}

// for-of
for (const el of [2, 4, 6, 8]) {
    // document.write(el);
    console.log(el);
}

let num1 = 0, num2 = 0, num3 = 0;

lay1:
for (let i = 0; i < 10; i++) {
    lay2:
    for (let j = 0; j < 10; j++) {
        for (let k = 0; k < 10; k++) {
            if (k == 5) {
                continue lay2;
            }
            ++num3;
        }
        if (j == 6) {
            continue lay1;
        }
        ++num2
    }
    ++num1;
}

console.log(`num1 = ${num1}, num2 = ${num2}, num3 = ${num3}`);

// switch in js
switch ("hello world") {
    case "hello" + " world":
        console.log("Greeting was found.");
        break;
    case "goodbye":
        console.log("Closing was found.");
        break;
    default:
        console.log("Unexpected message was found.");
}

let num = 25;
switch (true) {
    case num < 0:
        console.log("Less than 0.");
        break;
    case num >= 0 && num <= 10:
        console.log("Between 0 and 10.");
        break;
    case num > 10 && num <= 20:
        console.log("Between 10 and 20.");
        break;
    default:
        console.log("More than 20.");
} 