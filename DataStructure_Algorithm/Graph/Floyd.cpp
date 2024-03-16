// Though O(n^3)
// This algorithm is beautiful!
#include <vector>
#include <algorithm>
#include "BasicGraph.hpp"

void Graph_Matrix::ShortsetPath_Floyd(
    std::vector<std::vector<int>> &P,
    std::vector<std::vector<int>> &D)
{
    D = weight;
    P.resize(numV);
    // Awesome!
    // Perfect exercise of cpp14+!!!
    int n = -1;
    // catch n as reference, otherwise, n++ fail
    // and get x as reference too, otherwise, segmentation fault, index out of range
    std::for_each(P.begin(), P.end(), [this, &n](std::vector<int> &x)
                  { n++; x.resize(numV, n); });

    // It is okay to replace int k = 0 by int k = 1
    for (int i = 0; i < numV; i++)
    {
        for (int j = 0; j < numV; j++)
        {
            for (int k = 0; k < numV; k++)
            {
                // Fxxk!!! INF is bad!! overfloat!!!!!
                if (D[j][i] != INF && D[i][k] != INF && D[j][k] > D[j][i] + D[i][k])
                {
                    D[j][k] = D[j][i] + D[i][k];
                    P[j][k] = P[j][i];
                }
            }
        }
    }
}

int main()
{
    Graph_Matrix gm;
    std::vector<std::vector<int>> pathArc;
    std::vector<std::vector<int>> shortestPathTable;
    gm.ShortsetPath_Floyd(pathArc, shortestPathTable);

    for (int i = 0; i < gm.getV(); i++)
    {
        for (int j = 0; j < gm.getV(); j++)
            std::cout << pathArc[j][i] << " ";
        std::cout << std::endl;
    }

    std::cout << std::endl;

    for (int i = 0; i < gm.getV(); i++)
    {
        for (int j = 0; j < gm.getV(); j++)
            std::cout << shortestPathTable[j][i] << " ";
        std::cout << std::endl;
    }
}