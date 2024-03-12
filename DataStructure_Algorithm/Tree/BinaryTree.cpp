#include <iostream>

struct TreeNode
{
    int value = -1;
    TreeNode *left;
    TreeNode *right;

    TreeNode(int value) : value(value), left(nullptr), right(nullptr) {}
};

class BinaryTree
{
public:
    BinaryTree() : root(nullptr) {}
    ~BinaryTree() { DistroyBiTree(root); }


    void CreateBiTree() { CreateBiTree(root); };
    void PreOrderTraverse() { PreOrderTraverse(root); }
    void InOrderTraverse() { InOrderTraverse(root); }
    void PostOrderTraverse(){ PostOrderTraverse(root); }
private:
    // void CreateBiTree(TreeNode* T); THIS IS WRONG!!!!!
    // You have to pass a reference of a pointer to the function
    // Or it will just create a copy of the pointer
    void CreateBiTree(TreeNode* &T);
    void DistroyBiTree(TreeNode* &T);
    void PreOrderTraverse(TreeNode *T);
    void InOrderTraverse(TreeNode *T);
    void PostOrderTraverse(TreeNode *T);
    TreeNode *root;
};

void BinaryTree::DistroyBiTree(TreeNode* &T)
{
    if (!T->left && !T->right)
        return;
    
    DistroyBiTree(T->left);
    DistroyBiTree(T->right);
    if (T->left)
    {
        delete T->left;
        T->left = nullptr;
    }
    if (T->right)
    {
        delete T->right;
        T->right = nullptr;
    }
}

void BinaryTree::PreOrderTraverse(TreeNode* T)
{
    if (!T)
        return;

    std::cout << T->value << " ";
    PreOrderTraverse(T->left);
    PreOrderTraverse(T->right);
}

void BinaryTree::InOrderTraverse(TreeNode *T)
{
    if (!T)
        return;
    
    InOrderTraverse(T->left);
    std::cout << T->value << " ";
    InOrderTraverse(T->right);
}

void BinaryTree::PostOrderTraverse(TreeNode *T)
{
    if (!T)
        return;
    
    PostOrderTraverse(T->left);
    PostOrderTraverse(T->right);
    std::cout << T->value << " ";
}

void BinaryTree::CreateBiTree(TreeNode* &T)
{
    int data;
    std::cout << "Enter any value...(0 to as a leaf)\n";
    std::cin >> data;
    T = new TreeNode(data);
    if (T->value == 0)
        return;
    
    CreateBiTree(T->left);
    CreateBiTree(T->right);
}

int main()
{
    BinaryTree* pt = new BinaryTree();
    pt->CreateBiTree();
    pt->PreOrderTraverse();
    std::cout << '\n';
    pt->InOrderTraverse();
    std::cout << '\n';
    pt->PostOrderTraverse();
    std::cout << '\n';
    delete pt;
    pt = nullptr;
    return 0;
}
