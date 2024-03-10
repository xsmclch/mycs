#include <iostream>

template <typename T>
struct Node
{
    Node(){}
    Node(T newData):data(newData){};
    T data = NULL;
    Node* pre;
    Node* next;
};

template <class T>
class Dulll
{
public:
    Dulll(){}
    Dulll(int len);
    Dulll(int len, T init);


    void show();
private:
    void gen(int len, T init = T());
    int length = 0;
    Node<T> *head = nullptr;
    Node<T> *rear = nullptr;
};

template <class T>
Dulll<T>::Dulll(int len)
{
    gen(len);
}

template <class T>
Dulll<T>::Dulll(int len, T init)
{
    gen(len, init);
}


template <class T>
void Dulll<T>::gen(int len, T init)
{
    length = len;
    if (!length)
    {
        std::cerr << "No length?";
        return;
    }

    head = new Node<T>(init);
    Node<T> *temp = head, *temp2 = head;

    for (int i = 0; i < length - 1; i++)
    {
        temp -> next = new Node<T>(init);
        temp = temp -> next;
        temp -> pre = temp2;
        temp2 = temp2 -> next;
    }
    rear = temp;
}

template <class T>
void Dulll<T>::show()
{
    Node<T> *temp = head;
    for (int i = 0; i < length; i++)
    {
        std::cout << temp -> data << ' ';
        temp = temp -> next;
    }
}



int main()
{
    std::cout << "现在试图开始构建Dulll\n";
    Dulll<int> l1();
    Dulll<int> l2(5);
    l2.show();
    Dulll<int> l3(10, 2);
    l3.show();
}