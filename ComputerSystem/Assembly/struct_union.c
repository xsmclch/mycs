#include <stdio.h>
struct rec
{
    int i;
    int j;
    int a[2];
    int *p;
};  // 24B

void moveij(struct rec *r)
{
    r->j = r->i;
}

void opP(struct rec *r)
{
    r->p = &r->a[r->i + r->j];
}

struct S3
{
    char c;
    int i[2];
    double v;
};  // 24B

union U3
{
    char c;
    int i[2];
    double v;
};  // 8B

struct node_s
{
    struct node_s *left;
    struct node_s *right;
    double data[2];
};  // 32B

union node_u
{
    struct
    {
        union node_u *left;
        union node_u *right;
    } internal;
    double data[2];
};  // 16B但是无法分辨内部节点还是叶子

// 更好的解决方案
typedef enum
{
    N_LEAF,
    N_INTERNAL
} nodetype_t;

struct node_t
{
    nodetype_t type;
    union
    {
        struct
        {
            struct node_t *left;
            struct node_t *right;
        } internal;
        double data[2];
    } info;
};  // 24B


int main()
{
    struct S3 s;
    union U3 u;
    printf("sizeof S3 is %lu, sizeof U3 is %lu", sizeof(s), sizeof(u));
    printf("sizeof nodetype_t is %lu, sizeof node_t is %lu", sizeof(struct node_t), sizeof(nodetype_t));
}