#include <iostream>
#include <vector>
#include <algorithm>

template <class T>
class Stack
{
public:
    Stack() {}
    Stack(int newSize) { stack = std::vector<T>(newSize); }
    Stack(int newSize, T init) { stack = std::vector<T>(newSize, init); }
    ~Stack() {}

    void push(T data)
    {
        stack.push_back(data);
        size++;
    }
    T pop()
    {
        T back = stack.back();
        stack.pop_back();
        return back;
    }
    int len(){return size;}

private:
    int size;
    std::vector<T> stack;
};

// template <class T>
// void Stack<T>::push(T data)
// {
//     stack.push_back(data);
// }

// template <class T>
// T Stack<T>::pop()
// {
//     stack.pop_back();
// }

int main()
{
    Stack<int> st1;
    for (int i = 0; i < 10; i++)
        st1.push(i);
    for (int i = 0; i < st1.len(); i++)
        std::cout << st1.pop() << ' ';
    return 0;
}