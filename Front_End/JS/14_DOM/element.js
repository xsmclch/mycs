// Text 类型
//  nodeType 等于 3；
//  nodeName 值为"#text"；
//  nodeValue 值为节点中包含的文本；
//  parentNode 值为 Element 对象；
//  不支持子节点。

// 创建文本节点
let divElement = document.createElement('div');
divElement.className = 'message';

let textNode = document.createTextNode('Hello world!');
divElement.appendChild(textNode);

document.body.appendChild(divElement);

// 元素包含多个文本子节点
let element = document.createElement("div");
element.className = "message*2";

textNode = document.createTextNode("Hello world!");
element.appendChild(textNode);

let anotherTextNode = document.createTextNode("Yippee!");
element.appendChild(anotherTextNode);

document.body.appendChild(element);
// 在将一个文本节点作为另一个文本节点的同胞插入后，两个文本节点的文本之间不会包含空格。

// 规范化文本节点
console.log(`element.childNodes.length = ${element.childNodes.length}`); // 2

element.normalize();
console.log(`after element.normalize(),
element.childNodes.length = ${element.childNodes.length}`); // 1
console.log(`element.firstChild.nodeValue = ${element.firstChild.nodeValue}`);

// 拆分文本节点
// let divElement = document.createElement('div');
// divElement.className = 'message';

// let textNode = document.createTextNode('Hello world!');
// divElement.appendChild(textNode);

// document.body.appendChild(divElement);

let newNode = divElement.firstChild.splitText(5);
console.log(divElement.firstChild.nodeValue);   // "Hello"
console.log(newNode.nodeValue);                 // " world!"
console.log(divElement.childNodes.length);      // 2
// 拆分文本节点最常用于从文本节点中提取数据的 DOM 解析技术。

// 在实际工作中，通常会选择使用 `textContent` 来设置元素的文本内容，而不是使用 `createTextNode()`。这是因为 `textContent` 更简单、更直接，且性能较好。

// ### 选择 `textContent` 的原因：

// 1. **简洁性**: `textContent` 是一个属性，使用它可以非常方便地设置或获取元素的文本内容。例如：

let textContentDiv = document.createElement('div');
textContentDiv.id = 'textContent';
textContentDiv.textContent = '这是一些文本';


// 2. **安全性**: `textContent` 不会自动转义所有插入的内容，防止 XSS（跨站脚本攻击）。它会将 HTML 标签视为普通文本，而不会执行它们。例如：

textContentDiv.textContent = '<b>这是一段加粗文本</b>';

document.body.appendChild(textContentDiv);

console.log('textContentDiv.childNodes.length = ', textContentDiv.childNodes.length);
console.log('nodeType =', textContentDiv.firstChild.nodeType, '由此证明也是Text节点');

// 3. **性能**: `textContent` 是设置元素文本内容时的最佳选择，尤其是在处理较大文本时。它会直接替换整个元素的内容，清除已有的子节点。

// ### 使用 `createTextNode` 的场景：

// `createTextNode()` 主要用于更细粒度的操作，比如你需要手动创建一个文本节点并将其插入到某个特定位置。它适用于一些需要精确控制 DOM 结构的场景，但在设置简单的文本内容时，`createTextNode()` 并不常用。

// 例如：
// ```javascript
// const div = document.createElement('div');
// const textNode = document.createTextNode('这是一些文本');
// div.appendChild(textNode);
// ```

// ### 总结：

// - **常用场景**: 一般情况下，使用 `textContent` 更为常见，因为它简洁、直观，且更安全。
// - **特殊场景**: 如果需要精确控制节点的创建过程，或者在需要插入多个不同类型的节点时，`createTextNode()` 可能会更合适。

// 在大多数日常开发中，`textContent` 是更优选的方法。

// Comment类型
//  nodeType 等于 8；
//  nodeName 值为"#comment"；
//  nodeValue 值为注释的内容；
//  parentNode 值为 Document 或 Element 对象；
//  不支持子节点。
let comElement = document.createElement('div');
comElement.className = 'comElement';

// 创建注释节点
let commentNode = document.createComment('A comment');
comElement.appendChild(commentNode);

document.body.appendChild(comElement);

let comment = comElement.firstChild;
console.log(comment.nodeValue, comment.data, comment.nodeValue === comment.data);


// CDATASection类型
// 仅在XML内适用

//  nodeType 等于 4；
//  nodeName 值为"#cdata-section"；
//  nodeValue 值为 CDATA 区块的内容；
//  parentNode 值为 Document 或 Element 对象；
//  不支持子节点。
// 创建CDATA区块节点
// let CDATANode = document.createCDATASection('This is some content');

// DocumentType类型
// DocumentType 类型的节点包含文档的文档类型（doctype）信息，具有以下特征：
//  nodeType 等于 10；
//  nodeName 值为文档类型的名称；
//  nodeValue 值为 null；
//  parentNode 值为 Document 对象；
//  不支持子节点。
console.log(`document.doctype.name = ${document.doctype.nodeName}`);

// DocumentFragment类型
//  nodeType 等于 11；
//  nodeName 值为"#document-fragment"；
//  nodeValue 值为 null；
//  parentNode 值为 null；
//  子节点可以是 Element、ProcessingInstruction、Comment、Text、CDATASection 或
// EntityReference。

// 首先我们创建要给无顺序列表
let ul = document.createElement('ul');
ul.id = 'myList';

document.body.appendChild(ul);

// 如果要给ul插入三个li需要渲染三次界面，这并不明智，所以可以使用文档片段
let fragment = document.createDocumentFragment();

for (let i = 0; i < 3; i++) {
    let li = document.createElement('li');
    li.textContent = `Item ${i + 1}`;
    fragment.appendChild(li);
}

ul.appendChild(fragment);

// Attr类型
let attrdiv = document.getElementById('setAttr');
let attr = document.createAttribute('class');
attr.value = 'attrdiv';
attrdiv.setAttributeNode(attr);

console.log(attrdiv.attributes['class'].value);
console.log(attrdiv.getAttributeNode('class').value);
console.log(attrdiv.getAttribute('class'));