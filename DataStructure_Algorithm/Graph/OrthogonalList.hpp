// I first try to attach this part to Graph.hpp
// But, this part is too confusing!
#include <iostream>
#include <vector>

struct ArcNode
{
    int tailVex, headVex;
    ArcNode *hLink, *tLink;
};

struct VexNode
{
    char data;
    ArcNode *firstIn, *firstOut;
};

class OrthogonalList
{
public:
    void createDG();
    ~OrthogonalList();

private:
    int vexNum, arcNum;
    std::vector<VexNode> adjList;
    int locateVex(char);
};

OrthogonalList::~OrthogonalList()
{
    for (int i = 0; i < vexNum; i++)
    {
        // Only traverse OUT OR IN, because an edge is shared by two vertice!
        ArcNode *p = adjList[i].firstOut;
        while (p != nullptr)
        {
            ArcNode *q = p;
            p = p->tLink;
            delete q;
        }
    }
}

int OrthogonalList::locateVex(char v)
{
    for (int i = 0; i < vexNum; i++)
        if (adjList[i].data == v)
            return i;
    return -1;
}

void OrthogonalList::createDG()
{
    std::cout << "Enter number of vetice and edges...\n";
    std::cin >> vexNum >> arcNum;
    adjList.resize(vexNum);

    std::cout << "Enter vertex...\n";
    for (int i = 0; i < vexNum; i++)
    {
        std::cin >> adjList[i].data;
        adjList[i].firstIn = nullptr;
        adjList[i].firstOut = nullptr;
    }

    std::cout << "Enter edges...\n";
    for (int i = 0; i < arcNum; i++)
    {
        char v1, v2;
        std::cin >> v1 >> v2;
        int ivex = locateVex(v1);
        int jvex = locateVex(v2);

        ArcNode *p = new ArcNode;
        // Holy ...
        p->tailVex = ivex;
        p->headVex = jvex;
        // Head insertion method!!!!
        p->hLink = adjList[jvex].firstIn;
        adjList[jvex].firstIn = p;
        // !!!
        p->tLink = adjList[ivex].firstOut;
        adjList[ivex].firstOut = p;
    }
}
