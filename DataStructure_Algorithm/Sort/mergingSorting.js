let arr = [9, 3, 2, 5, 7, 4, 6, 0, 8, 1];

let len = arr.length;

for (let step = 2; step < len; step *= 2) {
    for (let left = 0; left < len; left += step) {
        let mid = left + Math.floor(step / 2) - 1, right = left + step - 1;
        // 分为了left~mid & mid+1~right两个有序部分
        let pl = left, pr = mid + 1, offset = 0, temp = [];
        while (pl <= mid && pr <= right) {
            if (arr[pl] < arr[pr]) {
                temp[offset] = arr[pl];
                pl++;
            } else {
                temp[offset] = arr[pr];
                pr++;
            }
            offset++;
        }

        // 处理剩余部分（有可能某一部分已遍历完）
        while (pl <= mid) {
            temp[offset] = arr[pl];
            pl++;
            offset++;
        }
        while (pr <= right) {
            temp[offset] = arr[pr];
            pr++;
            offset++;
        }

        // 将排序后的部分替换到原数组
        for (let i = 0; i < temp.length; i++) {
            arr[left + i] = temp[i];
        }
    }
}

console.log(arr);
