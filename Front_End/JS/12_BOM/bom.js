var age = 17;
var sayAge = () => alert(this.age);

// 另外，访问未声明的变量会抛出错误，但是可以在window对象上查询是否存在可能未声明的变量。
// 比如： 
// 这会导致抛出错误，因为oldValue没有声明 
try {
    var newValue = oldValue;
} catch (e) {
    console.log(e);
}
// 这不会抛出错误，因为这里是属性查询 
// newValue 会被设置为undefined 
var newValue = window.oldValue

// 窗口关系
// top 对象始终指向最上层（最外层）窗口，即浏览器窗口本身。而parent对象则始终指向当前窗
// 口的父窗口。如果当前窗口是最上层窗口，则parent等于top（都等于window）。最上层的window
// 如果不是通过window.open()打开的，那么其name属性就不会包含值，本章后面会讨论。 
// 还有一个self对象，它是终极window属性，始终会指向window。实际上，self和window就
// 是同一个对象。之所以还要暴露self，就是为了和top、parent保持一致。 
// 这些属性都是window 对象的属性，因此访问 window.parent、window.top 和 window.self
// 都可以。这意味着可以把访问多个窗口的window对象串联起来，比如window.parent.parent。 

// 窗口位置与像素比
// 把窗口移动到左上角
window.moveTo(0, 0);

// 把窗口向下移动100px
window.moveBy(0, 100);

// 把窗口移动到坐标位置
window.moveTo(200, 300);

// 把窗口向左移动50px
window.moveBy(-50, 0);

// 在不同浏览器中确定浏览器窗口大小没有想象中那么容易。所有现代浏览器都支持 4 个属性：
// innerWidth、innerHeight、outerWidth 和 outerHeight。outerWidth 和 outerHeight 返回浏
// 览器窗口自身的大小（不管是在最外层 window 上使用，还是在窗格<frame>中使用）。innerWidth
// 和 innerHeight 返回浏览器窗口中页面视口的大小（不包含浏览器边框和工具栏）。
// document.documentElement.clientWidth 和 document.documentElement.clientHeight
// 返回页面视口的宽度和高度。

let pageWidth = window.innerWidth,
    pageHeight = window.innerHeight;

if (typeof pageWidth != 'number') {
    if (document.compatMode == 'CSS1Compat') {
        pageWidth = document.documentElement.clientWidth;
        pageHeight = document.documentElement.clientHeight;
    } else {
        pageWidth = document.body.clientWidth;
        pageHeight = document.body.clientHeight;
    }
}

// resizeTo() & resizeBy()方法来调整窗口大小
// 与移动窗口的方法一样，缩放窗口的方法可能会被浏览器禁用，而且在某些浏览器中默认是禁用的。
// 缩放到 x * y
window.resizeTo(300, 300);

// 缩放到 (x + 100) * (y + 100)
window.resizeBy(100, 50);

// 视口位置
// 向下滚动100px
window.scrollBy(0, 100);

// 滚动到距离指定坐标原点为左上角，第一个是横向坐标，第二个为纵向坐标
window.scroll(0, 0);

// 可以接受一个ScrollToOptions字典控制偏移值和滚动是否平滑
// 正常滚动
window.scrollTo({
    left: 100,
    top: 100,
    behavior: 'auto'
})

// 平滑
window.scrollBy({
    left: -100,
    top: -100,
    behavior: 'smooth'
})

// 导航与打开新窗口
// window.open()方法可以用于导航到指定URL也可以用于打开新的浏览器窗口
// 可以接受四个参数，要加载的URL，目标窗口，特性字符串和表示新窗口在浏览器历史记录中
// 是否替代当前加载页面的布尔值
// 如果 window.open()的第二个参数是一个已经存在的窗口或窗格（frame）的名字，则会在对应的
// 窗口或窗格中打开 URL。
// window.open('https://www.google.com',
//   'topFrame',
//   "height=400,width=400,top=10,left=10,resizable=yes");

// window.open()方法返回一个对新建窗口的引用。这个对象与普通 window 对象没有区别，只是为
// 控制新窗口提供了方便。例如，某些浏览器默认不允许缩放或移动主窗口，但可能允许缩放或移动通过
// window.open()创建的窗口。跟使用任何 window 对象一样，可以使用这个对象操纵新打开的窗口。
let googleWin = window.open('https://www.google.com',
    'topFrame',
    "height=400,width=400,top=10,left=10,resizable=yes");

// 缩放(不一定能用)
googleWin.resizeTo(500, 500);

// 移动(也不一定能用)
googleWin.moveTo(100, 100);

// 关闭
googleWin.close();

// 这个方法只能用于 window.open()创建的弹出窗口。虽然不可能不经用户确认就关闭主窗口，但
// 弹出窗口可以调用 top.close()来关闭自己。关闭窗口以后，窗口的引用虽然还在，但只能用于检查
// 其 closed 属性了：
googleWin.close();
alert(googleWin.closed); // true 
// 新创建窗口的 window 对象有一个属性 opener，指向打开它的窗口。这个属性只在弹出窗口的最
// 上层 window 对象（top）有定义，是指向调用 window.open()打开它的窗口或窗格的指针。例如：
alert(googleWin.opener === window); // true 


// 2. 安全限制
// 弹出窗口有段时间被在线广告用滥了。很多在线广告会把弹出窗口伪装成系统对话框，诱导用户点
// 击。因为长得像系统对话框，所以用户很难分清这些弹窗的来源。为了让用户能够区分清楚，浏览器开
// 始对弹窗施加限制。
// 比如firefox
// 就是因为被浏览器内置的弹窗屏蔽程序屏蔽了，所以window.open()会返回null!!!
// 因此可以检查这个方法的返回值来知道弹窗是否被屏蔽
let gwin = window.open('https://www.google.com', '_blank');
if (gwin == null) {
    alert('The popup was blocked!');
}

// 也有可能window.open()会抛出错误，所以要用try/catch包装起来
let blocked = false;

try {
    let googleWin = window.open('https://www.google.com', '_blank');
    if (googleWin = null) {
        blocked = true;
    }
} catch (ex) {
    blocked = true;
}
if (blocked) {
    alert("The popup was blocked!")
}

// 定时器
// setTimeout()用于指定在一定时间后执行某些代码
// setInterval()用于指定每隔一段世家执行某些代码
// setTimeout(() => alert('Hello world'), 1000)

// 第二个参数是要等待的毫秒数，而不是要执行代码的确切时间。JavaScript 是单线程的，所以每次
// 只能执行一段代码。为了调度不同代码的执行，JavaScript 维护了一个任务队列。其中的任务会按照添
// 加到队列的先后顺序执行。setTimeout()的第二个参数只是告诉 JavaScript 引擎在指定的毫秒数过后
// 把任务添加到这个队列。如果队列是空的，则会立即执行该代码。如果队列不是空的，则代码必须等待
// 前面的任务执行完才能执行。
// 调用 setTimeout()时，会返回一个表示该超时排期的数值 ID。这个超时 ID 是被排期执行代码的
// 唯一标识符，可用于取消该任务。要取消等待中的排期任务，可以调用 clearTimeout()方法并传入超
// 时 ID，如下面的例子所示：
// 设置超时任务
let timeoutId = setTimeout(() => alert("Hello world!"), 1000);
// 取消超时任务
clearTimeout(timeoutId);
// 只要是在指定时间到达之前调用 clearTimeout()，就可以取消超时任务。在任务执行后再调用
// clearTimeout()没有效果。

// 所有超时执行的代码（函数）都会在全局作用域中的一个匿名函数中运行，因此函
// 数中的 this 值在非严格模式下始终指向 window，而在严格模式下是 undefined。如果
// 给 setTimeout()提供了一个箭头函数，那么 this 会保留为定义它时所在的词汇作用域。

// 所以养成习惯在这个时候一定要用箭头函数

// setInterval()
setInterval(() => alert('Hello world!'), 3000)

//  这里的关键点是，第二个参数，也就是间隔时间，指的是向队列添加新任务之前等
// 待的时间。比如，调用 setInterval()的时间为 01:00:00，间隔时间为 3000 毫秒。这意
// 味着 01:00:03 时，浏览器会把任务添加到执行队列。浏览器不关心这个任务什么时候执行
// 或者执行要花多长时间。因此，到了 01:00:06，它会再向队列中添加一个任务。由此可看
// 出，执行时间短、非阻塞的回调函数比较适合 setInterval()。

// setInterval()也可以取消定时，而且对setInterval来说非常重要
// clearInterval()
let num = 0, intervalId = null;
let max = 10;

intervalId = setInterval(() => {
    num++;
    console.log(`${10 - num} time(s) left...`)

    if (num == max) {
        clearInterval(intervalId);
        alert('Done');
    }
}, 500)

// 注意在使用 setTimeout()时，不一定要记录超时 ID，因为它会在条件满足时自动停止，否则会
// 自动设置另一个超时任务。这个模式是设置循环任务的推荐做法。setIntervale()在实践中很少会在
// 生产环境下使用，因为一个任务结束和下一个任务开始之间的时间间隔是无法保证的，有些循环定时任
// 务可能会因此而被跳过。而像前面这个例子中一样使用 setTimeout()则能确保不会出现这种情况。一
// 般来说，最好不要使用 setInterval()。

// 系统对话框
// 此外，这些对话框都是同步的模态对话框，即在它们显示的时候，代码会停止执行，
// 在它们消失以后，代码才会恢复执行。
// alert()
alert('Hello world!');

// comfirm()
// 点了OK就返回true，点了Cancel就返回false
if (confirm('Scroll down?')) {
    console.log('OK!');
    window.scrollTo({
        left: 0,
        top: 100,
        behavior: 'smooth'
    });
} else {
    console.log("You've canceled!");
}

// prompt
// 比confirm多了一个输入框
// 如果点了Cancel或者对话框被关闭，就返回null，否则返回输入内容
let result = prompt("What is your waifu's name?", "Chino!!!!!");
if (result !== null) {
    alert(result + " saikou!");
}

// 另外两种对话框find() print()是异步的
// 显示打印对话框
// 这个感觉挺好用的
window.print();

// 显示查找对话框
window.find();

// location 是最有用的 BOM 对象之一，提供了当前窗口中加载文档的信息，以及通常的导航功能。
// 这个对象独特的地方在于，它既是 window 的属性，也是 document 的属性。也就是说，
// window.location 和 document.location 指向同一个对象。location 对象不仅保存着当前加载文
// 档的信息，也保存着把 URL 解析为离散片段后能够通过属性访问的信息。

console.log(window.location === document.location); // true
console.log(location.hash); // URL散列值#后面跟零或多个字符，没有则为空字符串
console.log(location.host);	// 服务器及端口号
console.log(location.hostname); // 服务器名
console.log(location.href); // 完整URL
console.log(location.pathname);	// URL中的路径和（或）文件名
console.log(location.port); // 请求的端口，没有就返回空字符串
console.log(location.protocol);  // 页面使用的协议http: or https:
console.log(location.search); // URL的查询字符串问好开头
console.log(location.username); // 域名前指定的用户名
console.log(location.password); // 域名前指定的密码
console.log(location.origin); // URL的源地址，只读

// 查询字符串，格式为?key=value&key=value...
getQueryStringArgs = function () {
    // 去除问号
    let qs = (location.search.length > 0 ? location.search.substring(1) : ''),
        // 保存数据对象
        args = {};
    console.log(qs);

    for (let item of qs.split('&').map(kv => kv.split("="))) {
        // 参数名和参数值在使用 decodeURIComponent()解码（这是因为
        // 查询字符串通常是被编码后的格式）
        let name = decodeURIComponent(item[0]),
            value = decodeURIComponent(item[1]);
        //     let name = item[0],
        //         value = item[1];
        console.log(item);
        if (name.length) {
            args[name] = value;
        }
    }
    return args;
}

args = getQueryStringArgs();
console.log(args['client']);    // firefox-b-d
console.log(args['q']);         // helloworld
console.log(location.search);   // ?client=firefox-b-d&q=helloworld

// URLSearchParams 提供了一组标准 API 方法，通过它们可以检查和修改查询字符串。给
// URLSearchParams 构造函数传入一个查询字符串，就可以创建一个实例。这个实例上暴露了 get()、
// set()和 delete()等方法，可以对查询字符串执行相应操作。下面来看一个例子：
let qs = '?q=javascript&num=10';

let searchParam = new URLSearchParams(qs);

alert(searchParam.toString());
searchParam.has('num');
searchParam.get('num');

searchParam.set('page', '3');
alert(searchParam.toString());

searchParam.delete('q');
alert(searchParam.toString());

searchParam = new URLSearchParams(qs);

// 大多数支持 URLSearchParams 的浏览器也支持将 URLSearchParams 的实例用作可迭代对象：
for (let param of searchParam) {
    console.log(param);
}

// 操作地址
location.assign("https://www.youtube.com");
// 这行代码会立即启动导航到新 URL 的操作，同时在浏览器历史记录中增加一条记录。如果给
// location.href 或 window.location 设置一个 URL，也会以同一个 URL 值调用 assign()方法。比
// 如，下面两行代码都会执行与显式调用 assign()一样的操作：
window.location = "https://www.youtube.com";
location.href = "https://www.youtube.com";
// 在这 3 种修改浏览器地址的方法中，设置 location.href 是最常见的。
// 修改 location 对象的属性也会修改当前加载的页面。其中，hash、search、hostname、pathname
// 和 port 属性被设置为新值之后都会修改当前 URL，如下面的例子所示：
// 假设当前 URL 为 http://www.wrox.com/WileyCDA/ 
// 把 URL 修改为 http://www.wrox.com/WileyCDA/#section1 
location.hash = "#section1";
// 把 URL 修改为 http://www.wrox.com/WileyCDA/?q=javascript 
location.search = "?q=javascript";
// 把 URL 修改为 http://www.somewhere.com/WileyCDA/ 
location.hostname = "www.somewhere.com";
// 把 URL 修改为 http://www.somewhere.com/mydir/ 
location.pathname = "mydir";
// 把 URL 修改为 http://www.somewhere.com:8080/WileyCDA/ 
location.port = 8080;
// 除了 hash 之外，只要修改 location 的一个属性，就会导致页面重新加载新 URL。

// 在以前面提到的方式修改 URL 之后，浏览器历史记录中就会增加相应的记录。当用户单击“后退”
// 按钮时，就会导航到前一个页面。如果不希望增加历史记录，可以使用 replace()方法。这个方法接
// 收一个 URL 参数，但重新加载后不会增加历史记录。调用 replace()之后，用户不能回到前一页。比
// 如下面的例子：
// < !DOCTYPE html >
//     <html>
//         <head>
//             <title>You won't be able to get back here</title>
//         </head>
//         <body>
//             <p>Enjoy this page for a second, because you won't be coming back here.</p>
//             <script> 
//  setTimeout(() => location.replace("http://www.wrox.com/"), 1000);
//             </script>
//         </body>
//     </html> 

// 最后一个修改地址的方法是 reload()，它能重新加载当前显示的页面。调用 reload()而不传参
// 数，页面会以最有效的方式重新加载。也就是说，如果页面自上次请求以来没有修改过，浏览器可能会
// 从缓存中加载页面。如果想强制从服务器重新加载，可以像下面这样给 reload()传个 true：
location.reload(); // 重新加载，可能是从缓存加载
location.reload(true); // 重新加载，从服务器加载
// 脚本中位于 reload()调用之后的代码可能执行也可能不执行，这取决于网络延迟和系统资源等因
// 素。为此，最好把 reload()作为最后一行代码。

// Navigator对象
// navigator 是由 Netscape Navigator 2 最早引入浏览器的，现在已经成为客户端标识浏览器的标准。
// 只要浏览器启用 JavaScript，navigator 对象就一定存在。但是与其他 BOM 对象一样，每个浏览器都
// 支持自己的属性。
// navigator 对象实现了 NavigatorID 、 NavigatorLanguage 、 NavigatorOnLine 、
// NavigatorContentUtils 、 NavigatorStorage 、 NavigatorStorageUtils 、 Navigator-ConcurrentHardware、NavigatorPlugins 和 NavigatorUserMedia 接口定义的属性和方法
console.log(navigator.appName);
console.log(navigator.appCodeName);
console.log(navigator.languages);
// 检查插件
// plugins数组来确定，数组中的每一项都包含了如下属性
// name:插件名称
// description:插件介绍
// filename:插件的文件名
// length:由当前插件处理的MIME类型数量
// eg检测Flash
// 插件检测，IE10 及更低版本无效 
let hasPlugin = function (name) {
    name = name.toLowerCase();
    for (let plugin of window.navigator.plugins) {
        if (plugin.name.toLowerCase().indexOf(name) > -1) {
            return true;
        }
    }
    return false;
}

console.log(navigator.plugins);

console.log(hasPlugin('PDF Viewer'));


// 12.3.2 注册处理程序
// 现代浏览器支持 navigator 上的（在 HTML5 中定义的）registerProtocolHandler()方法。
// 这个方法可以把一个网站注册为处理某种特定类型信息应用程序。随着在线 RSS 阅读器和电子邮件客户
// 端的流行，可以借助这个方法将 Web 应用程序注册为像桌面软件一样的默认应用程序。
// 要使用 registerProtocolHandler()方法，必须传入 3 个参数：要处理的协议（如"mailto"或
// "ftp"）、处理该协议的 URL，以及应用名称。比如，要把一个 Web 应用程序注册为默认邮件客户端，
// 可以这样做：
// navigator.registerProtocolHandler("mailto",
//     "http://www.somemailclient.com?cmd=%s",
//     "Some Mail Client");
// window 的另一个属性 screen 对象，是为数不多的几个在编程中很少用的 JavaScript 对象。这个对
// 象中保存的纯粹是客户端能力信息，也就是浏览器窗口外面的客户端显示器的信息，比如像素宽度和像
// 素高度。每个浏览器都会在 screen 对象上暴露不同的属性。下表总结了这些属性。

console.log(window.screen.height);
console.log(window.screen.width);
console.log(window.innerHeight);
console.log(window.innerWidth);

// history 对象表示当前窗口首次使用以来用户的导航历史记录。因为 history 是 window 的属性，
// 所以每个 window 都有自己的 history 对象。出于安全考虑，这个对象不会暴露用户访问过的 URL，
// 但可以通过它在不知道实际 URL 的情况下前进和后退。

// 后退一页
history.go(-1);
// 前进一页
history.go(1);
// 前进两页
history.go(2);

// go()有两个简写方法：back()和 forward()。顾名思义，这两个方法模拟了浏览器的后退按钮和
// 前进按钮：
// 后退一页
history.back();
// 前进一页
history.forward();

// history 对象还有一个 length 属性，表示历史记录中有多个条目。这个属性反映了历史记录的数
// 量，包括可以前进和后退的页面。对于窗口或标签页中加载的第一个页面，history.length 等于 1。
// 通过以下方法测试这个值，可以确定用户浏览器的起点是不是你的页面：
if (history.length == 1) {
    // 这是用户窗口中的第一个页面
}

// hashchange 会在页面 URL 的散列变化时被触发，开发者可以在此时执行某些操作。而状态管理
// API 则可以让开发者改变浏览器 URL 而不会加载新页面。为此，可以使用 history.pushState()方
// 法。这个方法接收 3 个参数：一个 state 对象、一个新状态的标题和一个（可选的）相对 URL。例如：
let stateObject = {
    foo: "bar"
};
history.pushState(stateObject, "My title", "baz.html");
// pushState()方法执行后，状态信息就会被推到历史记录中，浏览器地址栏也会改变以反映新的相
// 对 URL。除了这些变化之外，即使 location.href 返回的是地址栏中的内容，浏览器页不会向服务器
// 发送请求。第二个参数并未被当前实现所使用，因此既可以传一个空字符串也可以传一个短标题。第一
// 个参数应该包含正确初始化页面状态所必需的信息。为防止滥用，这个状态的对象大小是有限制的，通
// 常在 500KB～1MB 以内。


// 因为 pushState()会创建新的历史记录，所以也会相应地启用“后退”按钮。此时单击“后退”
// 按钮，就会触发 window 对象上的 popstate 事件。popstate 事件的事件对象有一个 state 属性，其
// 中包含通过 pushState()第一个参数传入的 state 对象：
window.addEventListener("popstaste", (event) => {
    let state = event.state;
    if (state) { // 第一个页面加载时状态是 null 
        //     processState(state);
    }
});
// 基于这个状态，应该把页面重置为状态对象所表示的状态（因为浏览器不会自动为你做这些）。记
// 住，页面初次加载时没有状态。因此点击“后退”按钮直到返回最初页面时，event.state 会为 null。
// 可以通过 history.state 获取当前的状态对象，也可以使用 replaceState()并传入与
// pushState()同样的前两个参数来更新状态。更新状态不会创建新历史记录，只会覆盖当前状态：
// history.replaceState({newFoo: "newBar"}, "New title");
// 传给 pushState()和 replaceState()的 state 对象应该只包含可以被序列化的信息。因此，
// DOM 元素之类并不适合放到状态对象里保存