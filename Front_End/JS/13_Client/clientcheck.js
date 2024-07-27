// 基于能力检测进行浏览器分析

// 检测特性
// 检测留恋其是否支持Netscape式的插件
console.log(!!(navigator.plugins && navigator.plugins.length));

// 检测浏览器是否具有DOM Level 1能力
console.log(!!(document.getElementById && document.createElement &&
    document.getElementsByTagName));

// 检测浏览器
class BrowserDetector {
    constructor() {
        // 测试条件编译
        // IE6~10 支持
        this.isIE_Gte6Lte10 = /*@cc_on!@*/ false;
        // 测试 documentMode 
        // IE7~11 支持
        this.isIE_Gte7Lte11 = !!document.documentMode;
        // 测试 StyleMedia 构造函数
        // Edge 20 及以上版本支持
        this.isEdge_Gte20 = !!window.StyleMedia;
        // 测试 Firefox 专有扩展安装 API 
        // 所有版本的 Firefox 都支持
        this.isFirefox_Gte1 = typeof InstallTrigger !== 'undefined';
        // 测试 chrome 对象及其 webstore 属性
        // Opera 的某些版本有 window.chrome，但没有 window.chrome.webstore 
        // 所有版本的 Chrome 都支持
        this.isChrome_Gte1 = !!window.chrome && !!window.chrome.webstore;
        // Safari 早期版本会给构造函数的标签符追加"Constructor"字样，如：
        // window.Element.toString(); // [object ElementConstructor] 
        // Safari 3~9.1 支持
        this.isSafari_Gte3Lte9_1 = /constructor/i.test(window.Element);
        // 推送通知 API 暴露在 window 对象上
        // 使用默认参数值以避免对 undefined 调用 toString() 
        // Safari 7.1 及以上版本支持
        this.isSafari_Gte7_1 =
            (({
                pushNotification = {}
            } = {}) =>
                pushNotification.toString() == '[object SafariRemoteNotification]'
            )(window.safari);
        // 测试 addons 属性
        // Opera 20 及以上版本支持
        this.isOpera_Gte20 = !!window.opr && !!window.opr.addons;
    }
    isIE() {
        return this.isIE_Gte6Lte10 || this.isIE_Gte7Lte11;
    }
    isEdge() {
        return this.isEdge_Gte20 && !this.isIE();
    }
    isFirefox() {
        return this.isFirefox_Gte1;
    }
    isChrome() {
        return this.isChrome_Gte1;
    }
    isSafari() {
        return this.isSafari_Gte3Lte9_1 || this.isSafari_Gte7_1;
    }
    isOpera() {
        return this.isOpera_Gte20;
    }
}

let bd = new BrowserDetector();

console.log('FireFox?', bd.isFirefox());

// 用户代理检测
// 用户代理检测通过浏览器的用户代理字符串确定使用的是什么浏览器。用户代理字符串包含在每个
// HTTP 请求的头部，在 JavaScript 中可以通过 navigator.userAgent 访问。在服务器端，常见的做法
// 是根据接收到的用户代理字符串确定浏览器并执行相应操作。而在客户端，用户代理检测被认为是不可
// 靠的，只应该在没有其他选项时再考虑。
console.log(navigator.userAgent);

// 识别浏览器和操作系统
// 1.navigator.osscpu
console.log(navigator.oscpu);
// 2.navigator.vendor
console.log(navigator.vendor);
// 3.navigator.platform
console.log(navigator.platform);
// 4.screen.colorDepth & screen.pixelDepth
console.log(screen.colorDepth);
console.log(screen.pixelDepth);
// 5.screen.orientation
console.log(screen.orientation);

// 电池，似乎并不是所有的浏览器都能使用，返回一个promise
navigator.getBattery().then((b) => console.log(b));

// CPU核心数
console.log(navigator.hardwareConcurrency);