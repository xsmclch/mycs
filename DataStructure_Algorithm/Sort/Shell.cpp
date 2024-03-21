#include <iostream>
#include <vector>

const std::vector<int> data = {9, 1, 5, 8, 3, 7, 4, 6, 2};

void shellSort(std::vector<int> &vec)
{
    int j;
    int increment = vec.size();
    do
    {
        increment = increment/3 + 1;
        for (int i = increment; i < vec.size(); i++)
        {
            if (vec[i] < vec[i - increment])
            {
                int temp = vec[i];
                for (j = i - increment; j >= 0 && vec[j] > temp; j-=increment)
                    vec[j + increment] = vec[j];
                vec[j + increment] = temp;
            }
        }
    } while (increment > 1);
}

int main()
{
    std::vector<int> x = data;
    shellSort(x);
    for (int i : x)
        std::cout << i << " ";
    return 0;
}