// let s1 = "some text"
// let s2 = s1.substring(2)

let s1 = String("some text");
s2 = s1.substring(2);
s1 = null;

console.log(s2);

let value = '25';
let number = Number(value);
console.log(typeof number);
let ob1 = new Number(value);
console.log(typeof ob1);

// Boolean, codes below explains why never try to use object boolean
let falseObject = new Boolean(false);
let result = falseObject && true;
console.log(`value of result = ${result}`);
console.log(`typeof falseObject = ${typeof falseObject}
value of falseObject = ${falseObject}, which is a String`);

let falseValue = false;
result = falseValue && true;
console.log(`value of result = ${result}`);
console.log(`typeof falseObject = ${typeof falseValue}`);

// Number
let numberObject = new Number(10);
let num = 10;
console.log(`${num.toString()}
${num.toString(2)}
${num.toString(8)}
${num.toString(10)}
${num.toString(16)}`)

console.log(`num.toFixed(2) = ${num.toFixed(2)}`)
num = 12500000000;
console.log(num.toExponential(1));
console.log(num.toPrecision(2));
console.log(Number.isInteger(1.00)); // true
console.log(Number.isSafeInteger(2 ** 53 - 1));

// String
let message = 'abcde';
console.log(message[1], message.charAt(1), message.charCodeAt(1));

console.log(99 == 0x63);

// 对于 U+0000~U+FFFF 范围内的字符，length、charAt()、charCodeAt()和 fromCharCode()
// 返回的结果都跟预期是一样的。这是因为在这个范围内，每个字符都是用 16 位表示的，而这几个方法
// 也都基于 16 位码元完成操作。只要字符编码大小与码元大小一一对应，这些方法就能如期工作。
// 这个对应关系在扩展到 Unicode 增补字符平面时就不成立了。问题很简单，即 16 位只能唯一表示
// 65 536 个字符。这对于大多数语言字符集是足够了，在 Unicode 中称为基本多语言平面（BMP）。为了
// 表示更多的字符，Unicode 采用了一个策略，即每个字符使用另外 16 位去选择一个增补平面。这种每个
// 字符使用两个 16 位码元的策略称为代理对。
message = 'ab\u{1f60a}de'
console.log(message, message.charCodeAt(2),
    String.fromCodePoint(0x1f60a), message.codePointAt(2));

console.log(message.length, message.charAt(1),
    message.charAt(2), message.charAt(3), message.charAt(4),
    message.charCodeAt(0), message.charCodeAt(1),
    message.charCodeAt(2), message.charCodeAt(3),
    message.charCodeAt(4), message.charCodeAt(5))

console.log(String.fromCharCode(97, 98, 55357, 56842, 100, 101));
console.log(message.codePointAt(1), message.codePointAt(2),
    message.codePointAt(3), message.codePointAt(4), 0x1f60a);

console.log([...'ab\u{1f60a}de']);

console.log(String.fromCharCode(97, 98, 55357, 56842, 100, 101));
console.log(String.fromCodePoint(97, 98, 128522, 100, 101));
// normalize
let a1 = String.fromCharCode(0x00c5),
    a2 = String.fromCharCode(0x212b),
    a3 = String.fromCharCode(0x0041, 0x030a)

console.log(a1, a2, a3);

console.log(a1 === a2, a2 === a3, a3 === a1);

// 通过比较字符串与其调用 normalize()的返回值，就可以知道该字符串是否已经规范化了：
// U+00C5 是对 0+212B 进行 NFC/NFKC 规范化之后的结果
console.log(a1 === a1.normalize("NFD")); // false 
console.log(a1 === a1.normalize("NFC")); // true 
console.log(a1 === a1.normalize("NFKD")); // false 
console.log(a1 === a1.normalize("NFKC")); // true 
// U+212B 是未规范化的
console.log(a2 === a2.normalize("NFD")); // false 
console.log(a2 === a2.normalize("NFC")); // false 
console.log(a2 === a2.normalize("NFKD")); // false 
console.log(a2 === a2.normalize("NFKC")); // false 
// U+0041/U+030A 是对 0+212B 进行 NFD/NFKD 规范化之后的结果
console.log(a3 === a3.normalize("NFD")); // true 
console.log(a3 === a3.normalize("NFC")); // false 
console.log(a3 === a3.normalize("NFKD")); // true 
console.log(a3 === a3.normalize("NFKC")); // false 
// 选择同一种规范化形式可以让比较操作符返回正确的结果：
console.log(a1.normalize("NFD") === a2.normalize("NFD")); // true 
console.log(a2.normalize("NFKC") === a3.normalize("NFKC")); // true 
console.log(a1.normalize("NFC") === a3.normalize("NFC")); // true

let stringValue = 'hello ';
stringValue += 'world!';
let stringResult = stringValue.concat(' --CZUi', ` ${Date.now()}`);
console.log(stringValue, stringResult);

console.log(stringValue.slice(3), stringValue.substring(3), stringValue.substr(3),
    '\n', stringValue.slice(3, 7), stringValue.substring(3, 7), stringValue.substr(3, 7));

console.log(stringValue.slice(-3)); // "rld" 
console.log(stringValue.substring(-3)); // "hello world" 
console.log(stringValue.substr(-3)); // "rld" 
console.log(stringValue.slice(3, -4)); // "lo w" 
console.log(stringValue.substring(3, -4)); // "hel" 
console.log(stringValue.substr(3, -4)); // "" (empty string) 

console.log(stringValue.indexOf('o'), stringValue.lastIndexOf('o'), stringValue.lastIndexOf('a'));
console.log(stringValue.indexOf('o', 6), stringValue.lastIndexOf('o', 6));

stringValue = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit';
let positions = new Array();
let pos = stringValue.indexOf('e');

while (pos > -1) {
    positions.push(pos++);
    pos = stringValue.indexOf('e', pos);
}

console.log(positions)

// trim()
stringValue = ' hello world ';
let trimmedStringValue = stringValue.trim();
console.log(stringValue);
console.log(trimmedStringValue);

// repeat()
stringValue = 'na ';
console.log(stringValue.repeat(16) + 'batman');

// padStart() padEnd()

stringValue = 'foo';
console.log(stringValue.padStart(6));
console.log(stringValue.padStart(9, '.'));

console.log(stringValue.padEnd(6));
console.log(stringValue.padEnd(9, '.'));

console.log(stringValue.padStart(8, "bar")); // "barbafoo" 
console.log(stringValue.padStart(2)); // "foo" 
console.log(stringValue.padEnd(8, "bar")); // "foobarba" 
console.log(stringValue.padEnd(2)); // "foo"

// iterator and unpacking
message = 'abcde';
let stringIterator = message[Symbol.iterator]();

console.log(stringIterator);
console.log(stringIterator.next());
console.log(stringIterator.next());
console.log(stringIterator.next());
console.log(stringIterator.next());
console.log(stringIterator.next());
console.log(stringIterator.next());

for (const c of message) {
    console.log(c);
}

console.log([...message]);

// toLowerCase() toLocaleLowerCase() toUpperCase() tolocaleUpperCase()
stringValue = "hello world";
console.log(stringValue.toLocaleUpperCase()); // "HELLO WORLD" 
console.log(stringValue.toUpperCase()); // "HELLO WORLD" 
console.log(stringValue.toLocaleLowerCase()); // "hello world" 
console.log(stringValue.toLowerCase()); // "hello world" 

// match
let text = 'cat, bat, sat, fat';
let pattern = /.at/

console.log(pattern.exec(text).index);
console.log(pattern.exec(text)[0]);
console.log(pattern.lastIndex);

console.log(text.replace(/at/g, 'on'));
console.log(text.replace(/(.at)/g, "word ($1)"));

function htmlEscape(text) {
    return text.replace(/[<>"&]/g, function (match, pos, originalText) {
        switch (match) {
            case "<":
                return "&lt;";
            case ">":
                return "&gt;";
            case "&":
                return "&amp;";
            case "\"":
                return "&quot;";
        }
    });
}
console.log(htmlEscape("<p class=\"greeting\">Hello world!</p>"));

let colorText = 'red,blue,green,yellow';
console.log(colorText.split(','));
console.log(colorText.split(',', 2));
console.log(colorText.split(/[^,]+/));

stringValue = "yellow";
console.log(stringValue.localeCompare("brick")); // 1 
console.log(stringValue.localeCompare("yellow")); // 0 
console.log(stringValue.localeCompare("zoo")); // -1 
// 在这里，字符串"yellow"与 3 个不同的值进行了比较："brick"、"yellow"和"zoo"。"brick"
// 按字母表顺序应该排在"yellow"前头，因此 localeCompare()返回 1。"yellow"等于"yellow"，因
// 此"localeCompare()"返回 0。最后，"zoo"在"yellow"后面，因此 localeCompare()返回 - 1。强调
// 一下，因为返回的具体值可能因具体实现而异，所以最好像下面的示例中一样使用 localeCompare()：
function determineOrder(value) {
    let result = stringValue.localeCompare(value);
    if (result < 0) {
        console.log(`The string 'yellow' comes before the string '${value}'.`);
    } else if (result > 0) {
        console.log(`The string 'yellow' comes after the string '${value}'.`);
    } else {
        console.log(`The string 'yellow' is equal to the string '${value}'.`);
    }
}
determineOrder("brick");
determineOrder("yellow");
determineOrder("zoo"); 

