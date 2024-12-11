// 对python str.title()的模仿
let x = 'hello world!'
reg = /\b\w/i
console.log(reg, typeof reg)
console.log(x.toLowerCase().replace(reg, c => c.toUpperCase()))