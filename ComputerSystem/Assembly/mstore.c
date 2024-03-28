#include <stdio.h>

void multstore(long, long, long *);

long mult2(long, long);

int main()
{
    long d;
    multstore(2, 3, &d);
    printf("2 * 3 --> %1d\n", d);
    return 0;
}

long mult2(long a, long b)
{
    long s = a * b;
    return s;
}

void multstore(long x, long y, long * dest)
{
    long t = mult2(x, y);
    *dest = t;
}