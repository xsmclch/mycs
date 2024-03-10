#include <iostream>
enum
{
    kIsSmaller,
    kIsLarger,
    kIsSame
};

class Data
{
public:
    Data(int newValue) : value(newValue) {}
    ~Data() {}
    int compare(const Data &);
    void show() { ::std::cout << value << ::std::endl; }

private:
    int value;
};

int Data::compare(const Data &otherData)
{
    if (value < otherData.value)
        return kIsSmaller;
    if (value > otherData.value)
        return kIsLarger;
    else
        return kIsSame;
}

class Node;
class HeadNode;
class InternalNode;
class TailNode;

class Node
{
public:
    Node() {}
    virtual ~Node(){};
    virtual void show() = 0;
    virtual Node *insert(Data *data) = 0;

private:
};

class InternalNode : public Node
{
public:
    InternalNode(Data *data, Node *node);
    virtual ~InternalNode()
    {
        delete next;
        delete data;
    }
    virtual Node *insert(Data *data);
    virtual void show()
    {
        data->show();
        next->show();
    }

private:
    Data *data;
    Node *next;
};

InternalNode::InternalNode(Data *newData, Node *newNode) : data(newData), next(newNode)
{
}

Node *InternalNode::insert(Data *otherdata)
{
    int result = data->compare(*otherdata);
    switch (result)
    {
    case kIsSame:
    case kIsLarger:
    {
        InternalNode *dataNode = new InternalNode(otherdata, this);
        return dataNode;
    }
    case kIsSmaller:
    {
        next = next->insert(otherdata);
        return this;
    }
    }
    return this;
}

class TailNode : public Node
{
public:
    TailNode() {}
    virtual ~TailNode() {}
    virtual Node *insert(Data *data);
    virtual void show() {}

private:
};

Node *TailNode::insert(Data *data)
{
    InternalNode *dataNode = new InternalNode(data, this);
    return dataNode;
}

class HeadNode : public Node
{
public:
    HeadNode();
    virtual ~HeadNode()
    {
        delete next;
    }
    virtual Node *insert(Data *data);
    virtual void show() { next->show(); }

private:
    Node *next;
};

HeadNode::HeadNode()
{
    next = new TailNode;
}
Node *HeadNode::insert(Data *data)
{
    next = next->insert(data);
    return this;
}

class LinkedList
{
public:
    LinkedList();
    ~LinkedList() { delete head; }
    void insert(Data *data);
    void showAll() { head->show(); }

private:
    HeadNode *head;
};

LinkedList::LinkedList()
{
    head = new HeadNode;
}

void LinkedList::insert(Data *pData)
{
    head->insert(pData);
}

int main()
{
    Data *pData;
    int val;
    LinkedList ll;
    while (true)
    {
        std::cout << "What value (0 to stop)? ";
        std::cin >> val;
        if (!val)
            break;
        pData = new Data(val);
        ll.insert(pData);
    }

    ll.showAll();
    return 0;
}