#include <vector>
#include <algorithm>
#include "BasicGraph.hpp"

struct Edge
{
    int begin;
    int end;
    int weight;
};

int Find(std::vector<int> &parent, int f)
{
    while (parent[f] > 0)
    {
        f = parent[f];
    }
    return f;
}

void Graph_Matrix::MiniSpanTree_Kruskal()
{
    int n, m;
    std::vector<Edge> edges;
    // I have been writing code for too 
    // long and I almost lose my consciousness
    // std::vector<int> parent(0, numV);
    // parent用于检查几个点是否构成回路
    std::vector<int> parent(numV, 0);

    for (int i = 0; i < numV; ++i)
    {
        for (int j = i + 1; j < numV; ++j)
        {
            if (weight[i][j] != INF && weight[i][j] != 0)
            {
                Edge edge;
                edge.begin = i;
                edge.end = j;
                edge.weight = weight[i][j];
                edges.push_back(edge);
            }
        }
    }

    std::sort(edges.begin(), edges.end(), [](const Edge &a, const Edge &b)
              { return a.weight < b.weight; });

    for (int i = 0; i < numE; i++)
    {
        m = Find(parent, edges[i].begin);
        n = Find(parent, edges[i].end);
        if (m != n) // 检查mn与已有边是否形成回路
        {   // 将此边尾顶点加入下标为起点的parent中，表示此顶点已在生成树集合中
            parent[m] = n;
            printf("(%d, %d) %d\n", edges[i].begin, edges[i].end, edges[i].weight);
        }
    }
}

int main()
{
    Graph_Matrix gm;
    gm.MiniSpanTree_Kruskal();
    return 0;
}