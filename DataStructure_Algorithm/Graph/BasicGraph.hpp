#include <iostream>
#include <climits>
#include <vector>
#include <unordered_map>
#include <list>
#include <string>
const int INF = INT_MAX;

// This is an unordered graph
class Graph_Matrix
{
public:
    Graph_Matrix();
private:
    int numV, numE;
    // This 1D vector is used to store the vertex
    std::vector<std::string> vertex;
    std::vector<std::vector<int>> weight;
};

Graph_Matrix::Graph_Matrix()
{
    std::string name;

    std::cout << "You are now initializing a Graph, first please enter the number of vertice and edges\n";
    std::cin >> numV >> numE;

    std::cout << "Good, now please enter the name of each vertex\n";
    for (int i = 0; i < numV; i++)
    {
        std::cin >> name;
        vertex.push_back(name);
    }

    // Initialize the weight
    this->weight = std::vector<std::vector<int>>(numV, std::vector<int>(numV, INF));

    int i, j, w;
    for (int k = 0; k < numE; k++)
    {
        std::cout << "Enter the subscripts of edge (Vi, Vj) and weight W:\n";
        std::cin >> i >> j >> w;
        weight[i][j] = w;
        weight[j][i] = w;
    }
}

class Graph_List
{
public:
    Graph_List();
private:
    int numV, numE;
    std::unordered_map<std::string, std::list<std::string>> adj;
};

Graph_List::Graph_List()
{
    std::string name;
    int tempNum = 0;
    int i, j, w;

    std::cout << "You are now initializing a Graph, first please enter the number of vertice and edges\n";
    std::cin >> numV >> numE;

    std::cout << "Good, now please enter the name of each vertex\n";
    for (int i = 0; i < numV; i++)
    {
        std::cout << "Enter name\n";
        std::cin >> name;
        adj[name];
        std::cout << "Enter the number of adjacencies...\n";
        std::cin >> tempNum;
        std::cout << "Now enter each adjacency...\n";
        for (int j = 0; j < tempNum; j++)
        {
            std::cin >> name;
            adj[name].push_back(name);
        }
    }
}