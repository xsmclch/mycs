def merge_sort(arr):
    n = len(arr)
    size = 1

    # 使用迭代方式进行归并排序
    while size < n:
        left = 0
        while left < n:
            # 找到两个子数组的起始位置
            mid = min(left + size - 1, n - 1)
            right = min(left + 2 * size - 1, n - 1)

            # 合并两个子数组
            merge(arr, left, mid, right)

            left += 2 * size

        size *= 2


def merge(arr, left, mid, right):
    # 计算两个子数组的大小
    n1 = mid - left + 1
    n2 = right - mid

    # 创建临时数组
    L = arr[left : left + n1]
    R = arr[mid + 1 : mid + 1 + n2]

    # 合并两个子数组
    i = j = 0
    k = left
    while i < n1 and j < n2:
        if L[i] <= R[j]:
            arr[k] = L[i]
            i += 1
        else:
            arr[k] = R[j]
            j += 1
        k += 1

    # 处理剩余的元素
    while i < n1:
        arr[k] = L[i]
        i += 1
        k += 1
    while j < n2:
        arr[k] = R[j]
        j += 1
        k += 1


# 示例使用
arr = [38, 27, 43, 3, 9, 82, 10]
print("原始数组:", arr)
merge_sort(arr)
print("排序后的数组:", arr)
