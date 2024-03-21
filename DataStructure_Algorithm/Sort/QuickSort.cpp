#include <iostream>
#include <vector>

#define MAX2INSERT 3

const std::vector<int> Data1 = {50, 10, 90, 30, 70, 40, 80, 60, 20};
const std::vector<int> Data2 = {9, 1, 5, 8, 3, 7, 4, 6, 2};

void swap(int &a, int &b)
{

    int temp = a;
    a = b;
    b = temp;
}

void insertSort(std::vector<int> &vec)
{
    int j;
    for (int i = 1; i < vec.size(); i++)
    {
        if (vec[i] < vec[i - 1])
        {
            int temp = vec[i];
            for (j = i - 1; vec[j] > temp && j >= 0; j--)
                vec[j + 1] = vec[j];
            vec[j + 1] = temp;
        }
    }
}

int partition(std::vector<int> &vec, int low, int high)
{
    int pivot;

    int m = low + (high - low) / 2;
    if (vec[low] > vec[high])
        swap(vec[low], vec[high]);
    if (vec[m] > vec[high])
        swap(vec[m], vec[high]);
    if (vec[m] < vec[low])
        swap(vec[m], vec[low]);

    pivot = vec[low];
    int temp = pivot;
    while (low < high)
    {
        while (low < high && vec[high] >= pivot)
            high--;
        vec[low] = vec[high];
        while (low < high && vec[low] <= pivot)
            low++;
        vec[high] = vec[low];
    }
    vec[low] = temp;
    return low;
}

void qSort(std::vector<int> &vec, int low, int high)
{
    int pivot;
    if (high - low > MAX2INSERT)
    {
        pivot = partition(vec, low, high);
        qSort(vec, low, pivot - 1);
        qSort(vec, pivot + 1, high);
    }
    else
        insertSort(vec);
}

void quickSort(std::vector<int> &vec)
{
    qSort(vec, 0, vec.size() - 1);
}

int main()
{
    std::vector<int> data1 = Data1;
    std::vector<int> data2 = Data2;
    for (int i : data1)
        std::cout << i << " ";
    std::cout << std::endl;
    quickSort(data1);
    for (int i : data1)
        std::cout << i << " ";
    std::cout << std::endl;
    

    for (int i : data2)
        std::cout << i << " ";
    std::cout << std::endl;
    quickSort(data2);
    for (int i : data2)
        std::cout << i << " ";
    std::cout << std::endl;
    return 0;
}