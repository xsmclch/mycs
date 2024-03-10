#include <iostream>
#include <string>
#include "String.hpp"

void showArr(int *arr, int size)
{
    ++arr;
    for (int i = 0; i < size; i++)
    {
        std::cout << *arr << " ";
        ++arr;
    }
    return;
}

// 与后面的声明参数要一致
void get_next(String T, int *next);

int index_KMP(String S, String T, int pos);

int main()
{
    // // some test
    // std::string x = "abbab";
    // std::cout << x << std::endl;
    // std::cout << x.size() << std::endl;
    // std::cout << sizeof(x) << std::endl;
    // const char *y = "abcaca";
    // // available
    // x = y;
    // printf("%s,%s\n", x, y);
    // std::cout << "x = " << x << " y = " << y << std::endl;
    // std::string z(x);
    // const char *u = y;
    // // error
    // // u = z;
    // // start here
    // std::cout << x[1] << std::endl;
    std::cout << "next of T is\n";
    const char *t = "ababa";
    String T(t);
    // std::cout << T.getSize();
    int temp[6] = {0};
    get_next(T, temp);
    showArr(temp, T.getSize());

    String A("gglleleogoogleleooggleggligooil");
    String B("google");

    // std::cout << A.x << "\n" << B.x << std::endl;

    std::cout << std::endl
              << index_KMP(A, B, 1);
    return 0;
}

void get_next(String T, int *next)
{
    int i = 1;
    int j = 0;
    next[1] = 0;
    while (i < T.getSize())
    {
        if (j == 0 || T[i] == T[j])
        {
            ++i;
            ++j;
            next[i] = j;
        }
        else
            j = next[j];
    }
}

int index_KMP(String S, String T, int pos)
{
    int i = pos;
    int j = 1;
    int next[255];
    get_next(T, next);
    while (i <= S.getSize() && j <= T.getSize())
    {
        if (j == 0 || S[i] == T[j])
        {
            ++i;
            ++j;
        }
        else
            j = next[j];
    }
    return j > T.getSize() ? i - T.getSize() : 0;
}