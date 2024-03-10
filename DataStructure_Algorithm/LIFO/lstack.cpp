// Linked Stack
#include <iostream>

template <typename T>
struct Node
{
    Node(T init) : data(init) {}
    T data;
    Node<T> *next = nullptr;
};

template <class T>
class LStack
{
public:
    LStack() {}
    ~LStack();

    T pop();
    void push(T val);
    int getSize() { return size; }

private:
    void creat(int newSize, T init);
    Node<T> *top = nullptr;
    int size = 0;
};

template <typename T>
void LStack<T>::push(T val)
{
    if (!top)
    {
        top = new Node<T>(val);
        size = 1;
        return;
    }

    Node<T> *temp = new Node<T>(val);
    temp->next = top;
    top = temp;
    size++;
}

template <typename T>
T LStack<T>::pop()
{
    if (!top)
    {
        std::cerr << "Empty stack!!\n";
        return T();
    }

    T data = top->data;
    Node<T> *temp = top;
    top = top->next;
    delete temp;
    temp = nullptr;
    return data;
}

// DON'T FORGET TO FREE THE MEMORIES
template <typename T>
LStack<T>::~LStack()
{
    while (top)
    {
        Node<T> *temp = top;
        top = top->next;
        delete temp;
        temp = top;
    }
}

int main()
{
    std::cout << "This is a linked stack!\n And now push 1 - 10 into the stack\n";
    LStack<int> lstk;
    for (int i = 1; i <= 10; i++)
    {
        std::cout << "i = " << i << " ";
        std::cout << "B4 pushing the size of the stack is " << lstk.getSize() << std::endl;
        std::cout << "Now pushing...\n";
        lstk.push(i);
        std::cout << "After pushing the size of the stack is " << lstk.getSize() << std::endl;
    }

    std::cout << "Now pop all the elem...\n";
    for (int i = 0; i < 10; i++)
    {
        std::cout << lstk.pop() << " ";
    }
    return 0;
}