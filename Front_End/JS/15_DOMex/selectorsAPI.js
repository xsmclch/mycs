console.log('selectorAPI.js is loaded.')

// querySelector()
// get body
let body = document.querySelector('body');
// body.textContent = 'Hello world';
body.appendChild(document.createTextNode('Hello world!'));

// get #mydiv
let mydiv = document.querySelector('#div2');

// get the first item of class selected
let selected = document.querySelector('.selector');

// querySelectorAll()
let divs = document.querySelectorAll('div');
console.log(divs);



// matches()
// matches()方法（在规范草案中称为matchesSelector()）接收一个CSS选择符参数，如果元素
// 匹配则该选择符返回true，否则返回false。例如： 
console.log(document.body.matches('body'))
// 使用这个方法可以方便地检测某个元素会不会被 querySelector()或 querySelectorAll()方
// 法返回。 