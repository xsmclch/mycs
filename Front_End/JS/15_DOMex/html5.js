// CSS类扩展

// 1.getElementByClassName()
// 取得所有类名中包含user和name的元素
// 返回值是NodeList
let allUserName = document.getElementsByClassName('user name');

// 2.classList属性
// 要操作类名可以通过className属性
// 这是一个NodeList
let div = document.getElementsByClassName('user bd disabled')[0]
// 删除user类
let targetClass = 'user';
// 拆成数组
let classNames = div.className.split(/\s+/);
// 滤掉目标类名，再重新更改
div.className = classNames.filter(n => n != targetClass).join(" ");

// CRUD接口
div.classList.remove('disabled');
div.classList.add('current');
div.classList.toggle('user');
console.log(`div.classList.contains('bd')=${div.classList.contains('bd')}`);

// HTML5增加了辅助DOM焦点管理的功能。首先是document.activeElement，始终包含当前拥
// 有焦点的DOM元素。页面加载时，可以通过用户输入（按Tab键或代码中使用focus()方法）让某个
// 元素自动获得焦点。例如： 

let button = document.createElement('button');
button.id = 'myButton';
document.body.appendChild(button);
button.focus(); 
console.log(document.activeElement === button); // true 
// 默认情况下，document.activeElement 在页面刚加载完之后会设置为 document.body。而在
// 页面完全加载之前，document.activeElement 的值为null。 
// 其次是document.hasFocus()方法，该方法返回布尔值，表示文档是否拥有焦点： 
button = document.getElementById("myButton"); 
button.focus(); 
console.log(document.hasFocus()); // true 