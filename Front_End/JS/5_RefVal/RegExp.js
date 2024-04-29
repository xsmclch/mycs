let pattern1 = /[bc]at/i;
let pattern2 = new RegExp('[bc]at', 'i');
console.log(pattern1, pattern2);
console.log(pattern1 == pattern2); // 引用类型比较的是内存，故false

console.log(pattern1.source, pattern1.flags);

let text = 'mom and dad and baby';
let pattern = /mom( and dad( and baby)?)?/gi;

let matches = pattern.exec(text);
console.log(typeof matches, matches instanceof Array, '\n', matches);
console.log(matches.index);
console.log(matches.input);
console.log(matches[0]);
console.log(matches[1]);
console.log(matches[2]);

let textb = 'cat, bat, sat, fat';
let patternb = /.at/;
let patternbg = /.at/g;

let matchesb = patternb.exec(textb);
console.log(matchesb.index);
console.log(matchesb[0]);
console.log(patternb.lastIndex); // 在非全局模式下lastIndex始终不变

let matchesbg = patternbg.exec(textb);
console.log(matchesbg.index);
console.log(matchesbg[0]);
console.log(patternbg.lastIndex);

matchesbg = patternbg.exec(textb);
console.log(matchesbg.index);
console.log(matchesbg[0]);
console.log(patternbg.lastIndex);

matchesbg = patternbg.exec(textb);
console.log(matchesbg.index);
console.log(matchesbg[0]);
console.log(patternbg.lastIndex);

let textc = 'this has been a short summer';
let patternc = /(.)hort/g;

// RegExp 构造函数的所有属性都没有任何 Web 标准出处，因此不要在生产环境中使
// 用它们。
if (patternc.test(textc)) {
    console.log(RegExp.input);
    console.log(RegExp.leftContext);
    console.log(RegExp.rightContext);
    console.log(RegExp.lastMatch);
    console.log(RegExp.lastParen);
    console.log(RegExp.$_);
}