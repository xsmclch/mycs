// 1.readyState属性
console.log(document.readyState)

// compatMode
console.log(document.compatMode)

// head
console.log(document.head)

console.log(document.characterSet)
document.characterSet = 'UTF-16'
console.log(document.characterSet)

// innerHMTL
let hldiv = document.createElement('div')
hldiv.innerHTML = 'Hello & welcome, <b>"reader"!</b>'
document.body.appendChild(hldiv)

// 替换掉了
// hldiv.outerHTML = '<p>This is a paragraph.</p>'

// insertAdjacentHTML
// beforebegin就是前，afterbegin就是第一个子节点
// 同理beforeend，afterend
hldiv.insertAdjacentHTML('beforebegin', '<p>Good bye!</p>')
hldiv.insertAdjacentHTML('afterbegin', '<i>Nice to meet you</i> &nbsp')

// 不要频繁调用innerHTML

// XSS，innerHTML隔离要插入的数据，或者毫不犹豫地使用相关库转义

// scrollIntoView()
mydiv.scrollIntoView()

// children, childNodes
console.log(document.body.children)
console.log(document.body.childNodes)
console.log(document.body.children == document.body.childNodes)

// contains
console.log(document.documentElement)
console.log(document.documentElement.contains(document.body))

// innerText & outerText
