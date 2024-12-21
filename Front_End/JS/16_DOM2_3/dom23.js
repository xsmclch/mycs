// 操作样式表
let sheet = null;
for (let i = 0, len = document.styleSheets.length; i < len; i++) {
    sheet = document.styleSheets[i];
    console.log(sheet.href)
    console.log(sheet)
    console.log(sheet.cssRules)
}

let dv = document.createElement('div');
dv.setAttribute('class', 'hello');
dv.innerHTML = 'Hello world!';
document.body.appendChild(dv);

sheet = document.styleSheets[1];
let rules = sheet.cssRules;
rules[0].style.color = 'violet';

// insertRule
sheet.insertRule('body > div.hello { font-size: 3vw; }', 1);
console.log(sheet.cssRules)
rules[1].style.color = 'dodgerblue';

// deleteRule
sheet.deleteRule(1);