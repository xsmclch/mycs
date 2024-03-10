#include <iostream>

template <typename T>
struct Node
{
    Node<T>(T newData) : data(newData) {}
    T data;
    Node *next;
};

template <class T>
class Circularll
{
public:
    Circularll(){};
    Circularll(int num, T init);
    ~Circularll();
    void operator+(const Circularll &);
    void show();

private:
    Node<T> *head = nullptr;
    Node<T> *rear = nullptr;
    int length = 0;
};

template <class T>
Circularll<T>::Circularll(int num, T init) : length(num)
{
    head = new Node<T>(init);
    Node<T> *temp = head;
    for (int i = 0; i < num; i++)
    {
        temp->next = new Node<T>(init);
        temp = temp->next;
    }
    temp->next = head;
    rear = temp;
}

template <class T>
Circularll<T>::~Circularll()
{
    Node<T> *current = head;
    Node<T> *nextNode = nullptr;
    do
    {
        nextNode = current->next;
        delete current;
        current = nextNode;
    } while (current != head);
    head = nullptr;
    rear = nullptr;
}

template <class T>
void Circularll<T>::show()
{
    Node<T> *temp = head;
    for (int i = 0; i < length; i++)
    {
        std::cout << temp->data << " ";
        temp = temp->next;
    }
}

// template <class T>
// void Circularll<T>::operator+(const Circularll<T> &rhs)
// {
//     Node<T>* p = this -> rear -> next;
//     this -> rear -> next = rhs.head;
//     rhs.rear -> next = this -> head;
//     this -> rear = rhs.rear;
//     int len = this -> length + rhs.length;
//     this -> length = rhs.length = len;
// }

int main()
{
    Circularll<int> ll1(10, 0);
    ll1.show();
    Circularll<int> ll2(10, 1);
    ll2.show();
    // ll1 + ll2;
    ll1.show();
    return 0;
}