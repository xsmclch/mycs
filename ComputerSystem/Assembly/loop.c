int func_do(int n)
{
    int result = 1;
    do
    {
        result *= n;
        n -= 1;
    } while (n > 1);
    return result;
}

int func_while(int n)
{
    int result = 1;
    while (n > 1)
    {
        result *= n;
        --n;
    }
    return result;
}

int func_for(int n)
{
    int result = 1;
    for (int i = 2; i <= n; i++)
        result *= i;
    return result;
}

// switch跳转表
void switch_eg(int x, int n, int *dest)
{
    int val = x;

    switch (n)
    {
    case 100:
        val *= 13;
        break;

    case 102:
        val += 10;
        break;

    case 103:
        val += 11;
        break;

    case 104:
    case 106:
        val *= val;
        break;

    default:
        val = 0;
    }
    *dest = val;
}

int main()
{
    return 0;
}