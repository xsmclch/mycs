// Traverse the Graph, base on adjacency matrix and adjacency list
#include <string>
#include <vector>
#include <unordered_map>
#include <algorithm>
#include "BasicGraph.hpp"

std::vector<bool> visited(100, false);
std::unordered_map<std::string, bool> visited_m;

// Set visited vector
void setVisit(int size)
{
    visited.resize(size);
    std::fill(visited.begin(), visited.end(), false);
}

void setVisit(std::unordered_map<std::string, std::list<std::string>> map1)
{
    for (const auto &pair : map1)
        visited_m[pair.first] = false;
}

// DFS recursion
void Graph_Matrix::DFS(Graph_Matrix &G, int i)
{
    visited[i] = true;
    std::cout << G.vName[i] << " ";
    for (int j = 0; j < G.numV; j++)
        if (G.vexs[i][j] == 1 && !visited[j])
            DFS(G, j);
}

// DFS traverse
void DFSTraverse(Graph_Matrix &G)
{
    setVisit(G.getV());
    for (int i = 0; i < G.getV(); i++)
        if (!visited[i])
            G.DFS(G, i);
}

// AL recursion
// I regret using hashtable and list
// Improving efficiency by passing references
void Graph_List::DFS(Graph_List &G, std::string name)
{
    visited_m[name] = true;
    std::cout << name << " ";
    auto adjl = G.adj[name];
    for (auto it = adjl.begin(); it != adjl.end(); ++it)
        if (!visited_m[*it])
            DFS(G, *it);
}

// AL traverse
// Improving efficiency by passing references
void DFSTraverse(Graph_List &G)
{
    setVisit(G.getAdj());
    for (const auto& pair : G.getAdj())
        if (!visited_m[pair.first])
            G.DFS(G, pair.first);
}

int main()
{
    // Graph_Matrix mg;

    // setVisit(mg.getV());
    // mg.DFS(mg, 0);
    // std::cout << "\n";
    // DFSTraverse(mg);
    // setVisit(100);

    Graph_List lg;
    setVisit(lg.getAdj());
    lg.DFS(lg, "a");
    std::cout << "\n";
    setVisit(lg.getAdj());
    DFSTraverse(lg);
    return 0;
}