#include <iostream>
#include <string>
#include "String.hpp"

typedef void (*pnext) (String, int*);

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

void get_nextVal(String T, int *next);

int index_KMP(String S, String T, int pos);

int main()
{
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

// If T = "aaaaax" and S = "aaaaax", we have a better get_next!
void get_nextVal(String T, int *nextVal)
{
    int i = 1;
    int j = 0;
    nextVal[1] = 0;
    while (i < T.getSize())
    {
        if (j == 0 || T[i] == T[j])
        {
            ++i;
            ++j;
            // 当前字符与前缀字符不同，正常操作，同get_next
            if (T[i] != T[j])
                nextVal[i] = j;
            // 当前字符与前缀字符相同，将前缀字符的nextval值赋给当前位置
            else
                nextVal[i] = nextVal[j];
        }
        else
            j = nextVal[j];
    }
}

int index_KMP(String S, String T, int pos)
{
    pnext Farr[2] = {get_next, get_nextVal};
    std::cout << "Select get_next()...(1) get_next (2) get_nextVal\n";
    int fun;
    std::cin >> fun;
    if (fun != 2) fun = 1;

    int i = pos;
    int j = 1;
    int next[255];
    Farr[fun - 1](T, next);
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