// JSON语法支持表示3种类型的值。 
// 1 简单值：字符串、数值、布尔值和null可以在JSON中出现，就像在JavaScript中一样。特殊
// 值undefined不可以。 
// 2 对象：第一种复杂数据类型，对象表示有序键/值对。每个值可以是简单值，也可以是复杂类型。 
// 3 数组：第二种复杂数据类型，数组表示可以通过数值索引访问的值的有序列表。数组的值可以
// 是任意类型，包括简单值、对象，甚至其他数组。

// 必须用双引号！！！！！！
// 包括String和Object的key

let book = {
    title: "Professional JavaScript",
    authors: [
        "Nicholas C. Zakas",
        "Matt Frisbie"
    ],
    edition: 4,
    year: 2017
};
let jsonText = JSON.stringify(book);
console.log(jsonText);
let bookCopy = JSON.parse(jsonText);
console.log(bookCopy);
console.log('\n\n');


// 过滤
console.log(JSON.stringify(book, ["title", "edition"]));

console.log(JSON.stringify(book, (key, value) => {
    switch (key) {
        case "authors":
            return value.join(",")
        case "year":
            return 5000;
        case "edition":
            return undefined;
        default:
            return value;
    }
}))

// 3. toJSON()方法 
// 有时候，对象需要在JSON.stringify()之上自定义JSON序列化。此时，可以在要序列化的对象
// 中添加toJSON()方法，序列化时会基于这个方法返回适当的JSON表示。事实上，原生Date 对象就
// 有一个toJSON()方法，能够自动将JavaScript的Date 对象转换为ISO 8601日期字符串（本质上与在
// Date 对象上调用toISOString()方法一样）。


// 解析选项
// JSON.parse()方法也可以接收一个额外的参数，这个函数会针对每个键/值对都调用一次。为区别
// 于传给JSON.stringify()的起过滤作用的替代函数（replacer），这个函数被称为还原函数（reviver）。
// 实际上它们的格式完全一样，即还原函数也接收两个参数，属性名（key）和属性值（value），另外也
// 需要返回值。

book = {
    title: "Professional JavaScript",
    authors: [
        "Nicholas C. Zakas",
        "Matt Frisbie"
    ],
    edition: 4,
    year: 2017,
    releaseDate: new Date(2017, 11, 1)
};
jsonText = JSON.stringify(book);
bookCopy = JSON.parse(jsonText,
    (key, value) => key == "releaseDate" ? new Date(value) : value);
console.log(bookCopy.releaseDate.getFullYear()); 