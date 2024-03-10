#include <iostream>

struct TreeNode
{
    int value;
    TreeNode *left;
    TreeNode *right;

    TreeNode(int value) : value(value), left(nullptr), right(nullptr) {}
};

class BinaryTree
{
public:
    BinaryTree() : root(nullptr) {}

private:
    TreeNode *root;
};

int main()
{
    BinaryTree tree;
    return 0;
}
