arr = [38, 27, 43, 3, 9, 82, 10]


def qs(left, right):
    # 防止mid = left越界，不能使用left==right来return
    if left < right:
        mid = imp_qs(left, right, "r2l")
        qs(left, mid - 1)
        qs(mid + 1, right)


def imp_qs(left, right, dir):
    if left >= right:
        return left
    match dir:
        case "l2r":
            cur = arr[right]
            while left < right and arr[left] <= cur:
                left += 1
            arr[left], arr[right] = arr[right], arr[left]
            # 记得return
            return imp_qs(left, right - 1, "r2l")
        case "r2l":
            cur = arr[left]
            while left < right and arr[right] >= cur:
                right -= 1
            arr[left], arr[right] = arr[right], arr[left]
            # 记得return
            return imp_qs(left + 1, right, "l2r")
# 迭代，非递归
def imp(left, right):
    pass

qs(0, len(arr) - 1)
print(arr)
