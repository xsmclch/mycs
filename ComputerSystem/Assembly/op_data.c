#include <stdio.h>

int func(int x, int *p)
{
    printf("func is called\n");
    --*p; // 不要试图后置运算符，不然要加括号(*p)--;
    return x + *p;
}

int func2(int x, int *p)
{
    printf("func2 is called\n");
    ++*p;
    return x + *p;
}

// 这个函数的汇编码很有理解难度！！！
long vframe(long n, long idx, long *q)
{
    long i;
    long *p[n];
    p[0] = &i;
    for (i = 1; i < n; i++)
        p[i] = q;
    return *p[idx];
}
// Intel's syntax by compiler explorer
// vframe:
//         push    rbp
//         mov     rbp, rsp
//         sub     rsp, 16
//         lea     rax, [15+rdi*8]
//         and     rax, -16
//         sub     rsp, rax
//         lea     rcx, [rsp+7]
//         mov     rax, rcx
//         shr     rax, 3
//         and     rcx, -8
//         lea     r8, [rbp-8]
//         mov     QWORD PTR [0+rax*8], r8
//         mov     QWORD PTR [rbp-8], 1
//         jmp     .L2
// .L3:
//         mov     QWORD PTR [rcx+rax*8], rdx
//         add     QWORD PTR [rbp-8], 1
// .L2:
//         mov     rax, QWORD PTR [rbp-8]
//         cmp     rax, rdi
//         jl      .L3
//         mov     rax, QWORD PTR [rcx+rsi*8]
//         mov     rax, QWORD PTR [rax]
//         leave
//         ret

int main()
{
    int x = 1;
    int y = 2;
    int (*pf)(int, int *);
    pf = func;
    pf(x, &y);
    printf("x = %d, y = %d\n", x, y);
    x = 1;
    y = 2;
    pf = func2;
    pf(x, &y);
    printf("x = %d, y = %d\n", x, y);

    char c = 'x';
    char *pc = &c;
    printf("address of pc is %p\n", pc);
    printf("address of (int *)px + 7 = %p\n", (int *)pc + 7);     // pc + 4 * 7
    printf("address of (int *)(px + 7) = %p\n", (int *)(pc + 7)); // pc + 7
    printf("address of (void *)px + 7 = %p\n", (void *)pc + 7);
}