#include <iostream>
#include <vector>

const std::vector<int> data = {50, 10, 90, 30, 70, 40, 80, 60, 20};

void merge(std::vector<int> &TR2, std::vector<int> &TR1, int head, int mid, int tail)
{
    int i, j, k = head;
    for (i = head, j = mid + 1; i <= mid && j <= tail; k++)
    {
        if (TR2[i] < TR2[j])
            TR1[k] = TR2[i++];
        else
            TR1[k] = TR2[j++];
    }
    while (i <= mid) // 处理左边剩余的元素
    {
        TR1[k++] = TR2[i++];
    }
    while (j <= tail) // 处理右边剩余的元素
    {
        TR1[k++] = TR2[j++];
    }
}

void mSort(std::vector<int> &SR, std::vector<int> &TR1, int head, int tail)
{
    int mid;
    std::vector<int> TR2(TR1.size());
    if (head == tail)
        TR1[head] = SR[head];

    else
    {
        mid = (head + tail) / 2;
        mSort(SR, TR2, head, mid);
        mSort(SR, TR2, mid + 1, tail);
        merge(TR2, TR1, head, mid, tail);
    }
}

void mergingSort(std::vector<int> &vec)
{
    mSort(vec, vec, 0, vec.size() - 1);
}

void mergePass(std::vector<int> &SR, std::vector<int> &TR, int len, int size)
{
    // 将SR中长度为len的子序列归并到TR中
    int i = 0;
    while (i <= size - 2 * len)
    {
        merge(SR, TR, i, i + len - 1, i + len * 2 - 1);
        i = i + len * 2;
    }
    if (i < size - len)
        merge(SR, TR, i, i + len - 1, size - 1);
    else
        for (int j = i; j < size; j++)
            TR[j] = SR[j];
}

// NO RECURSION!!!
void mSortPro(std::vector<int> &vec)
{
    std::vector<int> temp(vec.size());
    int k = 1; // 初始子序列长度
    while (k < vec.size())
    {
        mergePass(vec, temp, k, vec.size());
        k*=2;
        mergePass(temp, vec, k, vec.size());
        k*=2;
    }
}

int main()
{
    std::vector<int> x = data;
    for (int i : x)
        std::cout << i << " ";
    mSortPro(x);
    std::cout << std::endl;
    for (int i : x)
        std::cout << i << " ";
}