// 发送 GET 请求
fetch('http://localhost:1999')
    .then(response => {
        console.log(`response.status = ${response.status}`);
        console.log(`response.statusText = ${response.statusText}`);
        return response.json();
    }, err => Promise.reject(err))  // 解析 JSON 响应
    .then(data => console.log('GET Response:', data))
    .catch(error => console.error('Error during GET request:', error));


// return;

// 发送 POST 请求
const postData = { name: 'example', value: 123 };

fetch('http://localhost:1999', {
    method: 'POST',  // HTTP 方法
    headers: {
        'Content-Type': 'application/json'  // 设置请求头
    },
    body: JSON.stringify(postData)  // 请求体
})
    .then(response => response.json(), err => Promise.reject(err))  // 解析 JSON 响应
    .then(data => console.log('POST Response:', data))
    .catch(error => console.error('Error during POST request:', error));


// 1. 发送 JSON数据
// 可以像下面这样发送简单JSON字符串：
let payload = JSON.stringify({
    foo: 'bar'
});
let jsonHeaders = new Headers({
    'Content-Type': 'application/json'
});
// console.log(jsonHeaders)
fetch('http://localhost:1999', {
    method: 'POST',   // 发送请求体时必须使用一种HTTP方法 
    body: payload,
    headers: jsonHeaders
})
    .then(response => response.json(), err => Promise.reject(err))  // 解析 JSON 响应
    .then(data => console.log('POST Response:', data))
    .catch(error => console.error('Error during POST request:', error));



// 发送文件
let imageFormData = new FormData();
let img;
imageFormData.append('image', img);
fetch('/img-upload', {
    method: 'POST',
    body: imageFormData
}).catch(() => { })

// 加载Blob文件
// const imageElement = document.querySelector('img');
fetch('my-image.png')
    .then((response) => response.blob(), () => Promise.reject())
    .then((blob) => {
        imageElement.src = URL.createObjectURL(blob);
    }).catch(() => { });

// 中断请求
// Fetch API 支持通过 AbortController/AbortSignal 对中断请求。调用 AbortController. 
// abort()会中断所有网络传输，特别适合希望停止传输大型负载的情况。中断进行中的fetch()请求会
// 导致包含错误的拒绝。
let abortController = new AbortController();

fetch('http://127.0.0.1:1999', { signal: abortController.signal })
    .catch(() => console.log('\n请求终端aborted!\n'));

setTimeout(() => abortController.abort(), 1); // 1ms后中断



// Headers对象
let h = new Headers();
let m = new Map();

// 相似
// C
h.set('foo', 'bar');
m.set('foo', 'bar');

console.log(h);
console.log();
console.log(m);

// R
console.log(h.has('foo'));
console.log(m.has('foo'));
console.log(h.has('qux'));
console.log(m.has('qux'));
console.log(h.get('foo'));
console.log(m.get('foo'));

// U
h.set('foo', 'baz');
m.set('foo', 'baz');

// D
h.delete('foo');
m.delete('foo');

console.log(h);
console.log(m);

// 用可迭代对象初始化
let seed = [['foo', 'bar'], ['baz', 'qux']];

h = new Headers(seed);
m = new Headers(seed);

console.log(h.get('foo'));
console.log(m.get('foo'));

// keys(), values(), entries()
console.log(...h.keys());
console.log(...m.keys());

console.log(...h.values());
console.log(...m.values());

console.log(...h.entries());
console.log(...m.entries());

// 但是Header可以用键值对而Map不行
seed = { foo: 'bar' };
h = new Headers(seed)

try {
    m = new Map(seed);
} catch (e) {
    if (e instanceof TypeError) {
        console.log(e.name, e.message);
    }
}

// Request对象
let r = new Request('http://127.0.0.1:1999', { method: 'POST', body: 'foobar' });
console.log(r.method, r.bodyUsed);
// 克隆Request对象,不是很好
let rp = new Request(r, { method: 'POST' });
console.log(rp.method, r.bodyUsed);

// better
r = new Request('http://127.0.0.1:1999', { method: 'POST', body: 'foobar' });
console.log(r.method, r.bodyUsed);
// 克隆Request对象,不是很好
rp = r.clone();
console.log(rp.method, r.bodyUsed);

// fetch()和 Request 构造函数拥有相同的函数签名并不是巧合。在调用fetch()时，可以传入已
// 经创建好的Request 实例而不是URL。与Request 构造函数一样，传给fetch()的init 对象会覆
// 盖传入请求对象的值： 
// r = new Request('https://foo.com');
// 向foo.com 发送GET 请求 
// fetch(r);
// 向foo.com 发送POST 请求 
// fetch(r, { method: 'POST' }).then(() => { });
// fetch()会在内部克隆传入的Request对象。与克隆Request一样，fetch()也不能拿请求体已
// 经用过的Request对象来发送请求：
// 关键在于，通过fetch使用Request会将请求体标记为已使用。也就是说，有请求体的Request
// 只能在一次fetch中使用。（不包含请求体的请求不受此限制。）演示如下：

const request = new Request('http://127.0.0.1:1999', {
    method: 'POST',
    body: JSON.stringify({ key: 'value' }),
    headers: {
        'Content-Type': 'application/json'
    }
});

// 第一次 fetch 请求，成功发送请求体
fetch(request)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));

// 试图再次使用相同的 Request 对象发送请求，会导致错误
fetch(request)  // 这里会报错，因为请求体已被消耗
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error.name, error.message));  // 错误：Request body has been used already


// Response对象
let res = new Response();
// console.log(res);

res = new Response('foobar', {
    status: 555,
    statusText: 'Never gonna give you up'
});
console.log(res);
// Response 类还有两个用于生成Response 对象的静态方法：Response.redirect()和Response. 
// error()。前者接收一个URL和一个重定向状态码（301、302、303、307或308），返回重定向的Response
// 对象：
// 提供的状态码必须对应重定向，否则会抛出错误：
console.log(Response.redirect('http://127.0.0.1:1999'))
// 另一个静态方法Response.error()用于产生表示网络错误的 Response 对象（网络错误会导致
// fetch()期约被拒绝）。
console.log(Response.error());

// 3. 克隆 Response 对象 
// 克隆Response 对象的主要方式是使用 clone()方法，这个方法会创建一个一模一样的副本，不
// 会覆盖任何值。这样不会将任何请求的请求体标记为已使用：
// 如果响应对象的bodyUsed属性为true（即响应体已被读取），则不能再创建这个对象的副本。在
// 响应体被读取之后再克隆会导致抛出TypeError。 

let res1 = new Response('foobar');
res1.clone();
console.log(res1.body)
// 没有错误 

res1.text();  // 设置bodyUsed 为true 
try { res1.clone(); } catch (e) { console.log(e.name, e.message); }
// TypeError: Response.clone: Body has already been consumed.


// Body
// 1. Body.text() 
let req1 = new Request('https://foo.com',
    { method: 'POST', body: 'This is a body of a resquest' });
req1.text().then(console.log);

let rep1 = new Response('foobar', {
    status: 555,
    statusText: 'This is a body of a response'
});
rep1.text().then(console.log);

// 2. Body.json() 
// Body.json()方法返回期约，解决为将缓冲区转存得到的JSON。下面的代码展示了在Response
// 对象上使用Body.json()： 
// fetch('https://foo.com/foo.json') 
// .then((response) => response.json()) 
//   .then(console.log); 
// {"foo": "bar"} 
// 以下代码展示了在Request对象上使用Body.json()： 
let req = new Request('https://foo.com',
    { method: 'POST', body: JSON.stringify({ bar: 'baz' }) });
req.json()
    .then((json) => { console.log(11111111111111, json); console.log(JSON.stringify(json)) });
// {bar: 'baz'} 


console.log('\n\n\n\n\n')
console.log('-----sync/async-----');
console.log('\n\n\n\n\n')