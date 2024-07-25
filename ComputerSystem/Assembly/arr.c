// C语言编译器可以优化定长数组上的代码操作
#define N 16
typedef int fix_matrix[N][N];

// 变长数组，可以是表达式，但是必须在计算之前得出表达式的值
int var_ele(long n, int A[n][n], long i, long j)
{
    return A[i][j];
}

int var_prod_ele(long n, int A[n][n], int B[n][n], long i, long k)
{
    long j;
    int result = 0;

    for (j = 0; j < n; j++)
        result += A[i][j] + B[j][k];
    
    return result;
}

int var_prod_ele_opt(long n, int A[n][n], int B[n][n], long i, long k)
{
    int *Arow = A[i];
    int *Bptr = &B[0][k];
    int result = 0;
    long j;
    for (j = 0; j < n; j++)
    {
        result += Arow[j] * *Bptr;
        Bptr += n;
    }
    return result;
}