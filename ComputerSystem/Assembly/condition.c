#include <stdio.h>

long lt_cnt = 0;
long ge_cnt = 0;

long absdiff_se(long x, long y)
{
    long result;
    if (x < y)
    {
        lt_cnt++;
        result = y - x;
    }
    else
    {
        ge_cnt++;
        result = x - y;
    }
    return result;
}

void cond(long a, long *p)
{
    if (p && a > *p)
        *p = a;
}

int add1(int x)
{
    return x + 1;
}

// 比较以下两个函数
int absdiff(int x, int y)
{
    int result;
    if (x < y)
        result = y - x;
    else
        result = x - y;
    return result;
}

int cmovdiff(int x, int y)
{
    int rval = y - x;
    int eval = x - y;
    int ntest = x >= y;
    if (ntest) rval = eval;
    return rval;
}

// 发现与absdiff1完全等价
int absdiff1(int x, int y)
{
    return x < y ? y - x : x - y;
}

int main()
{
    printf("%lu\n", sizeof(int));        // 4
    printf("%lu\n", sizeof(long));       // 8 Linux-gcc 4 MinGW32 WINDOWSx64
    printf("%lu\n", sizeof(long long));  // 8
    return 0;
}