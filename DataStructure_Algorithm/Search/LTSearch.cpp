// Basic search for linear table
#include <iostream>
#include <vector>

std::vector<int> fib;

// Interpolation Search
int interPolation_Search(int *arr, int n, int key)
{
    int low, high, mid;
    low = 1;
    high = n - 1;
    while (low <= high)
    {
        mid = low + (key - arr[low]) / (arr[high] - arr[low]) * (high - low);
        if (key < arr[mid])
            high = mid - 1;
        else if (key > arr[mid])
            low = mid + 1;
        else
            return mid;
    }
    return 0;
}


void createFibonacci()
{
    if (!fib.empty())
        return;
    fib.push_back(0);
    fib.push_back(1);
    for (int i = 0; i < 98; i++)
        fib.push_back(fib[i] + fib[i + 1]);
}

// Fibonacci search
int fibonacci_Search(int *arr, int n, int key)
{
    createFibonacci();
    int low, high, mid, k; // k is the subscipt of fibonacci
    while (n > fib[k] - 1)
        k++;
    for (int i = n; i < fib[k] - 1; i++)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
        arr[i] = arr[n];
    while (low <= high)
    {
        mid = low + fib[k - 1] - 1;
        if (key < arr[mid])
        {
            high = mid - 1;
            k = k - 1;
        }
        else if (key > arr[mid])
        {
            low = mid + 1;
            k = k - 2;
        }
        else 
        {
            return mid <= n? mid : n;
        }
    }
    return 0;
}
int main()
{
    int arr[11] = {0, 1, 16, 24, 35, 47, 59, 62, 73, 88, 99};
    std::cout << interPolation_Search(arr, sizeof(arr)/sizeof(int), 16) << std::endl;
    std::cout << fibonacci_Search(arr, sizeof(arr)/sizeof(int), 59) << std::endl;
    return 0;
}