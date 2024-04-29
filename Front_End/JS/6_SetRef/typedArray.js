// 定型数组

// ArrayBuffer
const buf = new ArrayBuffer(16);
console.log(buf.byteLength);
// ArrayBuffer 有点像 malloc()
//  malloc()在分配失败时会返回一个 null 指针。ArrayBuffer 在分配失败时会抛出错误。
//  malloc()可以利用虚拟内存，因此最大可分配尺寸只受可寻址系统内存限制。ArrayBuffer
// 分配的内存不能超过 Number.MAX_SAFE_INTEGER（2^53 - 1）字节。
//  malloc()调用成功不会初始化实际的地址。声明 ArrayBuffer 则会将所有二进制位初始化
// 为 0。
//  通过 malloc()分配的堆内存除非调用 free()或程序退出，否则系统不能再使用。而通过声明
// ArrayBuffer 分配的堆内存可以被当成垃圾回收，不用手动释放。

// DataView 可以读写ArrayBuffer的视图
const fullDataView = new DataView(buf);
console.log(fullDataView.byteOffset);
console.log(fullDataView.byteLength);
console.log(fullDataView.buffer === buf);

const firstHalfDataView = new DataView(buf, 0, 8);
console.log(firstHalfDataView.byteOffset);
console.log(firstHalfDataView.byteLength);
console.log(firstHalfDataView.buffer === buf);

const secondHalfDataView = new DataView(buf, 8)
console.log(secondHalfDataView.byteOffset); // byteOffset=8表示视图缓从第九个开始
console.log(secondHalfDataView.byteLength);
console.log(secondHalfDataView.buffer = buf);

// ElementType
const buff = new ArrayBuffer(2);
const view = new DataView(buff);

console.log(view.getInt8(0));
console.log(view.getInt8(1));
console.log(view.getInt16(0));

// 将整个缓冲都设置为 1 
// 255 的二进制表示是 11111111（2^8 - 1）
view.setUint8(0, 255);
// DataView 会自动将数据转换为特定的 ElementType 
// 255 的十六进制表示是 0xFF 
view.setUint8(1, 0xFF);
// 现在，缓冲里都是 1 了
// 如果把它当成二补数的有符号整数，则应该是-1 
console.log(view.getInt16(0)); // -1 

// 字节序
const buff2 = new ArrayBuffer(2);
const view2 = new DataView(buff2);
console.log('Before:\nbuff2 =', buff2);

// 填充缓冲，让第一位和最后一位都是 1 
view2.setUint8(0, 0x80); // 设置最左边的位等于 1 
view2.setUint8(1, 0x01); // 设置最右边的位等于 1
console.log(`view2.getUint8(0) = ${view2.getUint8(0)}`);
// 缓冲内容（为方便阅读，人为加了空格）
// 0x8 0x0 0x0 0x1 
// 1000 0000 0000 0001 
// 按大端字节序读取 Uint16 
// 0x80 是高字节，0x01 是低字节
// 0x8001 = 2^15 + 2^0 = 32768 + 1 = 32769 
console.log(view2.getUint16(0)); // 32769 
// 按小端字节序读取 Uint16 
// 0x01 是高字节，0x80 是低字节
// 0x0180 = 2^8 + 2^7 = 256 + 128 = 384 
console.log(view2.getUint16(0, true)); // 384 
// 按大端字节序写入 Uint16 
view2.setUint16(0, 0x0004);
// 缓冲内容（为方便阅读，人为加了空格）
// 0x0 0x0 0x0 0x4 
// 0000 0000 0000 0100 
console.log(view2.getUint8(0)); // 0 
console.log(view2.getUint8(1)); // 4 
// 按小端字节序写入 Uint16 
view2.setUint16(0, 0x0002, true);
// 缓冲内容（为方便阅读，人为加了空格）
// 0x0 0x2 0x0 0x0 
// 0000 0010 0000 0000 
console.log(view2.getUint8(0)); // 2 
console.log(view2.getUint8(1)); // 0 

console.log('After:\nbuff2 =', buff2);

// // 3. 边界情形
// // DataView 完成读、写操作的前提是必须有充足的缓冲区，否则就会抛出 RangeError：
// const buf = new ArrayBuffer(6); 
// const view = new DataView(buf); 
// // 尝试读取部分超出缓冲范围的值
// view.getInt32(4); 
// // RangeError 
// // 尝试读取超出缓冲范围的值
// view.getInt32(8); 
// // RangeError 
// // 尝试读取超出缓冲范围的值
// view.getInt32(-1); 
// // RangeError 
// // 尝试写入超出缓冲范围的值
// view.setInt32(4, 123); 
// // RangeError 
// // DataView 在写入缓冲里会尽最大努力把一个值转换为适当的类型，后备为 0。如果无法转换，则
// // 抛出错误：
// const buf = new ArrayBuffer(1); 
// const view = new DataView(buf); 
// view.setInt8(0, 1.5); 
// alert(view.getInt8(0)); // 1 
// view.setInt8(0, [4]); 
// alert(view.getInt8(0)); // 4 
// view.setInt8(0, 'f'); 
// alert(view.getInt8(0)); // 0 
// view.setInt8(0, Symbol()); 
// // TypeError 



// 定型数组，特定于一种ElementType
const buff3 = new ArrayBuffer(12);
const ints = new Int32Array(buff3);
// 长度为 12 / 4 = 3
console.log(ints.length);
const ints2 = new Int32Array(6);
console.log(ints2.length)
console.log(ints2.buffer.byteLength);

const ints3 = new Int32Array([2, 4, 6, 8]);
console.log('Int32Array([2, 4, 6, 8])')
console.log(ints3.length);
console.log(ints3.buffer.byteLength);
console.log(ints3[2]);

const ints4 = new Int16Array(ints3);
console.log('Int16Array(ints3)')
console.log(ints4.length);
console.log(ints4.buffer.byteLength);
console.log(ints3[2]);

// .from
const ints5 = Int16Array.from([3, 5, 7, 9])
// const ints5 = Int16Array.of(3, 5, 7, 9)
console.log(ints5)
// let test = Array.from([3, 5, 7, 9]);
// console.log(test);
// test = Array.of(3, 5, 7, 9);
// console.log(test);

const floats = Float32Array.of(Math.PI, Math.E, 1.618)
console.log(floats.length);
console.log(floats.buffer.byteLength);
console.log((floats[0]).toFixed(7), '\n', floats[2]); // no so precise

// 定型数组行为,Array的方法基本都能用
const Ints = Int32Array.of(1, 2, 3);
const mapInts = Ints.map((item, index, array) => item + index);
console.log(mapInts);
for (const [index, value] of Ints.entries()) {
    console.log(`index = ${index}; value = ${value}`);
}

// 因为定型数组使用数组缓冲来储存数据所以无法调整大小，比如
// concat() pop() shift() splice() unshift()
// 两个新方法
// set() subarray()
const container = new Int16Array(8);
// 把定型数组复制为前 4 个值
// 偏移量默认为索引 0 
container.set(Int8Array.of(1, 2, 3, 4));
console.log(container);
// 设置偏移量为4
container.set([5, 6, 7, 8], 4);
console.log(container);

try {
    container.set([5, 6, 7, 8], 7);
}
catch {
    console.log('overfloat');
}

const source = Int16Array.of(2, 4, 6, 8);
// 把整个数组复制为一个同类型的新数组
const fullCopy = source.subarray();
console.log(fullCopy); // [2, 4, 6, 8] 
// 从索引 2 开始复制数组
const halfCopy = source.subarray(2);
console.log(halfCopy); // [6, 8] 
// 从索引 1 开始复制到索引 3 
const partialCopy = source.subarray(1, 3);
console.log(partialCopy); // [4, 6] 

console.log('\n\n\n');

function typedArrayConcat(typedArrayConstructor, ...typedArrays) {
    const numElements = typedArrays.reduce((x, y) => (x.length || x) + y.length);

    const resultArray = new typedArrayConstructor(numElements);

    let currentOffset = 0;
    typedArrays.map(x => {
        resultArray.set(x, currentOffset);
        currentOffset += x.length;
    })

    return resultArray;
}

const concatArray = typedArrayConcat(Int32Array,
    Int8Array.of(1, 2, 3),
    Int8Array.of(4, 5, 6),
    Int8Array.of(7, 8, 9));

console.log(concatArray, concatArray.buffer.byteLength);
console.log(concatArray instanceof Int32Array);

// 上溢和下溢
const its = new Int8Array(2); // -128~127
const uints = new Uint8Array(2); // 0~255

// 无符号
// 上溢取有效的取最低有效位
uints[1] = 256;
console.log(uints);
uints[1] = 257;
console.log(uints);

// -1的补码0xFF转为无符号数0xFF=16^-1=255
uints[1] = -1;
console.log(uints);

// 有符号
// 上溢直接变补码
its[1] = 129; // 0x101 = -128 + 1 = -127
console.log(its);

// 下溢也是变成补码
its[1] = -130; // -130 + 256 = 126 
console.log(its);

// 除了 8 种元素类型，还有一种“夹板”数组类型：Uint8ClampedArray，不允许任何方向溢出。
// 超出最大值 255 的值会被向下舍入为 255，而小于最小值 0 的值会被向上舍入为 0。
// const clampedInts = new Uint8ClampedArray([-1, 0, 255, 256]);
// console.log(clampedInts); // [0, 0, 255, 255] 
// 按照 JavaScript 之父 Brendan Eich 的说法：“Uint8ClampedArray 完全是 HTML5canvas 元素的
// 历史留存。除非真的做跟 canvas 相关的开发，否则不要使用它。”
