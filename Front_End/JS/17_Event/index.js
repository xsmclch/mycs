// let sheets = document.styleSheets[0];
// console.log(sheets.cssRules[1].cssText);

let clk = document.querySelector('div.clk');
// console.log(clk)
clk.addEventListener('click', (event) => {
    console.log(event.type);
    // console.log(event);
    // console.log(event.type);
    // console.log(event.bubbles); 判断是否冒泡
    event.target.style.backgroundColor = 'rgba(30, 144, 255, 0.6)';
    setTimeout(() => {
        // console.log('ok');
        event.target.style.backgroundColor = 'rgb(30, 144, 255)';
    }, 1500);
    console.log('altKey ?', event.altKey);
    console.log('shiftKey ?', event.shiftKey);
    console.log('ctrlKey ?', event.ctrlKey);
})


// 用户界面事件
window.addEventListener('load', (event) => {
    console.log('Loaded!');
})
window.addEventListener('unload', () => {
    console.log('Unloaded!');
})
window.addEventListener('resize', () => {
    console.log('Resized!');
})
window.addEventListener('scroll', () => {
    console.log('Scrolled!');
})

// 焦点事件
clk.addEventListener('focus', () => {
    console.log('Focused');
})

// 鼠标和滚轮事件 
// 鼠标事件是 Web 开发中最常用的一组事件，这是因为鼠标是用户的主要定位设备。DOM3 Events
// 定义了9种鼠标事件。 
// 1 click：在用户单击鼠标主键（通常是左键）或按键盘回车键时触发。这主要是基于无障碍的考
// 虑，让键盘和鼠标都可以触发onclick事件处理程序。 
// 2 dblclick：在用户双击鼠标主键（通常是左键）时触发。这个事件不是在DOM2 Events中定义
// 的，但得到了很好的支持，DOM3 Events将其进行了标准化。 
// 3 mousedown：在用户按下任意鼠标键时触发。这个事件不能通过键盘触发。 
// 4 mouseenter：在用户把鼠标光标从元素外部移到元素内部时触发。这个事件不冒泡，也不会在
// 光标经过后代元素时触发。mouseenter事件不是在DOM2 Events中定义的，而是DOM3 Events
// 中新增的事件。 
// 5 mouseleave：在用户把鼠标光标从元素内部移到元素外部时触发。这个事件不冒泡，也不会在
// 光标经过后代元素时触发。mouseleave事件不是在DOM2 Events中定义的，而是DOM3 Events
// 中新增的事件。 
// 6 mousemove：在鼠标光标在元素上移动时反复触发。这个事件不能通过键盘触发。 
// 7 mouseout：在用户把鼠标光标从一个元素移到另一个元素上时触发。移到的元素可以是原始元
// 素的外部元素，也可以是原始元素的子元素。这个事件不能通过键盘触发。 
// 8 mouseover：在用户把鼠标光标从元素外部移到元素内部时触发。这个事件不能通过键盘触发。 
// 9 mouseup：在用户释放鼠标键时触发。这个事件不能通过键盘触发。 
// 页面中的所有元素都支持鼠标事件。除了mouseenter和mouseleave，所有鼠标事件都会冒泡，
// 都可以被取消，而这会影响浏览器的默认行为。

// clk.addEventListener('mouseover', (e) => {
//     console.log(e.type);
//     // console.log(e)
// })

// clk.addEventListener('mouseout', (e) => {
//     console.log(e.type);
// })

// 总的来看用mouseenter&mouseleave更好
// 进入内部元素mouseover会重复触发
clk.addEventListener('mouseenter', (e) => {
    start = Date.now();
    console.log(e.type);
})

clk.addEventListener('mouseleave', (e) => {
    end = Date.now();
    console.log(`Staytime = ${(end - start) / 1000}s`);
    console.log(e.type);
})

console.log(Date.now())

let start, end;

clk.addEventListener('mousedown', (e) => {
    start = Date.now();
    console.log(e.type);
})

clk.addEventListener('mouseup', (e) => {
    end = Date.now();
    console.log(`Time = ${(end - start) / 1000}s`);
    console.log(e.type);
})

clk.addEventListener('dblclick', (e) => {
    console.log(e.type);
    console.log(`dblclick position: clientX=${e.clientX}, clientY=${e.clientY}`);
    console.log(`dblclick position-rel: offsetX=${e.offsetX}, offsetY=${e.offsetY}`);
})

document.addEventListener('mouseenter', () => {
    console.log('document mouseenter')
})

let span = document.getElementsByTagName('span')[0];
// console.log(span) 
span.addEventListener('mouseenter', () => {
    console.log('span mouseenter');
})

// 修饰键
// event.altKey, .shiftKey, ctrlKey,当然还可以altLeft, ctrlLeft

// mousewheel
// firefox不行啊
document.addEventListener("mousewheel", (event) => {
    console.log(event.wheelDelta);
}); 