#include <iostream>
#include <vector>

const std::vector<int> data = {50, 10, 90, 30, 70, 40, 80, 60, 20};

void swap(int &a, int &b)
{
    int temp = a;
    a = b;
    b = temp;
}

void heapAdj(std::vector<int> &vec, int s, int m)
{
    int temp;
    temp = vec[s - 1];
    for (int i = s * 2; i <= m; i *= 2)
    {
        if (i < m && vec[i - 1] < vec[i])
            ++i;
        if (temp >= vec[i - 1])
            break;
        vec[s - 1] = vec[i - 1];
        s = i;
    }
    vec[s - 1] = temp;
}

void heapSort(std::vector<int> &vec)
{
    for (int i = vec.size() / 2; i > 0; i--)
        heapAdj(vec, i, vec.size());
    for (int i = vec.size(); i > 1; i--)
    {
        swap(vec[0], vec[i - 1]);
        heapAdj(vec, 1, i - 1);
    }
}

int main()
{
    std::vector<int> x = data;
    for (int i : x)
        std::cout << i << " ";
    std::cout << std::endl;
    heapSort(x);
    for (int i : x)
        std::cout << i << " ";
    return 0;
}