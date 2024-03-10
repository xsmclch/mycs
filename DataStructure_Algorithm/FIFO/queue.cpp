#include <iostream>
#include <queue> // Haha!
// #include <algorithm>

int main()
{
    std::queue<int> myq;
    for (int i = 0; i < 10; i++)
        myq.push(i);
    for (int i = 0; i < 10; i++)
    {
        std::cout << "Front: " << myq.front() << " ";
        myq.pop();
    }
    return 0;
}