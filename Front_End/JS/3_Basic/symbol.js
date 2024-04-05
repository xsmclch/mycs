// 内置符号

// Symbol.asyncIterator

class Foo {
    async *[Symbol.asyncIterator]() {
    }
}

let f = new Foo();

console.log(f[Symbol.asyncIterator]());

class Emitter {
    constructor(max) {
        this.max = max;
        this.asyncIdx = 0;
    }
    async *[Symbol.asyncIterator]() {
        while (this.asyncIdx < this.max) {
            yield new Promise((resolve) => resolve(this.asyncIdx++));
        }
    }
}
async function asyncCount() {
    let emitter = new Emitter(5);
    for await (const x of emitter) {
        console.log(x);
    }
}

// asyncCount();

// Symbol.isConcatSpreadable

let initial = ['foo'];

let array = ['bar'];
console.log(array[Symbol.isConcatSpreadable]);
console.log(initial.concat(array));

array[Symbol.isConcatSpreadable] = false;
console.log(initial.concat(array));

// Symbol.iterator

class Foo1 {
    *[Symbol.iterator]() {
    }
}

let f1 = new Foo1();

console.log(f1[Symbol.iterator]());

class Emitter2 {
    constructor(max) {
        this.max = max;
        this.idx = 0;
    }
    *[Symbol.iterator]() {
        while (this.idx < this.max) {
            yield this.idx++;
        }
    }
}
function count() {
    let emitter = new Emitter2(5);
    for (const x of emitter) {
        console.log(x);
    }
}
count();

// Symbol.match
// reg
console.log(RegExp.prototype[Symbol.match])

console.log('foobar'.match(/bar/));

class FooMatcher {
    static [Symbol.match](target) {
        return target.includes('foo');
    }
}
console.log('foobar'.match(FooMatcher)); // true 
console.log('barbaz'.match(FooMatcher)); // false 
class StringMatcher {
    constructor(str) {
        this.str = str;
    }
    [Symbol.match](target) {
        return target.includes(this.str);
    }
}

console.log('foobar'.match(new StringMatcher('foo'))); // true 
console.log('barbaz'.match(new StringMatcher('qux'))); // false 

// Symbol.replace

console.log(RegExp.prototype[Symbol.replace]);

console.log('foobarbaz'.replace(/bar/, 'qux'));

class FooReplacer {
    static [Symbol.replace](target, replacement) {
        return target.split('foo').join(replacement);
    }
}

console.log('barfoobaz'.replace(FooReplacer, 'qux'));
// "barquxbaz" 
class StringReplacer {
    constructor(str) {
        this.str = str;
    }
    [Symbol.replace](target, replacement) {
        return target.split(this.str).join(replacement);
    }
}
console.log('barfoobaz'.replace(new StringReplacer('foo'), 'qux'));
// "barquxbaz" 

// Symbol.search
console.log(RegExp.prototype[Symbol.search]);

console.log('foobar'.search(/bar/));

class FooSearcher {
    static [Symbol.search](target) {
        return target.indexOf('foo');
    }
}
console.log('foobar'.search(FooSearcher)); // 0 
console.log('barfoo'.search(FooSearcher)); // 3 
console.log('barbaz'.search(FooSearcher)); // -1 
class StringSearcher {
    constructor(str) {
        this.str = str;
    }
    [Symbol.search](target) {
        return target.indexOf(this.str);
    }
}
console.log('foobar'.search(new StringSearcher('foo'))); // 0 
console.log('barfoo'.search(new StringSearcher('foo'))); // 3 
console.log('barbaz'.search(new StringSearcher('qux'))); // -1 


// Symbol.species

class Bar extends Array { }
class Baz extends Array {
    static get [Symbol.species]() {
    }
}

let bar = new Bar();
console.log(bar instanceof Array); // true 
console.log(bar instanceof Bar); // true 
bar = bar.concat('bar');
console.log(bar instanceof Array); // true 
console.log(bar instanceof Bar); // true 
let baz = new Baz();
console.log(baz instanceof Array); // true 
console.log(baz instanceof Baz); // true 
baz = baz.concat('baz');
console.log(baz instanceof Array); // true 
console.log(baz instanceof Baz); // false

// Symbol.split

console.log(RegExp.prototype[Symbol.split]);

console.log('foobarbaz'.split(/bar/));

class FooSplitter {
    static [Symbol.split](target) {
        return target.split('foo');
    }
}
console.log('barfoobaz'.split(FooSplitter));
// ["bar", "baz"] 
class StringSplitter {
    constructor(str) {
        this.str = str;
    }
    [Symbol.split](target) {
        return target.split(this.str);
    }
}
console.log('barfoobaz'.split(new StringSplitter('foo')));
// ["bar", "baz"] 

// Symbol.toPrimitive

class Foo2 { }
let foo = new Foo2();

console.log(3 + foo);
console.log(3 - foo);
console.log(String(foo));

class Bar1 {
    constructor() {
        this[Symbol.toPrimitive] = function (hint) {
            switch (hint) {
                case 'number':
                    return 3;
                case 'string':
                    return 'string bar';
                case 'default':
                default:
                    return 'default bar';
            }
        }
    }
}

let bar1 = new Bar1();

console.log(3 + bar1);
console.log(3 - bar1);
console.log(String(bar1));

// Symbol.toStringTag

let s = new Set();

console.log(s);
console.log(s.toString());
console.log(s[Symbol.toStringTag]);

class Foo3 { }
let foo3 = new Foo3();

console.log(foo);
console.log(foo.toString());
console.log(foo[Symbol.toStringTag]);

class Bar2 {
    constructor() {
        this[Symbol.toStringTag] = 'Bar';
    }
}

let bar2 = new Bar2();

console.log(bar2);
console.log(bar2.toString());
console.log(bar2[Symbol.toStringTag]);

// Symbol.unscopables

let o = { foo4: 'bar' };

with(o) {
    console.log(foo4);
}

o[Symbol.unscopables] = {
    foo4: true
}

with(o) {
    try {
        console.log(foo4);
    }
    catch(error) {
        console.log('ReferenceError...');
    }
}