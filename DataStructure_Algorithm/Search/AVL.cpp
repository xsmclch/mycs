// Difficult!
// Self-Balancing Binary Search Tree
#include <iostream>
#include <vector>

bool taller;
bool shorter;

enum BF
{
    lh,
    e,
    rh
}; // left high, equal, right high

struct Node
{
    Node() {}
    Node(int _data) : data(_data) {}
    int data;
    BF bf; // Balance factor
    Node *left, *right;
};

class AVL
{
public:
    ~AVL() { destroy(root); };
    void insert(int val, bool &taller) { insert(root, val, taller); };
    void deleteNode(int val, bool &shorter) { deleteNode(root, val, shorter); };
    void pos() { pos(root); };
    void gen(int n)
    {
        for (int i = 0; i < n; i++)
            this->insert(root, i, taller);
    }

private:
    Node *root = nullptr;
    void destroy(Node *&);
    void rRotate(Node *&); // right rotation, pR is pointer to the rotating root
    void lRotate(Node *&);
    void lBalance(Node *&);
    void rBalance(Node *&);
    bool insert(Node *&, int, bool &);
    bool deleteNode(Node *&, int, bool &);
    void pos(Node *p)
    {
        if (!p)
            return;

        pos(p->left);
        std::cout << p->data << " ";
        pos(p->right);
    };
};

void AVL::destroy(Node *&T)
{
    if (!T)
        return;
    if (!T->left && !T->right)
        return;

    destroy(T->left);
    destroy(T->right);
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

void AVL::rRotate(Node *&pR) // right rotation, pR is pointer to the rotating root
{
    Node *lp = pR->left;
    pR->left = lp->right;
    lp->right = pR;
    pR = lp;
}

void AVL::lRotate(Node *&pR)
{
    Node *rp = pR->right;
    pR->right = rp->left;
    rp->left = pR;
    pR = rp;
}

void AVL::lBalance(Node *&pR)
{
    // Node *lp = pR->left!!! Wrong!!! Pass reference!!!
    Node *&lp = pR->left;
    if (!lp)
        return;
    switch (lp->bf)
    {
    case lh:
        pR->bf = lp->bf = e;
        rRotate(pR);
        break;
    case rh:
        // REFERENCE!!!!!!!!!!!!!!!!!
        Node *&lrp = lp->right; // Turn left then turn right!
        switch (lrp->bf)
        {
        case lh:
            pR->bf = rh;
            lp->bf = e;
            break;
        case e:
            pR->bf = lp->bf = e;
            break;
        case rh:
            pR->bf = e;
            lp->bf = lh;
            break;
        }
        lrp->bf = e;
        lRotate(lp);
        rRotate(pR);
    }
}

void AVL::rBalance(Node *&pR)
{
    // Node *rp = pR->right!!! Wrong!!! Pass reference!!!
    Node *&rp = pR->right;
    if (!rp)
        return;
    switch (rp->bf)
    {
    case rh:
        pR->bf = rp->bf = e;
        lRotate(pR);
        break;
    case lh:
        // REFERENCE!!!!!!!!!!!!!!!!!
        Node *&rlp = rp->left; // Turn right then turn left
        switch (rlp->bf)
        {
        case rh:
            pR->bf = rh;
            rp->bf = e;
            break;
        case e:
            pR->bf = rp->bf = e;
            break;
        case lh:
            pR->bf = e;
            rp->bf = rh;
            break;
        }
        rlp->bf = e;
        rRotate(rp);
        lRotate(pR);
    }
}

bool AVL::insert(Node *&pR, int val, bool &taller)
{
    if (!root)
    {
        root = new Node(val);
        root->left = root->right = nullptr;
        root->bf = e;
        return true;
    }
    if (!pR)
    {
        pR = new Node(val);
        pR->left = pR->right = nullptr;
        pR->bf = e;
        taller = true;
        return true;
    }
    else
    {
        if (val == pR->data)
        {
            taller = false;
            return false;
        }
        if (val < pR->data)
        {
            if (!insert(pR->left, val, taller))
                return false;
            if (taller)
            {
                switch (pR->bf)
                {
                case lh:
                    lBalance(pR);
                    taller = false;
                    break;
                case e:
                    pR->bf = lh;
                    taller = true;
                    break;
                case rh:
                    pR->bf = e;
                    taller = false;
                    break;
                }
            }
        }
        else
        {
            if (!insert(pR->right, val, taller))
                return false;
            if (taller)
            {
                switch (pR->bf)
                {
                case lh:
                    pR->bf = e;
                    taller = false;
                    break;
                case e:
                    pR->bf = rh;
                    taller = true;
                    break;
                case rh:
                    rBalance(pR);
                    taller = false;
                    break;
                }
            }
        }
    }
    return true;
}

bool AVL::deleteNode(Node *&pR, int val, bool &shorter)
{
    if (!pR)
        return false;
    if (val == pR->data)
    {
        if (!pR->left && !pR->right)
        {
            delete pR;
            pR = nullptr;
            shorter = true;
            return true;
        }
        else if (!pR->left || !pR->right)
        {
            Node *temp = pR;
            pR = (pR->left) ? pR->left : pR->right;
            delete temp;
            temp = nullptr;
            shorter = true;
            return true;
        }
        else
        {
            Node *temp = pR->right;
            while (temp->left)
                temp = temp->left;
            pR->data = temp->data;
            if (!deleteNode(pR->right, temp->data, shorter))
                return false;
            if (shorter)
            {
                switch (pR->bf)
                {
                case lh:
                    lBalance(pR);
                    shorter = true;
                    break;
                case e:
                    pR->bf = lh;
                    shorter = false;
                    break;
                case rh:
                    pR->bf = e;
                    shorter = true;
                    break;
                }
            }
        }
        return true;
    }
    else if (val < pR->data)
    {
        if (!deleteNode(pR->left, val, shorter))
            return false;
        if (shorter)
        {
            switch (pR->bf)
            {
            case lh:
                pR->bf = e;
                shorter = true;
                break;
            case e:
                pR->bf = rh;
                shorter = false;
                break;
            case rh:
                rBalance(pR);
                shorter = true;
                break;
            }
        }
    }
    else
    {
        if (!deleteNode(pR->right, val, shorter))
            return false;
        if (shorter)
        {
            switch (pR->bf)
            {
            case lh:
                lBalance(pR);
                shorter = true;
                break;
            case e:
                pR->bf = lh;
                shorter = false;
                break;
            case rh:
                pR->bf = e;
                shorter = true;
                break;
            }
        }
    }
    return true;
}

int main()
{
    AVL mavl;
    // mavl.gen(10);
    // mavl.pos();
    std::vector<int> eg = {3, 2, 1, 4, 5, 6, 7, 10, 9, 8};
    // std::vector<int> eg = {1, 2, 3};
    for (int i : eg)
        mavl.insert(i, taller);
    mavl.pos();
    std::cout << std::endl;
    for (int i = 1; i <= 10; i++)
        mavl.deleteNode(i, shorter);
    std::cout << std::endl;
    int arr[20] = {15, 3, 2, 20, 19, 8, 5, 9, 12, 18, 1, 4, 11, 13, 7, 6, 10, 14, 16, 17};
    for (int i = 0; i < 20; i++)
        mavl.insert(arr[i], taller);
    mavl.pos();
    std::cout << std::endl;
    for (int i = 0; i < 20; i += 2)
        mavl.deleteNode(i, taller);
    mavl.pos();
    std::cout << std::endl;
}