#include <iostream>
#include <vector>
using namespace std;

class UnionFind
{
private:
    vector<int> parent; // 父节点数组
    vector<int> rank;   // 树的秩（高度）

public:
    UnionFind(int size)
    {
        parent.resize(size);
        rank.resize(size, 0);
        for (int i = 0; i < size; ++i)
        {
            parent[i] = i; // 初始化，每个节点的父节点是自己
        }
    }

    // 查找操作：带路径压缩
    int find(int x)
    {
        if (parent[x] != x)
        {
            parent[x] = find(parent[x]); // 路径压缩
        }
        return parent[x];
    }

    // 合并操作：按秩合并
    void unite(int x, int y)
    {
        int rootX = find(x);
        int rootY = find(y);

        if (rootX != rootY)
        {
            if (rank[rootX] > rank[rootY])
            {
                parent[rootY] = rootX;
            }
            else if (rank[rootX] < rank[rootY])
            {
                parent[rootX] = rootY;
            }
            else
            {
                parent[rootY] = rootX;
                rank[rootX]++;
            }
        }
    }

    // 判断连通性
    bool isConnected(int x, int y)
    {
        return find(x) == find(y);
    }
};

int main()
{
    UnionFind uf(10); // 创建一个包含10个元素的并查集

    uf.unite(1, 2); // 合并1和2
    uf.unite(2, 3); // 合并2和3
    uf.unite(4, 5); // 合并4和5

    cout << (uf.isConnected(1, 3) ? "Yes" : "No") << endl; // Yes
    cout << (uf.isConnected(1, 4) ? "Yes" : "No") << endl; // No

    uf.unite(3, 5);                                        // 合并3和5
    cout << (uf.isConnected(1, 4) ? "Yes" : "No") << endl; // Yes

    return 0;
}
