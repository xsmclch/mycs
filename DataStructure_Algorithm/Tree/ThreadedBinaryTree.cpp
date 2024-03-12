#include <iostream>

enum PointerTag
{
    Link,
    Thread
};

struct TreeNode
{
    int value = -1;
    TreeNode *left;
    TreeNode *right;
    PointerTag LTag = Link;
    PointerTag RTag = Link;

    TreeNode(int value) : value(value), left(nullptr), right(nullptr) {}
};

// Is used for threading the tree. When having been
// used everytime, remember to reset pre = nullptr!!!
TreeNode *pre = nullptr;

class ThrBiTree
{
public:
    ThrBiTree() : root(nullptr) {}
    ~ThrBiTree() { DistroyBiTree(root); }

    void CreateBiTree() { CreateBiTree(root); };
    void InOrderTraverse() { InOrderTraverse(root); }
    void InThreading()
    {
        InThreading(root);
        CreateEmptyHead();
    }
    void InOrderTraverse_Thr() { InOrderTraverse_Thr(head); }

private:
    // void CreateBiTree(TreeNode* T); THIS IS WRONG!!!!!
    // You have to pass a reference of a pointer to the function
    // Or it will just create a copy of the pointer
    void CreateBiTree(TreeNode *&T);
    void DistroyBiTree(TreeNode *&T);
    void InOrderTraverse(TreeNode *T);
    void InThreading(TreeNode *T);
    void InOrderTraverse_Thr(TreeNode *T);
    void CreateEmptyHead();
    TreeNode *root = nullptr;
    TreeNode *head = nullptr;
};

void ThrBiTree::CreateBiTree(TreeNode *&T)
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

// Post Order Traverse
void ThrBiTree::DistroyBiTree(TreeNode *&T)
{
    if (!head)
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
        return;
    }

    // From my perspective, this is the hardest part!!!
    TreeNode *p;
    p = head->left;
    while (p != head)
    {
        while (p->LTag == Link)
            p = p->left;
        std::cout << p->value << " ";
        TreeNode *temp = p;
        // Head!! If you carelessly replace head by root -> BOOM!!!!
        while (p->RTag == Thread && p->right != head)
        {
            p = p->right;
            delete temp;
            temp = p;
            std::cout << p->value << " ";
        }
        p = p->right;
    }
    delete head;
    head = nullptr;
}

void ThrBiTree::InOrderTraverse(TreeNode *T)
{
    if (head)
    {
        std::cout << "This tree has been threade\n";
        return;
    }
    if (!T)
        return;

    InOrderTraverse(T->left);
    std::cout << T->value << " ";
    InOrderTraverse(T->right);
}

void ThrBiTree::InThreading(TreeNode *T)
{
    if (!T)
        return;

    InThreading(T->left);
    if (!T->left)
    {
        T->LTag = Thread;
        T->left = pre;
    }
    // pre can't be empty
    if (pre != nullptr && !pre->right)
    {
        pre->RTag = Thread;
        pre->right = T;
    }
    pre = T;
    InThreading(T->right);
}

void ThrBiTree::CreateEmptyHead()
{
    // head shouldn't be empty
    head = new TreeNode(0);

    head->LTag = Link;
    head->RTag = Thread;
    head->left = root;
    pre->right = head;
    head->right = pre;
    pre = nullptr;
}

void ThrBiTree::InOrderTraverse_Thr(TreeNode *T)
{
    TreeNode *p;
    p = T->left;
    while (p != T)
    {
        while (p->LTag == Link)
            p = p->left;
        std::cout << p->value << " ";
        while (p->RTag == Thread && p->right != T)
        {
            p = p->right;
            std::cout << p->value << " ";
        }
        p = p->right;
    }
}

int main()
{
    ThrBiTree *tree = new ThrBiTree;
    tree->CreateBiTree();
    tree->InOrderTraverse();
    tree->InThreading();
    std::cout << "\n";
    // After threading, DO NOT TRY TO CALL THIS FUNCTION
    tree->InOrderTraverse();
    tree->InOrderTraverse_Thr();
    std::cout << "\n";
    delete tree;
    tree = nullptr;
    return 0;
}