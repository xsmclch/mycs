#include <iostream>
#include <string>
#include <list>
#include <stack>
#include <vector>
#include <algorithm>

// Adjacent node
struct EdgeNode
{
    EdgeNode(int _adjvex, int _weight) : adjvex(_adjvex), weight(_weight) {}
    int adjvex; // Node's subscript
    int weight;
};

struct VertexNode
{
    VertexNode(int _in, int _out, std::string _data) : in(_in), out(_out), data(_data) {}
    int in;
    int out;
    std::string data;
    std::list<EdgeNode> al; // adgacency list
};

class Topo
{
public:
    Topo();
    bool topoLogicSort_AOV();
    bool topoLogicSort_AOE();
    void criticalPath();

private:
    int numV;
    int numE;
    std::vector<VertexNode> vex;
    std::stack<int> aov;  // aov to store the Topological sequence
    std::vector<int> etv; // etv to store the earliest time of each vertex
    std::vector<int> ltv; // ltv to store the latest time of each vertex
};

Topo::Topo()
{
    std::cout << "Enter the number of vertices and edges...\n";
    std::cin >> numV >> numE;
    std::cout << "Good, and enter the imformation of each vertices...\n";
    for (int i = 0; i < numV; i++)
    {
        std::string name, data;
        int in, out, subscript, weight;
        std::cout << "First enter name...\n";
        std::cin >> name;
        std::cout << "Then enter in and out degree\n";
        std::cin >> in >> out;
        VertexNode tempvn(in, out, name);
        vex.push_back(tempvn);
        std::cout << "Now enter every subscript and weight of the end of its out-edge...\n";
        for (int j = 0; j < out; j++)
        {
            std::cin >> subscript >> weight;
            EdgeNode tempen(subscript, weight);
            vex[i].al.push_back(tempen);
        }
    }
}

bool Topo::topoLogicSort_AOV()
{
    std::stack<int> stk;
    int top, adjV, count = 0;
    for (int i = 0; i < numV; i++)
        if (vex[i].in == 0)
            stk.push(i);
    while (!stk.empty())
    {
        top = stk.top();
        stk.pop();
        std::cout << vex[top].data << " -> ";
        count++;
        // for (std::list<EdgeNode>::iterator it = vex[top].al.begin(); it != vex[top].al.begin(); it++)
        for (std::list<EdgeNode>::iterator it = vex[top].al.begin(); it != vex[top].al.end(); it++)
        {
            // No, this is list!!!
            // vex[top].al[i]
            adjV = (*it).adjvex;
            if (--vex[adjV].in == 0)
                stk.push(adjV);
        }
    }
    return count < numV ? false : true;
}

// aov to store the Topological sequence
// etv to store the earliest time of each vertex
bool Topo::topoLogicSort_AOE()
{
    std::stack<int> stk, stk2;
    int top, adjV, count = 0;
    for (int i = 0; i < numV; i++)
        if (vex[i].in == 0)
            stk.push(i);
    etv.resize(numV, 0);
    while (!stk.empty())
    {
        top = stk.top();
        stk.pop();
        std::cout << vex[top].data << " -> ";
        aov.push(top);
        count++;
        // for (std::list<EdgeNode>::iterator it = vex[top].al.begin(); it != vex[top].al.begin(); it++)
        for (std::list<EdgeNode>::iterator it = vex[top].al.begin(); it != vex[top].al.end(); it++)
        {
            // No, this is list!!!
            // vex[top].al[i]
            // the in degree of adjacent vetices of vex[top] minus one
            // after decrease, if in == 0, push into the stack
            adjV = (*it).adjvex;
            if (--vex[adjV].in == 0)
                stk.push(adjV);
            // If the earliest time of this adjvex(subscript of the vertex 'a') (O -> 'a')
            // is less then O -> 'top' -> 'a'). the update the etv of 'a'
            if ((etv[top] + (*it).weight) > etv[adjV])
                etv[adjV] = etv[top] + (*it).weight;
        }
    }
    return count < numV ? false : true;
}

void Topo::criticalPath()
{
    int top, adjV;
    int ete, lte; // The earliest/latest time of edge
    if (!topoLogicSort_AOE())
        return;
    std::cout << std::endl;
    ltv.resize(numV, etv[numV - 1]);
    // calculate ltv
    while (!aov.empty())
    {
        top = aov.top();
        aov.pop();
        for (std::list<EdgeNode>::iterator it = vex[top].al.begin(); it != vex[top].al.end(); it++)
        {
            adjV = (*it).adjvex;
            if (ltv[adjV] - (*it).weight < ltv[top])
                // ltv[top] = ltv[adjV] = (*it).weight; What R U fxxking doing?????
                ltv[top] = ltv[adjV] - (*it).weight;
        }
    }

    // Find out which edge is in the critical path...
    for (int i = 0; i < numV; i++) // Traverse every vertex
    {
        // Traverse adjacency list
        for (std::list<EdgeNode>::iterator it = vex[i].al.begin(); it != vex[i].al.end(); it++)
        {
            adjV = (*it).adjvex;
            ete = etv[i];
            lte = ltv[adjV] - (*it).weight;
            if (ete == lte)
                // print the critical event
                std::cout << "<" << vex[i].data << " - " << vex[adjV].data
                          << "> length: " << (*it).weight << " \n";
        }
    }
}

int main()
{
    Topo tp;
    // if (tp.topoLogicSort_AOV())
    //     std::cout << "\nNo loop...\n";
    // else
    //     std::cout << "\nLoop(s)...\n";

    tp.criticalPath();
    return 0;
}