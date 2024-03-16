// 此算法只能用于无孤立点的图
#include <vector>
#include <algorithm>
#include "BasicGraph.hpp"

void Graph_Matrix::ShortestPath_Dijkstra(int v0, std::vector<int> &P, std::vector<int> &D)
{
    // P用于储存路径信息，下标对应的序号即为前驱
    // fn用于储存节点是否已经参与比较1表示完成，0表示待比较
    std::vector<int> fn(numV, 0);
    int k, min;
    D = weight[v0];
    P.resize(numV, -1);

    fn[v0] = 1;

    // v0元素跳过，所以从1开始
    for (int v = 1; v < numV; v++)
    {
        min = INF;
        // 查找当前最小路径，取出该点，并将最小值更新
        for (int w = 0; w < numV; w++)
        {
            if (!fn[w] && D[w] < min)
            {
                k = w;
                min = D[w];
            }
        }
        // k已被取出，标记已完成
        fn[k] = 1;
        // 这很关键，取出的点与剩下的点能否构成新的更短的路径和
        for (int i = 0; i < numV; i++)
        {
            // 如果可以
            if (!fn[i] && weight[k][i] != INF && (min + weight[k][i] < D[i]))
            {
                // 更新最短路径表
                // DANGEROUS!!!! If min = INF, boom!!!
                D[i] = min + weight[k][i];
                // 更新路径信息
                P[i] = k;
            }
        }
    }
}

int main()
{
    Graph_Matrix gm;
    std::vector<int> pathArc;
    std::vector<int> shorPathTable;
    gm.ShortestPath_Dijkstra(0, pathArc, shorPathTable);
    std::cout << std::endl;

    std::for_each(shorPathTable.begin(), shorPathTable.end(), [](int val)
                  { std::cout << val << " "; });

    std::cout << std::endl;
    std::for_each(pathArc.begin(), pathArc.end(), [](int val)
                  { std::cout << val << " "; });
    return 0;
}