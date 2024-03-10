#include <iostream>

#define OK 1
#define ERROR 0
#define MAXSIZE 1000

typedef struct StaticLinkedList
{
public:
    int data = '\0';
    int cur;

private:
} SLL[MAXSIZE];

int init_SLL(SLL sll)
{
    int i = 0;
    for (i = 0; i < MAXSIZE - 1; i++)
        sll[i].cur = i + 1;
    sll[MAXSIZE - 1].cur = 0;

    return OK;
}

int malloc_SLL(SLL sll)
{
    int i = sll[0].cur;
    if (i)
        sll[0].cur = sll[i].cur;
    
    return i;
}

void free_SLL(SLL sll, int sub_num)
{
    sll[sub_num].cur = sll[0].cur;
    sll[0].cur = sub_num;
    sll[sub_num].data = '\0';
}

int getLenOf_SLL(SLL sll)
{
    int nextNode = sll[MAXSIZE - 1].cur;
    int length = 0;
    while (nextNode)
    {
        nextNode = sll[nextNode].cur;
        length++;
    }
    return length;
}

int insert_SLL(SLL sll, int num, int newData)
{
    // you can put malloc_SLL() here, otherwise, the length of getLenOf_SLL is wrong!!!!!!
    //int newEmpty = malloc_SLL(sll);
    int newEmpty;
    int thisNode = MAXSIZE - 1;
    int nextNode = 0;

    // endless curculate, because you
    if (num < 1 || num > getLenOf_SLL(sll) + 1)
        return ERROR;

    newEmpty = malloc_SLL(sll);
    if (newEmpty)
    {
        sll[newEmpty].data = newData;
        // bug: int i = 0 ? game over !
        for (int i = 1; i <= num - 1; i++)
            thisNode = sll[thisNode].cur;

        nextNode = sll[thisNode].cur;
        sll[thisNode].cur = newEmpty;
        sll[newEmpty].cur = nextNode;
        return OK;
    }
    return ERROR;
}

int delete_SLL(SLL sll, int num)
{
    // the final nextNode will be delete
    int thisNode = MAXSIZE - 1;
    int nextNode = 0;
    
    if (num < 1 || num > getLenOf_SLL(sll))
        return ERROR;
    // bug:int i = 0 ? game over !
    for (int i = 1; i <= num - 1; i++)
        thisNode = sll[thisNode].cur;
    
    nextNode = sll[thisNode].cur;
    sll[thisNode].cur = sll[nextNode].cur;
    free_SLL(sll,nextNode);
    return OK;
}

void showAll_SLL(SLL sll)
{
    int thisNode = sll[MAXSIZE - 1].cur;
    while (thisNode)
    {
        std::cout << sll[thisNode].data << std::endl;
        thisNode = sll[thisNode].cur;
    }
    
}

void simplyInit_SLL(SLL sll,int range)
{
    for (int i = 1; i <= range; i++)
        insert_SLL(sll, i, i);
}

int main()
{
    int length = 5;
    std::cout << "This is a programme about static linked list...\n" ;
    std::cout << "You can set a length...\n";
    SLL sll;
    init_SLL(sll);
    simplyInit_SLL(sll, length);
    showAll_SLL(sll);
    delete_SLL(sll, 3);
    showAll_SLL(sll);
}