#include <iostream>

struct TreeNode
{
    TreeNode() {}
    TreeNode(int _data) : data(_data) {}
    int data;
    TreeNode *left, *right;
};

class BiSortTree
{
public:
    TreeNode *search(TreeNode *, int key, TreeNode *);
    bool insert(int key);
    bool delBST(TreeNode*, int key);
    bool del(TreeNode*);
    TreeNode *getRoot() { return root; }

private:
    TreeNode *root;
};

TreeNode *BiSortTree::search(TreeNode *p = nullptr, int key = 0, TreeNode *pp = nullptr)
{
    if (!p)
        return pp;
    else if (key == p->data)
        return p;
    else if (key > p->data)
        // Don't forget to RETURN, or you'll get nothing!
        return search(p->right, key, p);
    else
        return search(p->left, key, p);
}

bool BiSortTree::insert(int key)
{
    if (!root)
    {
        root = new TreeNode(key);
        root->left = root->right = nullptr;
        return true;
    }
    TreeNode *p = search(root, key);
    if (p->data == key)
        return false;
    else
    {
        TreeNode *np = new TreeNode(key);
        np->left = np->right = nullptr;
        if (key < p->data)
            p->left = np;
        else
            p->right = np;
        return true;
    }
}

bool BiSortTree::delBST(TreeNode* p, int key)
{
    if (!p)
        return false;
    else if (key == p->data)
        return del(p);
    else if (key > p->data)
        // Don't forget to RETURN, or you'll get nothing!
        return delBST(p->right, key);
    else
        return delBST(p->left, key);
}

bool BiSortTree::del(TreeNode *p)
{
    TreeNode *pp = p, *pl;
    if (p->right == nullptr)
    {
        p = p->left;
        delete pp;
        pp = nullptr;
    }
    else if (p->left == nullptr)
    {
        p = p->right;
        delete pp;
        pp = nullptr;
    }
    else 
    {
        pl = p->left; // Turn left
        while (pl->right) // Then keep turing right to the end
        {
            pp = pl;
            pl = pl->right;
        }
        p->data = pl->data;
        if (p != pp) // I made a mistake here at first
            pp->right = pl->left;
        else
            pp->left = pl->left; // Don't forget this...
        delete pl;
        pl == nullptr;
    }
    return true;
}

int main()
{
    int arr[10] = {52, 88, 58, 47, 35, 73, 51, 99, 37, 93};
    BiSortTree bst;
    for (int i = 0; i < 10; i++)
    {
        std::cout << arr[i] << " ";
        bst.insert(arr[i]);
    }
    if (bst.search(bst.getRoot(), 37))
        std::cout << "OK\n";
    else
        std::cout << "No\n";

    if (bst.delBST(bst.getRoot(), 99))
        std::cout << "OK\n";
    else
        std::cout << "NO\n";
    return 0;
}