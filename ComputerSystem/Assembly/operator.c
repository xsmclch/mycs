#include <stdlib.h>
// 这是因为C++支持引用（reference），而C语言不支持。在你的代码中，void swap(long &a, long &b)
// 函数的参数是两个长整型的引用。这意味着，当你调用swap(a, b)时，你实际上是将a和b的引用（也就是它们的别名）
// 传递给了函数，而不是它们的值。因此，函数内部对参数的修改会直接反映到原始变量上。
// 然而，在C语言中，所有的函数参数都是通过值传递的。这意味着，当你将一个变量作为参数传递给一个函数时，
// 函数会收到这个变量值的一个副本，而不是变量本身。因此，函数内部对参数的修改不会影响到原始变量。
// 所以，如果你想在C语言中实现类似的功能，你需要使用指针。以下是在C语言中实现的交换函数：

void swap(long *, long *);

int main()
{
    long a = 1;
    long b = -1;
    swap(&a, &b); // C中&可以用于取地址，不能创建引用
    return 0;
}

void swap(long *a, long *b)
{
    *a = *a ^ *b;
    *b = *a ^ *b;
    *a = *a ^ *b;
}

long sal(long *a)
{
    return (*a) << 1;
}

long long not(long long *a)
{
    return ~(*a);
}

// 加载有效地址
// 根本与有效地址计算无关，这是编译器leaq的灵活用法
long long scale(long long x, long long y, long long z)
{
    long long t = x + 4 * y + 12 * x;
    return t;
}