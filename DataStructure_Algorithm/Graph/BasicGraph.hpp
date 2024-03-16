#include <iostream>
#include <climits>
#include <vector>
#include <unordered_map>
#include <list>
#include <string>
// THIS IS REALLY REALLY DANGEROUS!!!!!!!!!!!!!!!!!!!!!!!!
// I've faced OVERFLOAT FOR MORE THAN 3 TIMES!!!!!!!!!!!!!!!!!!
const int INF = INT_MAX;

// This is an unordered graph
class Graph_Matrix
{
public:
    Graph_Matrix();
    int getV() { return numV; }
    int getE() { return numE; }
    // Improving efficiency by passing references
    void DFS(Graph_Matrix &G, int i);
    void BFS();
    void MiniSpanTree_Prim();
    void MiniSpanTree_Kruskal();
    void ShortestPath_Dijkstra(int v0, std::vector<int>&, std::vector<int>&);
    void ShortsetPath_Floyd(std::vector<std::vector<int>>&, std::vector<std::vector<int>>&);
private:
    int numV, numE;
    // This 1D vector is used to store the vertex
    std::vector<std::string> vName;
    std::vector<std::vector<int>> vexs;
    std::vector<std::vector<int>> weight;
};

Graph_Matrix::Graph_Matrix()
{
    std::string name;

    std::cout << "You are now initializing a Graph_Matrix, first please enter the number of vertice and edges\n";
    std::cin >> numV >> numE;

    this->vexs = std::vector<std::vector<int>>(numV, std::vector<int>(numV, 0));
    // Initialize the weight
    this->weight = std::vector<std::vector<int>>(numV, std::vector<int>(numV, INF));

    std::cout << "Good, now please enter the name of each vertex\n";
    for (int i = 0; i < numV; i++)
    {
        weight[i][i] = 0;
        std::cin >> name;
        vName.push_back(name);
    }

    int i, j, w;
    for (int k = 0; k < numE; k++)
    {
        std::cout << "Enter the subscripts of edge (Vi, Vj) and weight W:\n";
        std::cin >> i >> j >> w;
        weight[i][j] = w;
        weight[j][i] = w;
        vexs[i][j] = 1;
        vexs[j][i] = 1;
    }
}

class Graph_List
{
public:
    Graph_List();
    int getV() { return numV; }
    int getE() { return numE; }
    // Improving efficiency by passing references
    void DFS(Graph_List &G, std::string name);
    void BFS();
    auto getAdj() { return adj; }
private:
    int numV, numE;
    std::unordered_map<std::string, std::list<std::string>> adj;
};

Graph_List::Graph_List()
{
    std::string nameV, name;
    int tempNum = 0;
    int i, j, w;

    std::cout << "You are now initializing a Graph_List, first please enter the number of vertice and edges\n";
    std::cin >> numV >> numE;

    std::cout << "Good, now please enter the name of each vertex\n";
    for (int i = 0; i < numV; i++)
    {
        std::cout << "Enter name\n";
        std::cin >> nameV;
        adj[nameV];
        std::cout << "Enter the number of adjacencies...\n";
        std::cin >> tempNum;
        std::cout << "Now enter each adjacency...\n";
        for (int j = 0; j < tempNum; j++)
        {
            std::cin >> name;
            adj[nameV].push_back(name);
        }
    }
}