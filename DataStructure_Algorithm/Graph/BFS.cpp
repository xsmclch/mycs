// At first I use a lot of auto, this is really convenient especially for
// "std::list<std::string>::iterator", well, in case I will be confused
// next time, I replace all the "auto"s by their full names.
#include <string>
#include <vector>
#include <unordered_map>
#include <queue>
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

// BFS traverse for Adjacent Matrix
void Graph_Matrix::BFS()
{
    setVisit(numV);
    std::queue<int> temp;
    for (int i = 0; i < numV; i++)
    {
        if (!visited[i])
        {
            visited[i] = true;
            std::cout << vName[i] << " ";
            temp.push(i);
        }
        while (!temp.empty())
        {
            int j = temp.front();
            temp.pop();
            for (int k = 0; k < numV; k++)
            {
                if (vexs[j][k] == 1 && !visited[k])
                {
                    visited[k] = true;
                    std::cout << vName[k] << " ";
                    temp.push(k);
                }
            }
        }
    }
}

// BFS traverse for adjacent list
void Graph_List::BFS()
{
    setVisit(adj);
    std::queue<std::string> temp;
    for (const auto& pair : adj)
    {
        if (!visited_m[pair.first])
        {
            visited_m[pair.first] = true;
            std::cout << pair.first << " ";
            temp.push(pair.first);
            std::list<std::string> adjl = pair.second;
            while (!temp.empty())
            {
                std::string name = temp.front();
                temp.pop();
                for (std::list<std::string>::iterator it = adjl.begin(); it != adjl.end(); it++)
                {
                    if (!visited_m[*it])
                    {
                        visited_m[*it] = true;
                        std::cout << *it << " ";
                        temp.push(*it);
                    }
                }
            }
        }
    }
}

int main()
{
    // Graph_Matrix mg;
    // mg.BFS();
    // std::cout << std::endl;

    Graph_List lg;
    lg.BFS();
    std::cout << std::endl;
    return 0;
}