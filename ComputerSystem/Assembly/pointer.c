#include <stdio.h>
#include <stdlib.h>

void manageArr(int *arr)
{
    printf("%p\n", arr);
    printf("%p\n", arr + 1);
    arr[0] = 0;
    arr[1] = 1;
}

void showArr(const int const *arr, int len)
{
    for (int i = 0; i < len; i++)
    {
        printf("%d\n", *(arr + i));
    }
}

// 嵌套数组
// 地址顺序从00-01-10-11
void manageArrV2(int arr[2][2])
{
    for (int i = 0; i < 2; i++)
    {
        for (int j = 0; j < 2; j++)
        {
            printf("The number stored in arr[%d][%d] is %d\n", i, j, arr[i][j]);
            printf("The address of arr[%d][%d] is %p\n", i, j, &arr[i][j]);
        }
    }   
}

int main()
{
    int *arr = malloc(8);
    manageArr(arr);
    showArr(arr, 2);
    free(arr);
    int arr2[2][2] = {{0, 1}, {2, 3}};
    manageArrV2(arr2);
    return 0;
}