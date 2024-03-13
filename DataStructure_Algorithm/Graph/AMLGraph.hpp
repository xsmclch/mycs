#include <iostream>
#include <vector>

struct ArcNode
{
    int v1, v2;
    ArcNode *nextarc1, *nextarc2;
};

struct VexNode
{
    char data;
    ArcNode *firstarc;
};

class AMLGraph
{
public:
    std::vector<VexNode> adjList;
    int vexNum, arcNum;

    int locateVex(char v)
    {
        for (int i = 0; i < vexNum; i++)
            if (adjList[i].data == v)
                return i;
        return -1;
    }

    void createUDG()
    {
        std::cout << "Enter the number of vertice and edges...\n";
        std::cin >> vexNum >> arcNum;
        adjList.resize(vexNum);

        std::cout << "Enter the vertice...\n";
        for (int i = 0; i < vexNum; i++)
        {
            std::cin >> adjList[i].data;
            adjList[i].firstarc = nullptr;
        }

        std::cout << "Enter the edges...\n";
        for (int i = 0; i < arcNum; i++)
        {
            char v1, v2;
            std::cin >> v1 >> v2;
            int ivex = locateVex(v1);
            int jvex = locateVex(v2);

            ArcNode *p = new ArcNode;
            p->v1 = ivex;
            p->v2 = jvex;
            p->nextarc1 = adjList[ivex].firstarc;
            adjList[ivex].firstarc = p;
            p->nextarc2 = adjList[jvex].firstarc;
            adjList[jvex].firstarc = p;
        }
    }
};
