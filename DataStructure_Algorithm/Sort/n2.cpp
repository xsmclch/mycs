// Basic O(n^2) sorting
#include <iostream>
#include <vector>

const std::vector<int> data = {9, 1, 5, 8, 3, 7, 4, 6, 2};

void swap(int &a, int &b)
{
    // a = a ^ b;
    // b = a ^ b;
    // a = a ^ b;
    int temp = a;
    a = b;
    b = temp;
}

void bubbleSort(std::vector<int> &vec)
{
    bool flag = true;
    for (int i = 0; i < vec.size() && flag; i++)
    {
        flag = false;
        for (int j = 0; j < vec.size() - i - 1; j++)
        {
            if (vec[j] > vec[j + 1])
            {
                flag = true;
                swap(vec[j], vec[j + 1]);
            }
        }
    }
}

void selectSort(std::vector<int> &vec)
{
    int min;
    for (int i = 0; i < vec.size(); i++)
    {
        min = i;
        for (int j = i + 1; j < vec.size(); j++)
        {
            if (vec[min] > vec[j])
                min = j;
        }
        if (min != i)
            swap(vec[i], vec[min]);
    }
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

int main()
{
    std::vector<int> x = data;
    // bubbleSort(x);
    // selectSort(x);
    insertSort(x);
    for (int i : x)
    {
        std::cout << i << " ";
    }
    return 0;
}