// This basic Prim Algorithm's time complexity
// is O(n^2) Which can be improved by using
// #include <queue> priority_queue
#include <vector>
#include "BasicGraph.hpp"

void Graph_Matrix::MiniSpanTree_Prim()
{
    int min, j, k;
    std::vector<int> adjVex(numV, 0), lowCost = weight[0];
    for (int i = 1; i < numV; i++)
    {
        min = INF;
        j = 1;
        k = 0;
        while (j < numV)
        {
            if (lowCost[j] != 0 && lowCost[j] < min)
            {
                min = lowCost[j];
                k = j;
            }
            j++;
        }
        printf("Edge (%d, %d) is added...\n", adjVex[k], k);
        lowCost[k] = 0;
        // 查看新取出的点是否能和其他点构成更小权值的变
        for (j = 1; j < numV; j++)
        {
            // 若发现此新点能够与其他点构成比原来边更小的边，
            if (lowCost[j] != 0 && weight[k][j] < lowCost[j])
            {
                // 替换最小权值，并且将k加入下标为j的点，表示点j的前驱是k
                lowCost[j] = weight[k][j];
                adjVex[j] = k;
            }
        }
    }
}

int main()
{
    Graph_Matrix mg;
    mg.MiniSpanTree_Prim();
    return 0;
}