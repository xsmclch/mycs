console.log('Hello World!');

div = document.getElementById('myDiv');
console.log(document.getElementsByTagName('div').length);
console.log(div.tagName);
console.log(div.tagName === div.nodeName);

// 附加信息，但还没有添加到文档树
div = document.createElement('div');
div.id = 'myNewDiv';
div.className = 'box';

// 添加到文档树，浏览器会立即渲染
document.body.appendChild(div);

console.log(document.getElementsByTagName('div').length);

document.body.replaceChild(div, document.body.firstChild);

console.log(document.getElementsByTagName('div').length);