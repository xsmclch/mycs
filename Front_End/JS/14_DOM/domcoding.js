console.log('这里是静态加载的 domcoding.js');
let script = document.createElement('script');
script.src = 'foo.js';
document.body.appendChild(script);

// 可以抽象成一个函数，添加到head函数
function loadScript(url) {
    let script = document.createElement('script');
    script.src = url;
    document.head.appendChild(script);
}

// 动态插入源代码
script = document.createElement('script');
script.appendChild(document.createTextNode("console.log('这里是动态插入的源代码，Hello world!');"));
// 当然也可以这么做---使用script.text属性
// script.text = "console.log('hello world');";
document.body.appendChild(script);

// 动态样式
// CSS 样式在 HTML 页面中可以通过两个元素加载。<link>元素用于包含 CSS 外部文件，而<style>
// 元素用于添加嵌入样式。与动态脚本类似，动态样式也是页面初始加载时并不存在，而是在之后才添加
// 到页面中的。
let link = document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = 'styles.css';
let head = document.getElementsByTagName('head')[0];
head.appendChild(link);

function loadStyles(url) {
    let link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = url;
    let head = document.getElementsByTagName('head')[0];
    head.appendChild(link);
}

// 动态插入
let style = document.createElement('style');
style.type = 'text/css';
style.appendChild(document.createTextNode('body{background-color:rgba(255,255,0,0.3)}'));
head.appendChild(style);

// 创建表格
let table = document.createElement("table");
table.border = 1;
table.width = '100%';

// 创建表体
let tbody = document.createElement('tbody');
table.appendChild(tbody);

// 创建第一行
tbody.insertRow(0);
tbody.rows[0].insertCell(0);
tbody.rows[0].cells[0].textContent = 'Cell 1,1';
tbody.rows[0].insertCell(1);
tbody.rows[0].cells[1].textContent = 'Cell 2,1';

// 创建第二行
tbody.insertRow(1);
tbody.rows[1].insertCell(0);
tbody.rows[1].cells[0].textContent = 'Cell 1,2';
tbody.rows[1].insertCell(1);
tbody.rows[1].cells[1].textContent = 'Cell 2,2';

// 把表格添加到文档主体
document.body.appendChild(table);

// MutationObserver接口，DOM被修改时异步执行回调
let observer = new MutationObserver(() => console.log('<body> attributes changed'));

observer.observe(document.body, { attributes: true });

document.body.className = 'foo';
console.log('CHanged body class');

let observer1 = new MutationObserver(
    (mutationRecords) => console.log(mutationRecords)
);

observer1.observe(document.body, { attributes: true });

document.body.setAttribute('foo', 'bar');